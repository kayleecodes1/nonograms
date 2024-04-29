import { makeAutoObservable } from 'mobx';
import fillWav from '@assets/audio/fill.wav';
import flagWav from '@assets/audio/flag.wav';

const SIZE = 10;

const fillAudio = new Audio(fillWav);
const flagAudio = new Audio(flagWav);

export enum FillMode {
    Fill,
    Flag,
}

export enum CellState {
    Empty,
    Filled,
    Flagged,
}

const validateSolution = (solution: boolean[][]): boolean => {
    return (
        [5, 10, 15].includes(solution.length) &&
        solution.every((row) => row.length === solution.length)
    );
};

class GameState {
    fillMode: FillMode;
    solution: boolean[][];
    cells: CellState[][];

    constructor(solution: boolean[][]) {
        if (!validateSolution(solution)) {
            throw new Error('Invalid solution');
        }

        this.fillMode = FillMode.Fill;
        this.solution = solution;
        this.cells = Array.from({ length: SIZE }, () =>
            Array.from({ length: SIZE }, () => CellState.Empty)
        );
        makeAutoObservable(this);
    }

    get size(): number {
        return this.solution.length;
    }

    // TODO getter for size
    // TODO getter for row and column hints

    setMode(mode: FillMode) {
        this.fillMode = mode;
    }

    toggleMode() {
        this.fillMode =
            this.fillMode === FillMode.Fill ? FillMode.Flag : FillMode.Fill;
    }

    setCellState(x: number, y: number, state: CellState) {
        if (
            this.cells[y][x] !== CellState.Empty ||
            this.cells[y][x] === state
        ) {
            return;
        }

        // Set state.
        this.cells[y][x] = state;

        // TODO convert to event system
        // Play sound effect.
        if (state === CellState.Filled) {
            fillAudio.currentTime = 0;
            fillAudio.play();
        } else {
            flagAudio.currentTime = 0;
            flagAudio.play();
        }
    }
}

export default GameState;
