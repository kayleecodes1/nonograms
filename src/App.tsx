import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import FillModeToggle from './components/FillModeToggle';
import Grid from './components/Grid';
import { useGameState } from './contexts/GameStateContext';
import { FillMode, CellState } from './stores/GameState';

const Main = styled.main({
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    gap: 32,
    userSelect: 'none',
});

const App: React.FC = observer(() => {
    const gameState = useGameState();

    const handleToggleFillMode = () => {
        gameState.toggleMode();
    };

    const handleFill = (x: number, y: number): void => {
        gameState.setCellState(
            x,
            y,
            gameState.fillMode === FillMode.Fill
                ? CellState.Filled
                : CellState.Flagged
        );
    };

    return (
        <Main>
            <Grid
                onFill={handleFill}
                size={gameState.size}
                state={gameState.cells}
            />
            <FillModeToggle
                fillMode={gameState.fillMode}
                onToggle={handleToggleFillMode}
            />
        </Main>
    );
});

export default App;
