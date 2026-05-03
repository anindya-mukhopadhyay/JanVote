import { motion } from 'framer-motion'
import { Calendar, FileSignature, Mic, Vote, Calculator } from 'lucide-react'

const icons = {
  1: Calendar,
  2: FileSignature,
  3: Mic,
  4: Vote,
  5: Calculator
}

function StepCard({ step, stepNumber, isEli10Mode, onInView }) {
  const Icon = icons[step.id] || Calendar;

  return (
    <motion.article 
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      onViewportEnter={() => {
        if (onInView) onInView(step.id);
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="glass-panel relative rounded-3xl p-6 md:p-8 hover:shadow-glow transition-all duration-300 group"
    >
      <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="w-24 h-24 text-brand-500" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 flex items-center justify-center shadow-lg text-white">
            <Icon className="w-6 h-6" />
          </div>
          <span className="inline-block rounded-full bg-brand-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-300 border border-brand-500/20">
            Step {stepNumber}
          </span>
        </div>
        
        <h3 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white mb-3">
          {step.title}
        </h3>
        
        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {isEli10Mode ? step.eli10 : step.description}
        </p>
      </div>
    </motion.article>
  )
}

export default StepCard
