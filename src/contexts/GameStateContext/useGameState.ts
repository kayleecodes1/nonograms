import { useContext } from "react";
import type GameState from "../../models/GameState";
import GameStateContext from "./GameStateContext";

const useGameState = (): GameState => {
    const gameState = useContext(GameStateContext);
    if (gameState === null) {
        throw new Error("GameState is null")
    }
    return gameState;
};

export default useGameState;
