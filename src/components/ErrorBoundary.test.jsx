import { render, screen } from '@testing-library/react'
import ErrorBoundary from '../components/ErrorBoundary'

// A component that throws during render
function ThrowingComponent() {
  throw new Error('Test error')
}

function GoodComponent() {
  return <div>All is well</div>
}

describe('ErrorBoundary', () => {
  // Suppress console.error during these tests since React logs caught errors
  const originalError = console.error
  beforeAll(() => {
    console.error = vi.fn()
  })
  afterAll(() => {
    console.error = originalError
  })

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary>
        <GoodComponent />
      </ErrorBoundary>
    )
    expect(screen.getByText('All is well')).toBeInTheDocument()
  })

  it('renders fallback UI when a child throws', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    )
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Refresh Page/i })).toBeInTheDocument()
  })
})
