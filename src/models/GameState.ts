import { makeAutoObservable } from 'mobx';
import AudioEngine from './AudioEngine';
import Puzzle from '@models/Puzzle';

// TODO remove
export enum FillMode {
    Fill,
    Flag,
}

class GameState {
    private _puzzle: Puzzle;
    private _audioEngine: AudioEngine;

    constructor(solution: boolean[][]) {
        this._puzzle = new Puzzle(solution);
        this._audioEngine = new AudioEngine();

        this._setupAudioEvents();

        makeAutoObservable(this);
    }

    get Puzzle(): Puzzle {
        return this._puzzle;
    }

    public destroy(): void {
        this._puzzle.destroy();
    }

    private _setupAudioEvents(): void {
        const createPlaySoundCallback = (sound: AudioEngine.Sound) => () => {
            this._audioEngine.playSound(sound);
        };
        this.Puzzle.addListener('fill', createPlaySoundCallback(AudioEngine.Sound.Fill));
        this.Puzzle.addListener('flag', createPlaySoundCallback(AudioEngine.Sound.Flag));
        this.Puzzle.addListener('error', createPlaySoundCallback(AudioEngine.Sound.Error));
        this.Puzzle.addListener('lineComplete', createPlaySoundCallback(AudioEngine.Sound.Success));
    }
}

export default GameState;
