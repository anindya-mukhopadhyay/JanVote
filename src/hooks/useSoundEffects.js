import { useCallback } from 'react';

// Shared audio context so we don't create multiple instances
let audioCtx = null;

const playTone = (freq, type, duration, vol = 0.1) => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  // Resume context if suspended (browser autoplay policy)
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

  // Envelope
  gainNode.gain.setValueAtTime(vol, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + duration);
};

export function useSoundEffects() {
  const playClick = useCallback(() => {
    playTone(600, 'sine', 0.1, 0.05);
  }, []);

  const playPop = useCallback(() => {
    playTone(800, 'sine', 0.15, 0.1);
  }, []);

  const playSuccess = useCallback(() => {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    
    // Play a quick arpeggio
    playTone(440, 'sine', 0.1, 0.05); // A4
    setTimeout(() => playTone(554.37, 'sine', 0.1, 0.05), 100); // C#5
    setTimeout(() => playTone(659.25, 'sine', 0.3, 0.05), 200); // E5
  }, []);

  const playError = useCallback(() => {
    playTone(200, 'sawtooth', 0.2, 0.05);
    setTimeout(() => playTone(150, 'sawtooth', 0.3, 0.05), 150);
  }, []);

  return { playClick, playPop, playSuccess, playError };
}
