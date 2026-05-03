import { motion } from 'framer-motion'
import ChatBox from '../components/ChatBox'

function Chat({ isEli10Mode }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-6 pb-12"
    >
      <header className="text-center px-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-300 border border-brand-500/20 mb-4">
          Interactive AI
        </span>
        <h2 className="font-display text-4xl font-extrabold text-slate-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
          Chat Assistant
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {isEli10Mode
            ? 'Ask small questions and get easy explanations from your friendly AI guide.'
            : 'Use this AI assistant to learn key election concepts quickly and accurately.'}
        </p>
      </header>

      <ChatBox isEli10Mode={isEli10Mode} />
    </motion.section>
  )
}

export default Chat

