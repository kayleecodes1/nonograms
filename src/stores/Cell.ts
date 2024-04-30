import { makeAutoObservable } from 'mobx';

export class Cell {
    private _position: Cell.Position;
    private _solution: Cell.Solution;
    private _state: Cell.State;

    constructor(x: number, y: number, solution: Cell.Solution) {
        this._position = { x, y };
        this._solution = solution;
        this._state = Cell.State.Empty;

        makeAutoObservable(this);
    }

    public get Position(): Cell.Position {
        return this._position;
    }

    public get Solution(): Cell.Solution {
        return this._solution;
    }

    public get State(): Cell.State {
        return this._state;
    }

    public get IsEmpty(): boolean {
        return this._state === Cell.State.Empty;
    }

    public get IsFilled(): boolean {
        return this._state === Cell.State.Filled;
    }

    public get IsFlagged(): boolean {
        return this._state === Cell.State.Flagged;
    }

    public get IsCorrect(): boolean {
        return (
            (this._state === Cell.State.Filled &&
                this._solution === Cell.Solution.Filled) ||
            (this._state === Cell.State.Flagged &&
                this._solution === Cell.Solution.Flagged)
        );
    }

    public setState(state: Cell.State): void {
        this._state = state;
    }
}

export namespace Cell {
    export type Position = {
        x: number;
        y: number;
    };

    export enum Solution {
        Filled,
        Flagged,
    }

    export enum State {
        Empty,
        Filled,
        Flagged,
    }
}

export default Cell;
