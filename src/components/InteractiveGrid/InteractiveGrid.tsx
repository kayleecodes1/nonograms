import React, {
    ForwardRefExoticComponent,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { observer } from 'mobx-react-lite';
import { MouseButton, Orientation } from '@constants/index';
import clamp from '@utilities/clamp';
import range from '@utilities/range';
import transformScreenToSvg from '@utilities/transformScreenToSvg';
import Cell from './Cell';
import { LINE_COMPLETE_DURATION, Root, SectionLine, LineComplete } from './InteractiveGrid.styles';

const CELL_SIZE = 48;
const BORDER_STROKE_WIDTH = 4;

interface InteractiveGridProps extends React.PropsWithChildren {
    width: number;
    height: number;
    onInteract(x: number, y: number, button: MouseButton): void;
}

interface InteractiveGridChildComponents {
    Cell: typeof Cell;
}

export interface InteractiveGridRef {
    cancelDrag: () => void;
    animateLineComplete: (x: number, y: number, orientation: Orientation) => void;
}

const _InteractiveGrid: ForwardRefExoticComponent<InteractiveGridProps & React.RefAttributes<InteractiveGridRef>> =
    forwardRef(({ children, width, height, onInteract }, ref) => {
        const svgRef = useRef<SVGSVGElement | null>(null);

        const getGridCoordinate = useCallback(
            (screenPoint: { x: number; y: number }) => {
                const svg = svgRef.current;
                if (!svg) {
                    return null;
                }
                const { x, y } = transformScreenToSvg(svg, screenPoint);
                return {
                    x: clamp(0, width - 1, Math.floor((x - 2) / CELL_SIZE)),
                    y: clamp(0, height - 1, Math.floor((y - 2) / CELL_SIZE)),
                };
            },
            [width, height],
        );

        //--------------------------------------------------------------------------
        // Cell Interaction
        //--------------------------------------------------------------------------

        const dragState = useRef({
            isDragging: false,
            dragStart: { x: -1, y: -1 },
            dragDirection: null as Orientation | null,
            button: MouseButton.Left,
            lastInteraction: { x: -1, y: -1 },
        });

        const handleInteract = useCallback(
            (x: number, y: number) => {
                onInteract(x, y, dragState.current.button);
                dragState.current.lastInteraction = { x, y };
            },
            [onInteract],
        );

        const startDrag = useCallback(
            (x: number, y: number, button: MouseButton) => {
                dragState.current.isDragging = true;
                dragState.current.dragStart = { x, y };
                dragState.current.button = button;
                handleInteract(x, y);
            },
            [handleInteract],
        );

        const cancelDrag = useCallback(() => {
            dragState.current.isDragging = false;
            dragState.current.dragDirection = null;
            dragState.current.button = MouseButton.Left;
            dragState.current.lastInteraction = { x: -1, y: -1 };
        }, []);

        const handleMouseDown = useCallback(
            (event: React.MouseEvent) => {
                let button: MouseButton;
                if (event.button === 0) {
                    button = MouseButton.Left;
                } else if (event.button === 2) {
                    button = MouseButton.Right;
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
                startDrag(x, y, button);
            },
            [getGridCoordinate, startDrag],
        );

        useEffect(() => {
            const handleMouseMove = (event: MouseEvent) => {
                // If not dragging, do nothing.
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

                // If this is the same cell as the last interaction, do nothing.
                if (x === dragState.current.lastInteraction.x && y === dragState.current.lastInteraction.y) {
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

                if (dragState.current.dragDirection === Orientation.Horizontal) {
                    for (const x0 of range(dragState.current.dragStart.x, x, { exclusiveStart: true })) {
                        handleInteract(x0, dragState.current.dragStart.y);
                    }
                } else if (dragState.current.dragDirection === Orientation.Vertical) {
                    for (const y0 of range(dragState.current.dragStart.y, y, { exclusiveStart: true })) {
                        // TODO if last interaction is the same as this one, skip
                        handleInteract(dragState.current.dragStart.x, y0);
                    }
                }
            };

            const handleMouseUp = () => {
                cancelDrag();
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            };
        }, [getGridCoordinate, handleInteract, cancelDrag]);

        //--------------------------------------------------------------------------
        // Line Complete
        //--------------------------------------------------------------------------

        const lineCompleteNonces = useRef({
            [Orientation.Horizontal]: {},
            [Orientation.Vertical]: {},
        });
        const [lineCompleteState, setLineCompleteState] = useState(() => ({
            [Orientation.Horizontal]: {
                isActive: false,
                key: -1,
                x: -1,
                y: -1,
            },
            [Orientation.Vertical]: {
                isActive: false,
                key: -1,
                x: -1,
                y: -1,
            },
        }));

        const animateLineComplete = useCallback((x: number, y: number, orientation: Orientation): void => {
            const nonce = (lineCompleteNonces.current[orientation] = {});

            // Activate the animation.
            setLineCompleteState((prevState) => ({
                ...prevState,
                [orientation]: {
                    isActive: true,
                    key: Date.now(),
                    x,
                    y,
                },
            }));

            // Wait for animation to complete and then de-activate it.
            setTimeout(() => {
                // If the nonce has changed, then another animation has begun. Do nothing.
                if (nonce !== lineCompleteNonces.current[orientation]) {
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
        }, []);

        //--------------------------------------------------------------------------
        // Exposed Ref
        //--------------------------------------------------------------------------

        useImperativeHandle(
            ref,
            () => ({
                cancelDrag,
                animateLineComplete,
            }),
            [cancelDrag],
        );

        //--------------------------------------------------------------------------
        // Render
        //--------------------------------------------------------------------------

        const SVG_WIDTH = CELL_SIZE * width + BORDER_STROKE_WIDTH;
        const SVG_HEIGHT = CELL_SIZE * height + BORDER_STROKE_WIDTH;

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
                        <rect width={CELL_SIZE * width} height={height * CELL_SIZE} />
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
                    {React.Children.map(children, (child) => {
                        if (!React.isValidElement(child) || child.type !== Cell) {
                            return null;
                        }
                        return child;
                    })}
                    {/* Row Complete Animation */}
                    {lineCompleteState[Orientation.Horizontal].isActive && (
                        <g key={lineCompleteState[Orientation.Horizontal].key} clipPath="url(#gridClip)">
                            <g
                                transform={`translate(${(lineCompleteState[Orientation.Horizontal].x + 0.5) * CELL_SIZE} ${(lineCompleteState[Orientation.Horizontal].y + 0.5) * CELL_SIZE})`}
                            >
                                <LineComplete
                                    orientation={Orientation.Horizontal}
                                    x={(-1.5 * width * CELL_SIZE) / 2}
                                    y={(-1 * CELL_SIZE) / 2}
                                    width={1.5 * width * CELL_SIZE}
                                    height={CELL_SIZE}
                                    fill="url(#lineCompleteHorizontalGradient)"
                                />
                            </g>
                        </g>
                    )}
                    {/* Column Complete Animation */}
                    {lineCompleteState[Orientation.Vertical].isActive && (
                        <g key={lineCompleteState[Orientation.Vertical].key} clipPath="url(#gridClip)">
                            <g
                                transform={`translate(${(lineCompleteState[Orientation.Vertical].x + 0.5) * CELL_SIZE} ${(lineCompleteState[Orientation.Vertical].y + 0.5) * CELL_SIZE})`}
                            >
                                <LineComplete
                                    orientation={Orientation.Vertical}
                                    x={(-1 * CELL_SIZE) / 2}
                                    y={(-1.5 * height * CELL_SIZE) / 2}
                                    width={CELL_SIZE}
                                    height={1.5 * height * CELL_SIZE}
                                    fill="url(#lineCompleteVerticalGradient)"
                                />
                            </g>
                        </g>
                    )}
                    {/* Vertical Section Lines */}
                    {Array.from({ length: Math.ceil(width / 5) + 1 }).map((_, i) => {
                        const x = CELL_SIZE * Math.min(i * 5, width);
                        return (
                            <SectionLine
                                key={i}
                                x1={x}
                                y1={0}
                                x2={x}
                                y2={CELL_SIZE * height}
                                strokeWidth={BORDER_STROKE_WIDTH}
                            />
                        );
                    })}
                    {/* Horizontal Section Lines */}
                    {Array.from({ length: Math.ceil(height / 5) + 1 }).map((_, i) => {
                        const y = CELL_SIZE * Math.min(i * 5, height);
                        return (
                            <SectionLine
                                key={i}
                                x1={0}
                                y1={y}
                                x2={CELL_SIZE * width}
                                y2={y}
                                strokeWidth={BORDER_STROKE_WIDTH}
                            />
                        );
                    })}
                </g>
            </Root>
        );
    });

_InteractiveGrid.displayName = 'InteractiveGrid';
(_InteractiveGrid as unknown as InteractiveGridChildComponents).Cell = Cell;

const InteractiveGrid = observer(_InteractiveGrid);

export default InteractiveGrid;
