import { motion } from 'framer-motion'
import Timeline from '../components/Timeline'
import { electionSteps } from '../data/electionSteps'
import { useProgress } from '../hooks/useProgress'

function TimelinePage({ isEli10Mode }) {
  const { completeTimeline } = useProgress()

  const handleStepInView = (stepId) => {
    // If the last step is in view, complete the timeline task
    if (stepId === electionSteps[electionSteps.length - 1].id) {
      completeTimeline()
    }
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 pb-20"
    >
      <header className="glass-panel rounded-3xl p-8 text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-300 border border-brand-500/20 mb-4">
          Visual Journey
        </span>
        <h2 className="font-display text-4xl font-extrabold text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
          Election Timeline
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {isEli10Mode
            ? 'These are the main steps India follows to choose leaders.'
            : 'Understand the full election flow in India, from official announcement to final counting. Scroll down to explore each step.'}
        </p>
      </header>

      <Timeline steps={electionSteps} isEli10Mode={isEli10Mode} onStepInView={handleStepInView} />
    </motion.section>
  )
}

export default TimelinePage
