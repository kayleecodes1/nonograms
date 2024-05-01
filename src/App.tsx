import React, { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import Grid from '@components/Grid';
import PuzzleContainer from '@components/PuzzleContainer';
import { useGameState } from '@contexts/GameStateContext';
import AudioEngine from '@models/AudioEngine';
import Cell from '@models/Cell';
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

    const audioEngine = useMemo(() => new AudioEngine(), []);

    useEffect(() => {
        const fillListener = () => {
            audioEngine.playSound(AudioEngine.Sound.Fill)
        };
        const flagListener = () => {
            audioEngine.playSound(AudioEngine.Sound.Flag)
        };
        const errorListener = () => {
            audioEngine.playSound(AudioEngine.Sound.Error)
        };

        gameState.Puzzle.addListener('fill', fillListener);
        gameState.Puzzle.addListener('flag', flagListener);
        gameState.Puzzle.addListener('error', errorListener);

        return () => {
            gameState.Puzzle.removeListener('fill', fillListener);
            gameState.Puzzle.removeListener('flag', flagListener);
            gameState.Puzzle.removeListener('error', errorListener);
        };
    }, [audioEngine]);

    useEffect(() => {
        const handleContextMenu = (event: MouseEvent) => {
            event.preventDefault();
        };
        document.addEventListener('contextmenu', handleContextMenu);
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

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
