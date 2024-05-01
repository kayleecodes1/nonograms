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
        // TODO why do we need to store solution?
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

    public destroy(): void {
        this._eventSystem.clear();
    }

    // TODO
    public guess(x: number, y: number, guess: boolean): void {
        const cell = this.Grid.getCell(x, y);

        // If the cell is not empty, do nothing.
        if (!cell.IsEmpty) {
            return;
        }

        // Set the cell state.
        cell.setState(guess ? Cell.State.Filled : Cell.State.Flagged);

        // TODO need to separate state, correctness, and display state
        //      in current game rules, cells that are "incorrect" are still considered correctly filled
        //          because a cell cannot be filled in wrong

        // Emit event based on result of the guess.
        if (cell.IsCorrect) {
            if (cell.State === Cell.State.Filled) {
                this._eventSystem.emit('fill', x, y);
            } else if (cell.State === Cell.State.Flagged) {
                this._eventSystem.emit('flag', x, y);
            }
        } else {
            this._eventSystem.emit('error', x, y);
        }

        // Check if the row or column is complete.
        // If it is, fill any empty cells and emit event.
        const row = this._grid.getRow(y);
        const column = this._grid.getColumn(x);
        const args: [Cell[], number, 'rowComplete' | 'columnComplete'][] = [
            [row, y, 'rowComplete'],
            [column, x, 'columnComplete'],
        ];
        for (const [cells, coordinate, event] of args) {
            const isSolved = cells.every((cell) => cell.IsCorrect);
            if (isSolved) {
                for (const cell of cells) {
                    cell.solve();
                }
                this._eventSystem.emit(event, coordinate);
            }
        }
    }

    public reset(): void {
        this._grid = Puzzle._createEmptyGrid(this._solution);
    }

    public addListener<Event extends keyof Puzzle.Events>(event: Event, listener: Puzzle.Events[Event]): void {
        this._eventSystem.on(event, listener);
    }

    public removeListener<Event extends keyof Puzzle.Events>(event: Event, listener: Puzzle.Events[Event]): void {
        this._eventSystem.off(event, listener);
    }

    protected static _createEmptyGrid(solution: boolean[][]) {
        const cells = solution.map((row, y) => row.map((value, x) => new Cell(x, y, value)));
        return new Grid(cells);
    }

    protected static _getLabel(cells: Cell[]): Puzzle.Label {
        // Determine the groups for the solution.
        const solutionGroups = countAdjacent(cells.map((cell) => cell.Solution));
        const label = solutionGroups.map((count) => ({
            count,
            isSolved: false,
        }));

        // Check for correctness from the beginning and then from the end.
        // Update label solved state based on results.
        let currentIndex = 0;
        let currentCount = 0;
        let i = 0;
        for (i; i < cells.length; i++) {
            const cell = cells[i];
            if (cell.IsEmpty || !cell.IsCorrect) {
                break;
            }
            if (cell.Solution === false) {
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
            if (cell.Solution === false) {
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
        fill: (x: number, y: number) => void;
        flag: (x: number, y: number) => void;
        error: (x: number, y: number) => void;
        rowComplete: (y: number) => void;
        columnComplete: (x: number) => void;
    };
}

export default Puzzle;
