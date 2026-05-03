import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Chat from './pages/Chat'
import TimelinePage from './pages/TimelinePage'
import Quiz from './pages/Quiz'

function App() {
  const [isEli10Mode, setIsEli10Mode] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem('election-guide-dark-mode') === 'true',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    localStorage.setItem('election-guide-dark-mode', String(isDarkMode))
  }, [isDarkMode])

  return (
    <>
      <div className="bg-blobs"></div>
      <div className="relative min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pb-8 pt-4 sm:px-6 lg:px-8">
          <Navbar
            isDarkMode={isDarkMode}
            isEli10Mode={isEli10Mode}
            onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
            onToggleEli10={() => setIsEli10Mode((prev) => !prev)}
          />

          <main className="mt-6 flex-1 z-10">
            <Routes>
              <Route path="/" element={<Home isEli10Mode={isEli10Mode} />} />
              <Route path="/chat" element={<Chat isEli10Mode={isEli10Mode} />} />
              <Route
                path="/timeline"
                element={<TimelinePage isEli10Mode={isEli10Mode} />}
              />
              <Route path="/quiz" element={<Quiz isEli10Mode={isEli10Mode} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}

export default App
