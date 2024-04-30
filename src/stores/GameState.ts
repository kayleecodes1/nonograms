import { makeAutoObservable } from 'mobx';
import fillWav from '@assets/audio/fill.wav';
import flagWav from '@assets/audio/flag.wav';
import errorWav from '@assets/audio/error.wav';
import Cell from '@stores/Cell';
import Puzzle from '@stores/Puzzle';

const fillAudio = new Audio(fillWav);
const flagAudio = new Audio(flagWav);
const errorAudio = new Audio(errorWav);

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
                fillAudio.currentTime = 0;
                fillAudio.play();
            } else if (state === Cell.State.Flagged) {
                flagAudio.currentTime = 0;
                flagAudio.play();
            }
        } else {
            errorAudio.currentTime = 0;
            errorAudio.play();
        }

        // TODO if a row is finished, play sound
        //      get row and column and check if all !IsEmpty

        // TODO convert audio to event system so it can be handled elsewhere
        //      can also use error subscription to allow components to pause / cancel drag state
    }
}

export default GameState;
