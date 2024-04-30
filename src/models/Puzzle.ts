import { makeAutoObservable } from 'mobx';
import Cell from '@models/Cell';
import Grid from '@models/Grid';
import countAdjacent from '@utilities/countAdjacent';

export class Puzzle {
    private _solution: boolean[][];
    private _grid: Grid<Cell>;

    constructor(solution: boolean[][]) {
        if (![5, 10, 15].includes(solution.length)) {
            throw new Error('Solution must be of size 5, 10, or 15');
        }

        this._solution = solution;
        this._grid = Puzzle._createEmptyGrid(solution);

        makeAutoObservable(this);
    }

    public get Grid(): Grid<Cell> {
        return this._grid;
    }

    public get Size(): number {
        return this._grid.Size;
    }

    public get RowLabels(): Puzzle.Label[] {
        return this._grid.getRows().map(Puzzle._getLabel);
    }

    public get ColumnLabels(): Puzzle.Label[] {
        return this._grid.getColumns().map(Puzzle._getLabel);
    }

    public reset(): void {
        this._grid = Puzzle._createEmptyGrid(this._solution);
    }

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
}

export default Puzzle;
