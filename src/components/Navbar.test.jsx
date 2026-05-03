import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  const mockOnToggleDarkMode = vi.fn();
  const mockOnToggleEli10 = vi.fn();

  const defaultProps = {
    isDarkMode: false,
    isEli10Mode: false,
    onToggleDarkMode: mockOnToggleDarkMode,
    onToggleEli10: mockOnToggleEli10,
  };

  it('renders brand logo and focus area', () => {
    render(
      <MemoryRouter>
        <Navbar {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByText('JanVote')).toBeInTheDocument();
    expect(screen.getByText('India Focus')).toBeInTheDocument();
  });

  it('renders all navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar {...defaultProps} />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Simulation')).toBeInTheDocument();
    expect(screen.getByText('Chat Assistant')).toBeInTheDocument();
    expect(screen.getByText('Timeline')).toBeInTheDocument();
    expect(screen.getByText('Quiz')).toBeInTheDocument();
  });

  it('calls onToggleEli10 when ELI10 button is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar {...defaultProps} />
      </MemoryRouter>
    );

    const eli10Btn = screen.getByLabelText('Enable ELI10 Mode');
    fireEvent.click(eli10Btn);
    expect(mockOnToggleEli10).toHaveBeenCalled();
  });

  it('calls onToggleDarkMode when theme toggle is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar {...defaultProps} />
      </MemoryRouter>
    );

    const themeBtn = screen.getByLabelText('Switch to Dark Mode');
    fireEvent.click(themeBtn);
    expect(mockOnToggleDarkMode).toHaveBeenCalled();
  });

  it('shows ELI10 Mode active state', () => {
    render(
      <MemoryRouter>
        <Navbar {...defaultProps} isEli10Mode={true} />
      </MemoryRouter>
    );

    expect(screen.getByText('ELI10 Mode')).toBeInTheDocument();
    expect(screen.getByLabelText('Disable ELI10 Mode')).toBeInTheDocument();
  });
});
