import { useCallback, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { CellState, FillMode } from '@stores/GameState';
import clamp from '@utilities/clamp';
import range from '@utilities/range';
import transformScreenToSvg from '@utilities/transformScreenToSvg';
import { Root, Cell, SectionLine } from './Grid.styles';

const CELL_SIZE = 48;

enum DragDirection {
    None,
    Horizontal,
    Vertical,
}

interface GridProps {
    onFill: (x: number, y: number, fillMode: FillMode) => void;
    size: number;
    state: CellState[][];
}

const Grid: React.FC<GridProps> = observer(({ onFill, size, state }) => {
    const dragState = useRef({
        isDragging: false,
        dragStart: { x: -1, y: -1 },
        dragDirection: DragDirection.None,
        fillMode: FillMode.Fill,
        lastFill: { x: -1, y: -1 },
        preventContextMenu: false
    });
    const svgRef = useRef<SVGSVGElement | null>(null);

    // TODO this function is based on size, and won't be updated inside of useEffect
    const getGridCoordinate = (screenPoint: { x: number; y: number }) => {
        const svg = svgRef.current;
        if (!svg) {
            return null;
        }
        const { x, y } = transformScreenToSvg(svg, screenPoint);
        return {
            x: clamp(0, size - 1, Math.floor((x - 2) / CELL_SIZE)),
            y: clamp(0, size - 1, Math.floor((y - 2) / CELL_SIZE)),
        };
    };

    // TODO lets just use a persistent ref for this
    //    since onFill isn't memoized in parent it will just be constantly re-attaching
    const handleFill = useCallback(
        (x: number, y: number) => {
            if (state[y][x] !== CellState.Empty) {
                return;
            }
            onFill(x, y, dragState.current.fillMode);
            dragState.current.lastFill.x = x;
            dragState.current.lastFill.y = y;
        },
        [state, onFill]
    );

    const handleMouseDown = (event: React.MouseEvent) => {
        let fillMode: FillMode;
        if (event.button === 0) {
            fillMode = FillMode.Fill;
        } else if (event.button === 2) {
            fillMode = FillMode.Flag;
        } else {
            return;
        }

        const gridCoordinate = getGridCoordinate({
            x: event.clientX,
            y: event.clientY,
        });
        if (gridCoordinate === null) {
            return;
        }
        const { x, y } = gridCoordinate;

        dragState.current.isDragging = true;
        dragState.current.dragStart = gridCoordinate;
        dragState.current.fillMode = fillMode;

        handleFill(x, y);
    };

    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => {
            if (dragState.current.preventContextMenu) {
                event.preventDefault();
            }
        };
        document.addEventListener('contextmenu', handleContextMenu);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            if (!dragState.current.isDragging) {
                return;
            }

            const gridCoordinate = getGridCoordinate({
                x: event.clientX,
                y: event.clientY,
            });
            if (gridCoordinate === null) {
                return;
            }

            // If unset, set drag direction.
            if (dragState.current.dragDirection === DragDirection.None) {
                if (gridCoordinate.x !== dragState.current.dragStart.x) {
                    dragState.current.dragDirection = DragDirection.Horizontal;
                } else if (gridCoordinate.y !== dragState.current.dragStart.y) {
                    dragState.current.dragDirection = DragDirection.Vertical;
                }
            }

            // TODO convert onFill to take an object ...

            if (dragState.current.dragDirection === DragDirection.Horizontal) {
                if (dragState.current.lastFill.x === gridCoordinate.x) {
                    return;
                }
                for (const x of range(
                    dragState.current.lastFill.x,
                    gridCoordinate.x,
                    { exclusiveStart: true }
                )) {
                    handleFill(x, dragState.current.dragStart.y);
                }
            } else if (
                dragState.current.dragDirection === DragDirection.Vertical
            ) {
                if (dragState.current.lastFill.y === gridCoordinate.y) {
                    return;
                }
                for (const y of range(
                    dragState.current.lastFill.y,
                    gridCoordinate.y,
                    { exclusiveStart: true }
                )) {
                    handleFill(dragState.current.dragStart.x, y);
                }
            } else {
                handleFill(gridCoordinate.x, gridCoordinate.y);
            }
        };
        const onMouseUp = () => {
            if (!dragState.current.isDragging) {
                return;
            }
            dragState.current.isDragging = false;
            dragState.current.dragStart = { x: -1, y: -1 };
            dragState.current.dragDirection = DragDirection.None;
            dragState.current.lastFill = { x: -1, y: -1 };
            dragState.current.preventContextMenu = true;
            setTimeout(() => {
                dragState.current.preventContextMenu = false;
            });
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [state, handleFill]);

    const svgSize = CELL_SIZE * size + 4;

    return (
        <Root
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            width={svgSize / 2}
            height={svgSize / 2}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            onMouseDown={handleMouseDown}
        >
            <defs>
                <clipPath id="cellClip">
                    <rect width={CELL_SIZE} height={CELL_SIZE} />
                </clipPath>
                <symbol id="flagIcon" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </symbol>
            </defs>
            <g transform="translate(2, 2)">
                {Array.from({ length: size * size }).map((_, index) => {
                    const cellX = index % size;
                    const cellY = Math.floor(index / size);
                    const cellState = state[cellY][cellX];
                    return (
                        <g
                            transform={`translate(${CELL_SIZE * cellX}, ${
                                CELL_SIZE * cellY
                            })`}
                            clipPath="url(#cellClip)"
                        >
                            <Cell
                                cellState={cellState}
                                width={CELL_SIZE}
                                height={CELL_SIZE}
                                overflow="hidden"
                            />
                            {cellState === CellState.Flagged && (
                                <use
                                    href="#flagIcon"
                                    width={CELL_SIZE}
                                    height={CELL_SIZE}
                                    fill="#344861"
                                    shapeRendering="geometricPrecision"
                                />
                            )}
                        </g>
                    );
                })}
                {Array.from({ length: size / 5 + 1 }).map((_, i) => (
                    <>
                        <SectionLine
                            x1={0}
                            y1={CELL_SIZE * i * 5}
                            x2={CELL_SIZE * size}
                            y2={CELL_SIZE * i * 5}
                        />
                        <SectionLine
                            x1={CELL_SIZE * i * 5}
                            y1={0}
                            x2={CELL_SIZE * i * 5}
                            y2={CELL_SIZE * size}
                        />
                    </>
                ))}
            </g>
        </Root>
    );
});

export default Grid;
