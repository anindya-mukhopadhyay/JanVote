import { useState, useEffect } from 'react';

const INITIAL_PROGRESS = {
  timelineCompleted: false,
  questionsAsked: 0,
  quizHighscore: 0,
};

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem('janvote-mastery-progress');
      return stored ? JSON.parse(stored) : INITIAL_PROGRESS;
    } catch (e) {
      return INITIAL_PROGRESS;
    }
  });

  useEffect(() => {
    localStorage.setItem('janvote-mastery-progress', JSON.stringify(progress));
  }, [progress]);

  const completeTimeline = () => {
    setProgress((prev) => ({ ...prev, timelineCompleted: true }));
  };

  const incrementQuestions = () => {
    setProgress((prev) => ({ ...prev, questionsAsked: prev.questionsAsked + 1 }));
  };

  const updateQuizHighscore = (score) => {
    setProgress((prev) => ({
      ...prev,
      quizHighscore: Math.max(prev.quizHighscore, score),
    }));
  };

  // Calculate mastery level
  let level = 1; // Novice
  let nextLevelPercent = 0;
  let title = "Civic Novice";

  let points = 0;
  if (progress.timelineCompleted) points += 30;
  points += Math.min(progress.questionsAsked * 5, 20); // max 20 pts from chat
  points += (progress.quizHighscore / 10) * 50; // max 50 pts from quiz (assuming max score is 10)

  if (points >= 100) {
    level = 4;
    title = "Democracy Champion";
    nextLevelPercent = 100;
  } else if (points >= 70) {
    level = 3;
    title = "Voter Analyst";
    nextLevelPercent = ((points - 70) / 30) * 100;
  } else if (points >= 30) {
    level = 2;
    title = "Engaged Citizen";
    nextLevelPercent = ((points - 30) / 40) * 100;
  } else {
    nextLevelPercent = (points / 30) * 100;
  }

  return {
    progress,
    stats: { level, title, points, nextLevelPercent },
    completeTimeline,
    incrementQuestions,
    updateQuizHighscore,
  };
}
