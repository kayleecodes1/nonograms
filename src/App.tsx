import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import FitText from '@components/FitText';
import Grid from './components/Grid';
import PuzzleContainer from '@components/PuzzleContainer';
import { useGameState } from './contexts/GameStateContext';
import { FillMode, CellState } from './stores/GameState';
import {
    calculateRowLabels,
    calculateColumnLabels,
} from '_puzzleUtilities/foo';

// TODO move row and column labels into MobX getter

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
        gameState.setCellState(
            x,
            y,
            fillMode === FillMode.Fill ? CellState.Filled : CellState.Flagged
        );
    };

    const rowLabels = calculateRowLabels(gameState.solution);
    const columnLabels = calculateColumnLabels(gameState.solution);

    return (
        <Main>
            <PuzzleContainer columnLabels={columnLabels} rowLabels={rowLabels}>
                <Grid
                    onFill={handleFill}
                    size={gameState.size}
                    state={gameState.cells}
                />
            </PuzzleContainer>
        </Main>
    );
});

export default App;
