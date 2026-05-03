import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Chat from './pages/Chat'
import TimelinePage from './pages/TimelinePage'
import Quiz from './pages/Quiz'
import Simulation from './pages/Simulation'
import Admin from './pages/Admin'
import { Heart, Code, Briefcase, Shield } from 'lucide-react'
import { logPageView, logCustomEvent } from './firebase'

function App() {
  const [isEli10Mode, setIsEli10Mode] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem('election-guide-dark-mode') === 'true',
  )
  const location = useLocation()

  // Google Analytics Page View Tracking
  useEffect(() => {
    logPageView(location.pathname)
  }, [location])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem('election-guide-dark-mode', String(isDarkMode))
  }, [isDarkMode])

  return (
    <ErrorBoundary>
      {/* Skip to Main Content Link for Accessibility */}
      <a 
        href="#main-content" 
        className="absolute top-0 left-0 z-[100] -translate-y-full bg-brand-600 text-white px-4 py-2 font-bold transition-transform focus:translate-y-0 focus:outline-none focus:ring-4 focus:ring-white"
      >
        Skip to main content
      </a>

      <div className="bg-blobs"></div>
      <div className="relative min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300 flex flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-col px-4 pt-4 sm:px-6 lg:px-8 flex-1">
          <Navbar
            isDarkMode={isDarkMode}
            isEli10Mode={isEli10Mode}
            onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
            onToggleEli10={() => setIsEli10Mode((prev) => !prev)}
          />

          <main id="main-content" className="mt-6 flex-1 z-10 w-full" role="main" aria-label="Main Content">
            <Routes>
              <Route path="/" element={<Home isEli10Mode={isEli10Mode} />} />
              <Route path="/chat" element={<Chat isEli10Mode={isEli10Mode} />} />
              <Route
                path="/timeline"
                element={<TimelinePage isEli10Mode={isEli10Mode} />}
              />
              <Route path="/quiz" element={<Quiz isEli10Mode={isEli10Mode} />} />
              <Route path="/simulation" element={<Simulation isEli10Mode={isEli10Mode} />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        {/* Global Footer */}
        <footer className="mt-auto py-8 z-10 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm" role="contentinfo" aria-label="Global Footer">
          <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1.5 justify-center">
              Built By <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" /> Anindya Mukhopadhyay
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/anindya-mukhopadhyay" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <Code className="w-4 h-4" /> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/anindya-mukhopadhy/" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <Briefcase className="w-4 h-4" /> LinkedIn
              </a>
              <a 
                href="/admin" 
                className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 transition-colors bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <Shield className="w-4 h-4" /> Admin
              </a>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  )
}

export default App

