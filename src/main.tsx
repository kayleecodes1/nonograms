import React from 'react';
import ReactDOM from 'react-dom/client';
import { Reset } from 'styled-reset';
import { GameStateProvider } from '@contexts/GameStateContext';
import GameState from '@stores/GameState';
import App from './App.tsx';
import './main.css';

// const solution = [
//     [true, false, false, false, false],
//     [true, true, false, false, true],
//     [true, false, false, true, true],
//     [true, false, true, true, true],
//     [false, false, false, true, true],
// ];
const solution = [
    [false, false, true, true, true, true, true, true, false, false],
    [false, true, true, false, false, false, false, true, true, false],
    [true, false, true, true, true, true, true, true, false, true],
    [true, true, true, false, false, false, false, true, true, true],
    [true, true, false, true, true, true, true, false, true, true],
    [true, true, false, true, true, true, true, false, true, true],
    [true, true, true, true, true, true, true, true, true, true],
    [true, false, true, false, false, false, false, true, false, true],
    [true, false, true, false, false, false, false, true, false, true],
    [false, true, true, false, true, true, false, true, true, false]
];
const gameState = new GameState(solution);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Reset />
        <GameStateProvider gameState={gameState}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }}
            >
                <App />
            </div>
        </GameStateProvider>
    </React.StrictMode>
);
