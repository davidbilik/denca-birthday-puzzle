import { Howl } from 'howler';
import { getAssetPath } from './assetPath';

type SoundType = 'start' | 'correct' | 'incorrect' | 'complete' | 'hint';

const sounds: Record<SoundType, string[]> = {
  start: [getAssetPath('/sounds/start.m4a')],
  correct: [
    getAssetPath('/sounds/correct1.m4a'),
    getAssetPath('/sounds/correct2.m4a'),
    getAssetPath('/sounds/correct3.m4a')
  ],
  incorrect: [getAssetPath('/sounds/incorrect.m4a')],
  complete: [getAssetPath('/sounds/complete.m4a')],
  hint: [getAssetPath('/sounds/hint.m4a')]
};

let talkingCallbacks = {
  start: () => {},
  stop: () => {}
};

export const setTalkingCallbacks = (callbacks: typeof talkingCallbacks) => {
  talkingCallbacks = callbacks;
};

export const playSound = (type: SoundType) => {
  try {
    const soundOptions = sounds[type];
    // Randomly select a sound from the available options
    const selectedSound = soundOptions[Math.floor(Math.random() * soundOptions.length)];
    
    const sound = new Howl({
      src: [selectedSound],
      volume: 0.7,
      onend: () => {
        talkingCallbacks.stop();
      }
    });

    // Start talking animation for all sounds
    talkingCallbacks.start();
    
    sound.play();
  } catch (error) {
    console.error('Failed to play sound:', error);
  }
}; 