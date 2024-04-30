import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Grid from '@components/Grid';
import PuzzleContainer from '@components/PuzzleContainer';
import { useGameState } from '@contexts/GameStateContext';
import Cell from '@models/Cell';
import { FillMode } from '@models/GameState';
import {
    calculateRowLabels,
    calculateColumnLabels,
} from '_puzzleUtilities/foo';

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

    const handleFill = (x: number, y: number, fillMode: FillMode): void => {
        const state =
            fillMode === FillMode.Fill ? Cell.State.Filled : Cell.State.Flagged;
        gameState.setCellState(x, y, state);
    };

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
