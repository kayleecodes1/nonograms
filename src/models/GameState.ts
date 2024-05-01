import { makeAutoObservable } from 'mobx';
import Puzzle from '@models/Puzzle';

// TODO remove
export enum FillMode {
    Fill,
    Flag,
}

class GameState {
    private _puzzle: Puzzle;

    constructor(solution: boolean[][]) {
        this._puzzle = new Puzzle(solution);

        makeAutoObservable(this);
    }

    get Puzzle(): Puzzle {
        return this._puzzle;
    }
}

export default GameState;
