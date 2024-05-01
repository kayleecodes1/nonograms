import { makeAutoObservable } from 'mobx';

export class Cell {
    private _position: Cell.Position;
    private _solution: boolean;
    private _state: Cell.State;

    constructor(x: number, y: number, solution: boolean) {
        this._position = { x, y };
        this._solution = solution;
        this._state = Cell.State.Empty;

        makeAutoObservable(this);
    }

    public get Position(): Cell.Position {
        return this._position;
    }

    public get Solution(): boolean {
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
            (this._solution && this._state === Cell.State.Filled) ||
            (!this._solution && (this._state === Cell.State.Empty || this._state === Cell.State.Flagged))
        );
    }

    public setState(state: Cell.State): void {
        this._state = state;
    }

    public solve(): void {
        this._state = this.Solution ? Cell.State.Filled : Cell.State.Flagged;
    }
}

export namespace Cell {
    export type Position = {
        x: number;
        y: number;
    };

    export enum State {
        Empty,
        Filled,
        Flagged,
    }
}

export default Cell;
