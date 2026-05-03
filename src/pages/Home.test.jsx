import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Home from './Home';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock('../hooks/useProgress', () => ({
  useProgress: () => ({
    stats: {
      level: 1,
      title: 'Novice',
      nextLevelPercent: 50,
    }
  })
}));

describe('Home Component', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the Home page content correctly', () => {
    render(
      <MemoryRouter>
        <Home isEli10Mode={false} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Election Guide/i })).toBeInTheDocument();
    expect(screen.getByText(/Civic Mastery/i)).toBeInTheDocument();
    expect(screen.getByText(/Level 1/i)).toBeInTheDocument();
  });

  it('navigates to timeline on Start Learning Journey click', () => {
    render(
      <MemoryRouter>
        <Home isEli10Mode={false} />
      </MemoryRouter>
    );

    const startBtn = screen.getByRole('button', { name: /Start Learning Journey/i });
    fireEvent.click(startBtn);

    expect(mockNavigate).toHaveBeenCalledWith('/timeline');
  });

  it('navigates to correct route when feature cards are clicked', () => {
    render(
      <MemoryRouter>
        <Home isEli10Mode={false} />
      </MemoryRouter>
    );

    // Interactive Timeline card
    const timelineCard = screen.getByRole('button', { name: /Navigate to Interactive Timeline/i });
    fireEvent.click(timelineCard);
    expect(mockNavigate).toHaveBeenCalledWith('/timeline');

    // Chat card
    const chatCard = screen.getByRole('button', { name: /Navigate to AI Assistant/i });
    fireEvent.click(chatCard);
    expect(mockNavigate).toHaveBeenCalledWith('/chat');

    // Quiz card
    const quizCard = screen.getByRole('button', { name: /Navigate to Gamified Quiz/i });
    fireEvent.click(quizCard);
    expect(mockNavigate).toHaveBeenCalledWith('/quiz');
  });
});
