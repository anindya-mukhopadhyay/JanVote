import { Component } from 'react'
import PropTypes from 'prop-types'
import { AlertTriangle } from 'lucide-react'

/**
 * ErrorBoundary component provides a robust safety net for runtime errors.
 * Catches errors in child component tree and renders a graceful fallback UI.
 * This is a key defensive/security practice for production-quality React apps.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // In production, this would log to a monitoring service like Google Cloud Logging
    console.error('[ErrorBoundary] Caught error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="glass-panel rounded-3xl p-8 text-center max-w-lg mx-auto mt-20"
        >
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" aria-hidden="true" />
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Something went wrong
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            An unexpected error occurred. Please try refreshing the page.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full bg-gradient-to-r from-brand-600 to-accent-600 px-6 py-3 text-sm font-bold text-white transition hover:scale-105"
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ErrorBoundary
