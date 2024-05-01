import { makeAutoObservable } from 'mobx';

class Grid<T> {
    private _cells: T[][];

    constructor(cells: T[][]) {
        if (!cells.every((row) => row.length === cells[0].length)) {
            throw new Error('Grid rows must all be of equal size');
        }

        this._cells = cells;

        makeAutoObservable(this);
    }

    public get Width(): number {
        return this._cells[0].length;
    }

    public get Height(): number {
        return this._cells.length;
    }

    public getCell(x: number, y: number): T {
        return this._cells[y][x];
    }

    public setCell(x: number, y: number, value: T): void {
        this._cells[y][x] = value;
    }

    public getRow(rowIndex: number): T[] {
        const row = [];
        for (let i = 0; i < this.Width; i++) {
            row.push(this._cells[rowIndex][i]);
        }
        return row;
    }

    public getRows(): T[][] {
        const rows = [];
        for (let i = 0; i < this.Height; i++) {
            rows.push(this.getRow(i));
        }
        return rows;
    }

    public getColumn(columnIndex: number): T[] {
        const column = [];
        for (let i = 0; i < this.Height; i++) {
            column.push(this._cells[i][columnIndex]);
        }
        return column;
    }

    public getColumns(): T[][] {
        const columns = [];
        for (let i = 0; i < this.Width; i++) {
            columns.push(this.getColumn(i));
        }
        return columns;
    }
}

export default Grid;
