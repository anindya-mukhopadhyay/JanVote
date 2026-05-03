import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Moon, Sun, Baby, MapPin } from 'lucide-react'
import PropTypes from 'prop-types'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/simulation', label: 'Simulation' },
  { to: '/chat', label: 'Chat Assistant' },
  { to: '/timeline', label: 'Timeline' },
  { to: '/quiz', label: 'Quiz' },
]

function Navbar({ isDarkMode, isEli10Mode, onToggleDarkMode, onToggleEli10 }) {
  return (
    <header className="glass-panel rounded-2xl p-4 sticky top-4 z-50 transition-all duration-300" role="banner">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" aria-label="JanVote Logo">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-500 to-accent-500 flex items-center justify-center shadow-lg shadow-brand-500/20" aria-hidden="true">
              <span className="text-white font-display font-bold text-lg">J</span>
            </div>
            <h1 className="font-display text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
              JanVote
            </h1>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-brand-500/10 px-3 py-1 text-xs font-semibold text-brand-600 dark:text-brand-300 border border-brand-500/20" aria-label="Focus Area: India">
            <MapPin className="w-3 h-3" aria-hidden="true" /> India Focus
          </span>
        </div>

        <nav className="flex flex-wrap items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1 rounded-full border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md" role="navigation" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              aria-label={`Navigate to ${item.label}`}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${isActive
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
                      aria-hidden="true"
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
            aria-label={isEli10Mode ? 'Disable ELI10 Mode' : 'Enable ELI10 Mode'}
            aria-pressed={isEli10Mode}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${isEli10Mode
                ? 'border-accent-500/30 bg-accent-500/10 text-accent-600 dark:text-accent-300'
                : 'border-slate-200 bg-white/50 text-slate-600 hover:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
          >
            <Baby className="w-4 h-4" aria-hidden="true" />
            {isEli10Mode ? 'ELI10 Mode' : 'Standard'}
          </button>

          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-pressed={isDarkMode}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 bg-white/50 text-slate-600 transition-all hover:bg-white dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:bg-slate-800 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          >
            {isDarkMode ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  )
}

Navbar.propTypes = {
  isDarkMode: PropTypes.bool.isRequired,
  isEli10Mode: PropTypes.bool.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
  onToggleEli10: PropTypes.func.isRequired,
}

export default Navbar
