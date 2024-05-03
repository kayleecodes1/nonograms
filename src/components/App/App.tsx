import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import InteractiveGrid, { InteractiveGridRef } from '@components/InteractiveGrid';
import PuzzleContainer from '@components/PuzzleContainer';
import { MouseButton, Orientation } from '@constants/index';
import { useGameState } from '@contexts/GameStateContext';
import { Root } from './App.styles';

const App: React.FC = observer(() => {
    const gameState = useGameState();
    const interactiveGrid = useRef<InteractiveGridRef>();

    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    const handleInteract = (x: number, y: number, button: MouseButton) => {
        gameState.Puzzle.guess(x, y, button === MouseButton.Left);
    };

    useEffect(() => {
        const handleError = () => {
            interactiveGrid.current?.cancelDrag();
        };
        const handleLineComplete = (x: number, y: number, orientation: Orientation) => {
            interactiveGrid.current?.animateLineComplete(x, y, orientation);
        };

        gameState.Puzzle.addListener('error', handleError);
        gameState.Puzzle.addListener('lineComplete', handleLineComplete);

        return () => {
            gameState.Puzzle.removeListener('error', handleError);
            gameState.Puzzle.removeListener('lineComplete', handleLineComplete);
        };
    }, []);

    return (
        <Root>
            <PuzzleContainer>
                <PuzzleContainer.RowLabels>
                    {gameState.Puzzle.RowLabels.map((label, i) => (
                        <PuzzleContainer.Label key={i} label={label} />
                    ))}
                </PuzzleContainer.RowLabels>
                <PuzzleContainer.ColumnLabels>
                    {gameState.Puzzle.ColumnLabels.map((label, i) => (
                        <PuzzleContainer.Label key={i} label={label} />
                    ))}
                </PuzzleContainer.ColumnLabels>
                <PuzzleContainer.Main>
                    <InteractiveGrid
                        ref={interactiveGrid}
                        width={gameState.Puzzle.Width}
                        height={gameState.Puzzle.Height}
                        onInteract={handleInteract}
                    >
                        {gameState.Puzzle.Cells.map((cell, index) => (
                            <InteractiveGrid.Cell
                                key={index}
                                x={cell.Position.x}
                                y={cell.Position.y}
                                variant={
                                    cell.IsEmpty
                                        ? 'empty'
                                        : cell.IsFilled
                                          ? 'filled'
                                          : !cell.HasError
                                            ? 'flagged'
                                            : 'flaggedError'
                                }
                            />
                        ))}
                    </InteractiveGrid>
                </PuzzleContainer.Main>
            </PuzzleContainer>
        </Root>
    );
});

export default App;
