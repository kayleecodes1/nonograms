import type GameState from '../../models/GameState';
import GameStateContext from './GameStateContext';

interface GameStateProviderProps {
    children?: React.ReactNode;
    gameState: GameState;
}
GameStateContext.Provider;
const GameStateProvider: React.FC<GameStateProviderProps> = ({ children, gameState }) => {
    return <GameStateContext.Provider value={gameState}>{children}</GameStateContext.Provider>;
};

export default GameStateProvider;
