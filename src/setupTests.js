import '@testing-library/jest-dom';

// Mock Web Audio API for tests since jsdom doesn't support it
window.AudioContext = class AudioContext {
  createOscillator() {
    return {
      type: 'sine',
      frequency: { setValueAtTime: () => {} },
      connect: () => {},
      start: () => {},
      stop: () => {},
    };
  }
  createGain() {
    return {
      gain: {
        setValueAtTime: () => {},
        exponentialRampToValueAtTime: () => {},
      },
      connect: () => {},
    };
  }
};

// Mock scrollIntoView which is not available in jsdom
Element.prototype.scrollIntoView = vi.fn();
// Mock IntersectionObserver for JSDOM
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() { return [] }
};

window.IntersectionObserver = global.IntersectionObserver;
