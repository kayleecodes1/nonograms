import { makeAutoObservable } from 'mobx';

interface PuzzleData {
    size: number;
    data: number[];
}

class Puzzle {
    readonly data: boolean[][];

    get size(): number {
        return this.data.length;
    }

    get rowHints(): number[][] {
        const result: number[][] = [];
        let currentCount = 0;
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < this.data[i].length; j++) {
                const rowResult: number[] = [];
                if (this.data[i][j]) {
                    currentCount++;
                } else if (currentCount > 0) {
                    rowResult.push(currentCount);
                    currentCount = 0;
                }
                result.push(rowResult);
            }
        }
        return result;
    }

    get columnHints(): number[][] {
        const result: number[][] = [];
        let currentCount = 0;
        for (let i = 0; i < this.data[0].length; i++) {
            // TODO iterate over
            for (let j = 0; j < this.data[i].length; j++) {
                const columnResult: number[] = [];
                if (this.data[i][j]) {
                    currentCount++;
                } else if (currentCount > 0) {
                    columnResult.push(currentCount);
                    currentCount = 0;
                }
                result.push(columnResult);
            }
        }
        return result;
    }

    constructor(data: boolean[][]) {
        // TODO validate input? columns and rows have equal length
        this.data = data;
        makeAutoObservable(this);
    }

    increaseTimer() {
        this.secondsPassed += 1;
    }
}

export default Puzzle;
