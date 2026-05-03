import { useMemo, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { RotateCcw, Send, Award, Target } from 'lucide-react'
import PropTypes from 'prop-types'
import QuizCard from '../components/QuizCard'
import { quizData } from '../data/quizData'
import { useProgress } from '../hooks/useProgress'
import { saveQuizResult, logCustomEvent } from '../firebase'

function Quiz({ isEli10Mode }) {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const { updateQuizHighscore } = useProgress()

  const progress = useMemo(() => {
    const answeredCount = Object.keys(selectedAnswers).length
    return Math.round((answeredCount / quizData.length) * 100)
  }, [selectedAnswers])

  const allAnswered = useMemo(
    () => Object.keys(selectedAnswers).length === quizData.length,
    [selectedAnswers],
  )

  const handleSelectOption = (questionId, option) => {
    if (isSubmitted) return
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }))
  }

  const handleSubmit = () => {
    let total = 0
    quizData.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        total += 1
      }
    })

    setScore(total)
    setIsSubmitted(true)
    updateQuizHighscore(total)

    // Google Services: Save quiz result to Firestore and log analytics event
    saveQuizResult(total, quizData.length)
    logCustomEvent('quiz_completed', { score: total, total: quizData.length })

    // Trigger confetti if score is perfect
    if (total === quizData.length) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
      }, 250);
    } else if (total >= quizData.length / 2) {
      // Just a small burst for passing score
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  const resetQuiz = () => {
    setSelectedAnswers({})
    setIsSubmitted(false)
    setScore(0)
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-8 pb-16"
    >
      <header className="glass-panel rounded-3xl p-8 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-300 border border-brand-500/20 mb-4">
          <Target className="w-4 h-4" /> Test Your Knowledge
        </span>
        <h2 className="font-display text-4xl font-extrabold text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
          Election Quiz
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
          {isEli10Mode
            ? 'Answer each question and see how many you got right.'
            : 'Choose the best answer for each question and submit to check your score and increase your Civic Mastery level.'}
        </p>

        <div className="mt-8 bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200/50 dark:border-slate-700/50">
          <div className="mb-2 flex items-center justify-between text-sm font-bold text-slate-700 dark:text-slate-300">
            <span>Completion</span>
            <span>{progress}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-500 to-accent-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>
      </header>

      <div className="space-y-6">
        {quizData.map((question, index) => (
          <QuizCard
            key={question.id}
            question={question}
            questionIndex={index}
            selectedOption={selectedAnswers[question.id]}
            onSelectOption={handleSelectOption}
            isSubmitted={isSubmitted}
          />
        ))}
      </div>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`rounded-3xl p-8 border text-center shadow-lg ${
              score === quizData.length 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-100' 
                : 'bg-brand-500/10 border-brand-500/30 text-brand-900 dark:text-brand-100'
            }`}
          >
            <Award className={`w-16 h-16 mx-auto mb-4 ${score === quizData.length ? 'text-emerald-500' : 'text-brand-500'}`} />
            <p className="font-display text-3xl font-extrabold mb-2">
              Your Score: {score} / {quizData.length}
            </p>
            <p className="text-lg opacity-80">
              {score === quizData.length
                ? 'Flawless Victory! You truly know your civics.'
                : 'Great effort! Review the highlighted correct answers and try again to improve your Mastery Level.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        {!isSubmitted ? (
          <motion.button
            whileHover={allAnswered ? { scale: 1.05 } : {}}
            whileTap={allAnswered ? { scale: 0.95 } : {}}
            type="button"
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-accent-600 px-8 py-4 text-base font-bold text-white transition-all disabled:opacity-50 disabled:grayscale shadow-lg shadow-brand-500/30"
          >
            <Send className="w-5 h-5" /> Submit Quiz
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={resetQuiz}
            className="flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 backdrop-blur px-8 py-4 text-base font-bold text-slate-700 dark:text-slate-200 transition-all hover:bg-white dark:hover:bg-slate-700 shadow-md"
          >
            <RotateCcw className="w-5 h-5" /> Retake Quiz
          </motion.button>
        )}
      </div>
    </motion.section>
  )
}

Quiz.propTypes = {
  isEli10Mode: PropTypes.bool.isRequired,
}

export default Quiz
