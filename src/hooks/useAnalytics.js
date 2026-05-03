import { useCallback } from 'react';
import { logCustomEvent } from '../firebase';

/**
 * Custom hook for interacting with Google Analytics.
 * Demonstrates clean abstraction of Google Services usage.
 */
export function useAnalytics() {
  const trackInteraction = useCallback((elementName, action = 'click') => {
    logCustomEvent('user_interaction', {
      element: elementName,
      action: action,
      timestamp: new Date().toISOString()
    });
  }, []);

  const trackQuizStart = useCallback((quizName) => {
    logCustomEvent('quiz_start', {
      quiz_id: quizName,
      start_time: new Date().toISOString()
    });
  }, []);

  return {
    trackInteraction,
    trackQuizStart
  };
}
