import { makeAutoObservable } from 'mobx';
import Cell from '@models/Cell';
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

    setCellState(x: number, y: number, state: Cell.State) {
        const cell = this._puzzle.Grid.getCell(x, y);
        if (!cell.IsEmpty) {
            return;
        }

        cell.setState(state);

        if (cell.IsCorrect) {
            if (state === Cell.State.Filled) {
                this._puzzle.emit('fill', x, y);
            } else if (state === Cell.State.Flagged) {
                this._puzzle.emit('flag', x, y);
            }
        } else {
            this._puzzle.emit('error', x, y);
        }

        // TODO if a row is finished, play sound
        //      get row and column and check if all !IsEmpty
    }
}

export default GameState;
