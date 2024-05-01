import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Grid from '@components/Grid';
import PuzzleContainer from '@components/PuzzleContainer';
import { useGameState } from '@contexts/GameStateContext';
import { FillMode } from '@models/GameState';

// TODO move row and column labels into MobX getter
// TODO render labels with `solved` attribute

// TODO convert PuzzleContainer to have "slots"

// TODO get rid of

const Main = styled.main({
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    gap: 32,
    userSelect: 'none',
});

const App: React.FC = observer(() => {
    const gameState = useGameState();

    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    // TODO decide whether to move this into 
    const handleFill = (x: number, y: number, fillMode: FillMode): void => {
        gameState.Puzzle.guess(x, y, fillMode === FillMode.Fill);
    };

    // TODO move these into the label components ?
    const rowLabels = gameState.Puzzle.RowLabels;
    const columnLabels = gameState.Puzzle.ColumnLabels;

    return (
        <Main>
            <PuzzleContainer columnLabels={columnLabels} rowLabels={rowLabels}>
                <Grid onFill={handleFill} />
            </PuzzleContainer>
        </Main>
    );
});

export default App;
