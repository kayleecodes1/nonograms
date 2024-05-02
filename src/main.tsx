import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
import { GameStateProvider } from '@contexts/GameStateContext';
import puzzles from '@data/puzzles';
import GameState from '@models/GameState.ts';
import CssBaseline from '@styles/CssBaseline';
import ThemeProvider from '@styles/ThemeProvider';
import '@fontsource/roboto-mono/400.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';
import App from './App.tsx';

const gameState = new GameState(puzzles[0]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <CssBaseline />
            <StyleSheetManager shouldForwardProp={isPropValid}>
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
            </StyleSheetManager>
        </ThemeProvider>
    </React.StrictMode>,
);
