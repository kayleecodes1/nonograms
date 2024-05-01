import { makeAutoObservable } from 'mobx';
import Cell from '@models/Cell';
import EventSystem from '@models/EventSystem';
import Grid from '@models/Grid';
import countAdjacent from '@utilities/countAdjacent';

export class Puzzle {
    private _solution: boolean[][];
    private _grid: Grid<Cell>;
    private _eventSystem: EventSystem<Puzzle.Events>;

    constructor(solution: boolean[][]) {
        this._solution = solution;
        this._grid = Puzzle._createEmptyGrid(solution);
        this._eventSystem = new EventSystem();

        makeAutoObservable(this);
    }

    public get Grid(): Grid<Cell> {
        return this._grid;
    }

    public get Width(): number {
        return this._grid.Width;
    }

    public get Height(): number {
        return this._grid.Height;
    }

    public get RowLabels(): Puzzle.Label[] {
        return this._grid.getRows().map(Puzzle._getLabel);
    }

    public get ColumnLabels(): Puzzle.Label[] {
        return this._grid.getColumns().map(Puzzle._getLabel);
    }

    // TODO
    // public guess(x: number, y: number, guess: boolean): void {

    //     const cell = this.Grid.getCell(x, y);
    //     if (!cell.IsEmpty) {
    //         return;
    //     }

    //     cell.setState(state);

    //     if (cell.IsCorrect) {
    //         if (state === Cell.State.Filled) {
    //             fillAudio.currentTime = 0;
    //             fillAudio.play();
    //         } else if (state === Cell.State.Flagged) {
    //             flagAudio.currentTime = 0;
    //             flagAudio.play();
    //         }
    //     } else {
    //         errorAudio.currentTime = 0;
    //         errorAudio.play();
    //     }

    //     // TODO check if !IsEmpty

    //     // TODO emit fill or error event

    //     // TODO check if row or column is complete
    //     //      if so, fill empties with flags and emit event
    // }

    public reset(): void {
        this._grid = Puzzle._createEmptyGrid(this._solution);
    }

    // TODO remove this once guess logic is moved from GameState
    public emit<Event extends keyof Puzzle.Events>(event: Event, ...args: Parameters<Puzzle.Events[Event]>): void {
        this._eventSystem.emit(event, ...args);
    }

    public addListener<Event extends keyof Puzzle.Events>(event: Event, listener: Puzzle.Events[Event]): void {
        this._eventSystem.on(event, listener);
    }

    public removeListener<Event extends keyof Puzzle.Events>(event: Event, listener: Puzzle.Events[Event]): void {
        this._eventSystem.off(event, listener);
    }

    public clearListeners(): void {
        this._eventSystem.clear();
    }

    // protected static _checkSolved(cells: Cell[]): boolean {
    //     for (const cell of cells) {
    //         // TODO
    //     }
    //     return true;
    // }

    // protected static _fillCells(cells: Cell[]): void {
    //     for (const cell of cells) {
    //         // TODO
    //     }
    // }

    protected static _createEmptyGrid(solution: boolean[][]) {
        const cells = solution.map((row, y) =>
            row.map(
                (value, x) =>
                    new Cell(
                        x,
                        y,
                        value ? Cell.Solution.Filled : Cell.Solution.Flagged
                    )
            )
        );
        return new Grid(cells);
    }

    protected static _getLabel(cells: Cell[]): Puzzle.Label {
        const solution = cells.map((cell) => cell.Solution === Cell.Solution.Filled);
        const label = countAdjacent(solution).map((count) => ({
            count,
            isSolved: false,
        }));

        let currentIndex = 0;
        let currentCount = 0;
        let i = 0;
        for (i; i < cells.length; i++) {
            const cell = cells[i];
            if (cell.IsEmpty || !cell.IsCorrect) {
                break;
            }
            if (cell.Solution === Cell.Solution.Flagged) {
                continue;
            }
            currentCount++;
            if (currentCount === label[currentIndex].count) {
                label[currentIndex].isSolved = true;
                currentIndex++;
                currentCount = 0;
            }
        }

        currentIndex = label.length - 1;
        currentCount = 0;
        // TODO this code is duplicated from above, abstract this
        for (let j = cells.length - 1; j > i; j--) {
            const cell = cells[j];
            if (cell.IsEmpty || !cell.IsCorrect) {
                break;
            }
            if (cell.Solution === Cell.Solution.Flagged) {
                continue;
            }
            currentCount++;
            if (currentCount === label[currentIndex].count) {
                label[currentIndex].isSolved = true;
                currentIndex--;
                currentCount = 0;
            }
        }

        return label;
    }
}

export namespace Puzzle {
    export enum CellState {
        Empty,
        Filled,
        Flagged,
    }

    export interface Cell {
        state: CellState;
        error: boolean;
    }

    export interface LabelItem {
        count: number;
        isSolved: boolean;
    }

    export type Label = LabelItem[];

    export type Events = {
        'fill': (x: number, y: number) => void,
        'flag': (x: number, y: number) => void,
        'error': (x: number, y: number) => void,
        'rowComplete': (y: number) => void,
        'columnComplete': (x: number) => void,
    }
}

export default Puzzle;
