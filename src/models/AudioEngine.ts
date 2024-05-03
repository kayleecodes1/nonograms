import errorSrc from '@assets/audio/error.wav';
import fillSrc from '@assets/audio/fill.wav';
import flagSrc from '@assets/audio/flag.wav';
import successSrc from '@assets/audio/success.wav';
import toggleSrc from '@assets/audio/toggle.wav';
import victorySrc from '@assets/audio/victory.wav';

export class AudioEngine {
    private _audio: { [key in AudioEngine.Sound]: HTMLAudioElement } = {
        [AudioEngine.Sound.Error]: new Audio(errorSrc),
        [AudioEngine.Sound.Fill]: new Audio(fillSrc),
        [AudioEngine.Sound.Flag]: new Audio(flagSrc),
        [AudioEngine.Sound.Success]: new Audio(successSrc),
        [AudioEngine.Sound.Toggle]: new Audio(toggleSrc),
        [AudioEngine.Sound.Victory]: new Audio(victorySrc),
    };

    public playSound(sound: AudioEngine.Sound): void {
        const audio = this._audio[sound];
        audio.currentTime = 0;
        audio.play();
    }
}

export namespace AudioEngine {
    export enum Sound {
        Error = 'error',
        Fill = 'fill',
        Flag = 'flag',
        Success = 'success',
        Toggle = 'toggle',
        Victory = 'victory',
    }
}

export default AudioEngine;
