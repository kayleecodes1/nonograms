import { createContext } from "react";
import GameState from "../../stores/GameState";

const GameStateContext = createContext<GameState | null>(null);

export default GameStateContext;
