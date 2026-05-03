import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, MessageCircle, HelpCircle, Trophy, ArrowRight } from 'lucide-react'
import { useProgress } from '../hooks/useProgress'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

function Home({ isEli10Mode }) {
  const navigate = useNavigate()
  const { stats } = useProgress()

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass-panel rounded-3xl p-8 sm:p-12 relative overflow-hidden"
      aria-label="Welcome Section"
    >
      {/* Decorative background glow inside the card */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-start">
        <div className="flex-1">
          <motion.p variants={itemVariants} className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 dark:bg-brand-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-300 border border-brand-500/20">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" aria-hidden="true"></span>
            Learn Civics Visually
          </motion.p>

          <motion.h2 variants={itemVariants} className="mt-6 font-display text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
            Election Guide
          </motion.h2>

          <motion.p variants={itemVariants} className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            {isEli10Mode
              ? 'Elections are how people choose leaders. This app breaks the full process into simple steps, chat answers, and a fun quiz so anyone can understand it.'
              : 'Election Guide is an interactive learning app that explains India’s election process in a simple, visual, and engaging way. Explore the timeline, ask the assistant, and test your understanding with the quiz.'}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10">
            <button
              type="button"
              onClick={() => navigate('/timeline')}
              className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-brand-600 to-accent-600 px-8 py-4 text-base font-bold text-white transition-all hover:scale-105 hover:shadow-glow focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/50"
            >
              Start Learning Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </motion.div>
        </div>

        {/* Progress Card */}
        <motion.article variants={itemVariants} className="w-full md:w-80 glass-panel rounded-2xl p-6 border-brand-500/20" aria-label="Civic Mastery Progress">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg" aria-hidden="true">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Civic Mastery</p>
              <p className="font-display font-bold text-xl text-slate-900 dark:text-white">Level {stats.level}</p>
            </div>
          </div>
          
          <p className="font-medium text-brand-600 dark:text-brand-400 mb-2">{stats.title}</p>
          
          <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden" role="progressbar" aria-valuenow={Math.round(stats.nextLevelPercent)} aria-valuemin="0" aria-valuemax="100">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${stats.nextLevelPercent}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
              className="h-full bg-gradient-to-r from-brand-500 to-accent-500"
            ></motion.div>
          </div>
          <p className="text-xs text-right mt-2 text-slate-500 dark:text-slate-400">{Math.round(stats.nextLevelPercent)}% to next level</p>
        </motion.article>
      </div>

      <motion.nav variants={itemVariants} className="mt-16 grid gap-6 sm:grid-cols-3 relative z-10" aria-label="Quick Links">
        {[
          { icon: BookOpen, title: "Interactive Timeline", desc: "See each election stage from announcement to counting.", color: "text-blue-500", bg: "bg-blue-500/10" },
          { icon: MessageCircle, title: "AI Assistant", desc: "Ask quick questions and get beginner-friendly answers.", color: "text-purple-500", bg: "bg-purple-500/10" },
          { icon: HelpCircle, title: "Gamified Quiz", desc: "Check your understanding and get instant scoring.", color: "text-emerald-500", bg: "bg-emerald-500/10" }
        ].map((feature, idx) => (
          <motion.div 
            key={idx}
            role="button"
            tabIndex={0}
            aria-label={`Navigate to ${feature.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (idx === 0) navigate('/timeline')
                if (idx === 1) navigate('/chat')
                if (idx === 2) navigate('/quiz')
              }
            }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass-button rounded-2xl p-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            onClick={() => {
              if (idx === 0) navigate('/timeline')
              if (idx === 1) navigate('/chat')
              if (idx === 2) navigate('/quiz')
            }}
          >
            <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`} aria-hidden="true">
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">{feature.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </motion.nav>
    </motion.section>
  )
}

export default Home
