import React from 'react';
import ReactDOM from 'react-dom/client';
import { Reset } from 'styled-reset';
import { GameStateProvider } from '@contexts/GameStateContext';
import puzzles from '@data/puzzles';
import GameState from '@models/GameState.ts';
import App from './App.tsx';
import './main.css';

const gameState = new GameState(puzzles[1]);

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
