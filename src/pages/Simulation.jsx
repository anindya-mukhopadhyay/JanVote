import { motion } from 'framer-motion'
import { Beaker } from 'lucide-react'
import PropTypes from 'prop-types'
import MockElection from '../components/MockElection'
import StatesExplorer from '../components/StatesExplorer'

function Simulation({ isEli10Mode }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto space-y-8 pb-16"
    >
      <header className="text-center px-4 mb-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-300 border border-brand-500/20 mb-4">
          <Beaker className="w-4 h-4" /> Interactive Lab
        </span>
        <h2 className="font-display text-4xl font-extrabold text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
          Democracy Simulator
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          {isEli10Mode
            ? 'Play around to see how voting works and learn fun facts about different states!'
            : 'Explore interactive modules that simulate the voting process and visualize constituency distributions across India.'}
        </p>
      </header>

      <div className="space-y-8">
        <MockElection />
        <StatesExplorer />
      </div>
    </motion.section>
  )
}

Simulation.propTypes = {
  isEli10Mode: PropTypes.bool.isRequired,
}

export default Simulation
