import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Grid from '@components/Grid';
import PuzzleContainer from '@components/PuzzleContainer';
import { useGameState } from '@contexts/GameStateContext';
import { FillMode } from '@models/GameState';

// TODO move row and column labels into MobX getter
// TODO render labels with `solved` attribute

const Main = styled.main({
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    gap: 32,
    userSelect: 'none',
});

const App: React.FC = observer(() => {
    const gameState = useGameState();

    // useEffect(() => {
    //     const handleContextMenu = (event: MouseEvent) => {
    //         event.preventDefault();
    //     };
    //     document.addEventListener('contextmenu', handleContextMenu);
    //     return () => {
    //         document.removeEventListener('contextmenu', handleContextMenu);
    //     };
    // }, []);

    const handleFill = (x: number, y: number, fillMode: FillMode): void => {
        gameState.Puzzle.guess(x, y, fillMode === FillMode.Fill);
    };

    return (
        <Main>
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
                    <Grid onFill={handleFill} />
                </PuzzleContainer.Main>
            </PuzzleContainer>
        </Main>
    );
});

export default App;
