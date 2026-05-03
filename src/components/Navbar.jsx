import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Moon, Sun, Baby, MapPin } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/simulation', label: 'Simulation' },
  { to: '/chat', label: 'Chat Assistant' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/quiz', label: 'Quiz' },
]

function Navbar({ isDarkMode, isEli10Mode, onToggleDarkMode, onToggleEli10 }) {
  return (
    <header className="glass-panel rounded-2xl p-4 sticky top-4 z-50 transition-all duration-300">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-accent-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
              <span className="text-white font-display font-bold text-lg">J</span>
            </div>
            <h1 className="font-display text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
              JanVote
            </h1>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-300 border border-brand-500/20">
            <MapPin className="w-3 h-3" /> India Focus
          </span>
        </div>

        <nav className="flex flex-wrap items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 shadow-lg shadow-brand-500/20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onToggleEli10}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all shadow-sm ${
              isEli10Mode
                ? 'border-accent-500/30 bg-accent-500/10 text-accent-600 dark:text-accent-300'
                : 'border-slate-200 bg-white/50 text-slate-600 hover:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <Baby className="w-4 h-4" />
            {isEli10Mode ? 'ELI10 Mode' : 'Standard'}
          </button>
          
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white/50 text-slate-600 transition-all hover:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800 shadow-sm"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar

