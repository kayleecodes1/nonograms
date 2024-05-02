import React, { useCallback, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Orientation } from '@constants/index';
import { useGameState } from '@contexts/GameStateContext';
import { FillMode } from '@models/GameState';
import clamp from '@utilities/clamp';
import range from '@utilities/range';
import transformScreenToSvg from '@utilities/transformScreenToSvg';
import { Root, Cell as CellComponent, SectionLine, LineComplete } from './Grid.styles';

const CELL_SIZE = 48;
const BORDER_STROKE_WIDTH = 4;

interface GridProps {
    onFill: (x: number, y: number, fillMode: FillMode) => void;
}

const Grid: React.FC<GridProps> = observer(({ onFill }) => {
    const gameState = useGameState();
    const WIDTH = gameState.Puzzle.Width;
    const HEIGHT = gameState.Puzzle.Height;

    //--------------------------------------------------------------------------
    // Cell Interaction
    //--------------------------------------------------------------------------

    const dragState = useRef({
        isDragging: false,
        dragStart: { x: -1, y: -1 },
        dragDirection: null as Orientation | null,
        fillMode: FillMode.Fill,
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
            x: clamp(0, WIDTH - 1, Math.floor((x - 2) / CELL_SIZE)),
            y: clamp(0, HEIGHT - 1, Math.floor((y - 2) / CELL_SIZE)),
        };
    };

    // TODO lets just use a persistent ref for this
    //    since onFill isn't memoized in parent it will just be constantly re-attaching
    const handleFill = useCallback(
        (x: number, y: number) => {
            const cell = gameState.Puzzle.Grid.getCell(x, y);
            // TODO this check is also happening in GameState
            if (!cell.IsEmpty) {
                return;
            }
            onFill(x, y, dragState.current.fillMode);
        },
        [onFill],
    );

    const cancelDrag = useCallback(() => {
        if (!dragState.current.isDragging) {
            return;
        }
        dragState.current.isDragging = false;
        dragState.current.dragStart = { x: -1, y: -1 };
        dragState.current.dragDirection = null;
    }, []);

    useEffect(() => {
        gameState.Puzzle.addListener('error', cancelDrag);

        return () => {
            gameState.Puzzle.removeListener('error', cancelDrag);
        };
    }, [gameState.Puzzle, cancelDrag]);

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

            const { x, y } = gridCoordinate;
            if (!gameState.Puzzle.Grid.getCell(x, y).IsEmpty) {
                return;
            }

            // If unset, set drag direction.
            if (dragState.current.dragDirection === null) {
                if (gridCoordinate.x !== dragState.current.dragStart.x) {
                    dragState.current.dragDirection = Orientation.Horizontal;
                } else if (gridCoordinate.y !== dragState.current.dragStart.y) {
                    dragState.current.dragDirection = Orientation.Vertical;
                }
            }

            // TODO convert onFill to take an object ...

            if (dragState.current.dragDirection === Orientation.Horizontal) {
                for (const x0 of range(dragState.current.dragStart.x, x, { exclusiveStart: true })) {
                    handleFill(x0, dragState.current.dragStart.y);
                }
            } else if (dragState.current.dragDirection === Orientation.Vertical) {
                for (const y0 of range(dragState.current.dragStart.y, y, { exclusiveStart: true })) {
                    handleFill(dragState.current.dragStart.x, y0);
                }
            }
        };
        const onMouseUp = () => {
            cancelDrag();
        };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    }, [handleFill]);

    //--------------------------------------------------------------------------
    // Line Complete
    //--------------------------------------------------------------------------

    const [lineCompleteState, setLineCompleteState] = useState(() => ({
        row: {
            isActive: false,
            key: -1,
            x: -1,
            y: -1,
        },
        column: {
            isActive: false,
            key: -1,
            x: -1,
            y: -1,
        },
    }));

    const LINE_COMPLETE_DURATION = 800;

    useEffect(() => {
        const nonces = {
            row: {},
            column: {},
        };
        const onLineComplete = (x: number, y: number, orientation: 'row' | 'column') => {
            const nonce = (nonces[orientation] = {});
            setLineCompleteState((prevState) => ({
                ...prevState,
                [orientation]: {
                    isActive: true,
                    key: Date.now(),
                    x,
                    y,
                },
            }));
            setTimeout(() => {
                if (nonce !== nonces[orientation]) {
                    return;
                }
                // TODO this could trigger after component unmount
                setLineCompleteState((prevState) => ({
                    ...prevState,
                    [orientation]: {
                        isActive: false,
                        key: -1,
                        x: -1,
                        y: -1,
                    },
                }));
            }, LINE_COMPLETE_DURATION);
        };

        gameState.Puzzle.addListener('lineComplete', onLineComplete);

        return () => {
            gameState.Puzzle.removeListener('lineComplete', onLineComplete);
        };
    }, []);

    //--------------------------------------------------------------------------
    // Render
    //--------------------------------------------------------------------------

    const SVG_WIDTH = CELL_SIZE * WIDTH + BORDER_STROKE_WIDTH;
    const SVG_HEIGHT = CELL_SIZE * HEIGHT + BORDER_STROKE_WIDTH;

    return (
        <Root
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
            width={SVG_WIDTH / 2}
            height={SVG_HEIGHT / 2}
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            onMouseDown={handleMouseDown}
        >
            <defs>
                <clipPath id="cellClip">
                    <rect width={CELL_SIZE} height={CELL_SIZE} />
                </clipPath>
                <clipPath id="gridClip">
                    <rect width={CELL_SIZE * WIDTH} height={HEIGHT * CELL_SIZE} />
                </clipPath>
                <symbol id="flagIcon" viewBox="0 0 24 24" shapeRendering="geometricPrecision">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </symbol>
                <linearGradient id="lineCompleteHorizontalGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#2E85EC" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#2E85EC" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#2E85EC" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="lineCompleteVerticalGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#2E85EC" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#2E85EC" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#2E85EC" stopOpacity="0.2" />
                </linearGradient>
            </defs>
            <g transform="translate(2, 2)">
                {Array.from({ length: WIDTH * HEIGHT }).map((_, index) => {
                    // TODO
                    const cellX = index % WIDTH;
                    const cellY = Math.floor(index / WIDTH);
                    const cell = gameState.Puzzle.Grid.getCell(cellX, cellY);
                    return (
                        <g
                            key={index}
                            transform={`translate(${CELL_SIZE * cellX}, ${CELL_SIZE * cellY})`}
                            clipPath="url(#cellClip)"
                        >
                            <CellComponent
                                isFilled={cell.IsFilled}
                                width={CELL_SIZE}
                                height={CELL_SIZE}
                                overflow="hidden"
                            />
                            {cell.IsFlagged && (
                                <use
                                    href="#flagIcon"
                                    width={CELL_SIZE}
                                    height={CELL_SIZE}
                                    fill={cell.HasError ? '#F65C5C' : '#344861'}
                                />
                            )}
                        </g>
                    );
                })}
                {/* Row Complete Animation */}
                {lineCompleteState.row.isActive && (
                    <g key={lineCompleteState.row.key} clipPath="url(#gridClip)">
                        <g
                            transform={`translate(${(lineCompleteState.row.x + 0.5) * CELL_SIZE} ${(lineCompleteState.row.y + 0.5) * CELL_SIZE})`}
                        >
                            <LineComplete
                                orientation={Orientation.Horizontal}
                                x={(-1.5 * WIDTH * CELL_SIZE) / 2}
                                y={(-1 * CELL_SIZE) / 2}
                                width={1.5 * WIDTH * CELL_SIZE}
                                height={CELL_SIZE}
                                fill="url(#lineCompleteHorizontalGradient)"
                            />
                        </g>
                    </g>
                )}
                {/* Column Complete Animation */}
                {lineCompleteState.column.isActive && (
                    <g key={lineCompleteState.column.key} clipPath="url(#gridClip)">
                        <g
                            transform={`translate(${(lineCompleteState.column.x + 0.5) * CELL_SIZE} ${(lineCompleteState.column.y + 0.5) * CELL_SIZE})`}
                        >
                            <LineComplete
                                orientation={Orientation.Vertical}
                                x={(-1 * CELL_SIZE) / 2}
                                y={(-1.5 * HEIGHT * CELL_SIZE) / 2}
                                width={CELL_SIZE}
                                height={1.5 * HEIGHT * CELL_SIZE}
                                fill="url(#lineCompleteVerticalGradient)"
                            />
                        </g>
                    </g>
                )}
                {/* Vertical Section Lines */}
                {Array.from({ length: Math.ceil(WIDTH / 5) + 1 }).map((_, i) => {
                    const x = CELL_SIZE * Math.min(i * 5, WIDTH);
                    return (
                        <SectionLine
                            key={i}
                            x1={x}
                            y1={0}
                            x2={x}
                            y2={CELL_SIZE * HEIGHT}
                            strokeWidth={BORDER_STROKE_WIDTH}
                        />
                    );
                })}
                {/* Horizontal Section Lines */}
                {Array.from({ length: Math.ceil(HEIGHT / 5) + 1 }).map((_, i) => {
                    const y = CELL_SIZE * Math.min(i * 5, HEIGHT);
                    return (
                        <SectionLine
                            key={i}
                            x1={0}
                            y1={y}
                            x2={CELL_SIZE * WIDTH}
                            y2={y}
                            strokeWidth={BORDER_STROKE_WIDTH}
                        />
                    );
                })}
            </g>
        </Root>
    );
});

export default Grid;
