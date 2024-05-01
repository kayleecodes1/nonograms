import { createContext } from 'react';
import GameState from '../../models/GameState';

const GameStateContext = createContext<GameState | null>(null);

export default GameStateContext;
