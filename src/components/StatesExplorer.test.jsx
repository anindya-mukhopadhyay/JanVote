import { render, screen, fireEvent } from '@testing-library/react';
import StatesExplorer from './StatesExplorer';

// Mock useSoundEffects hook
vi.mock('../hooks/useSoundEffects', () => ({
  useSoundEffects: () => ({
    playPop: vi.fn(),
    playSuccess: vi.fn(),
    playFailure: vi.fn(),
  })
}));

describe('StatesExplorer Component', () => {
  it('renders initial state grid', () => {
    render(<StatesExplorer />);
    
    expect(screen.getByText('Constituency Explorer')).toBeInTheDocument();
    // Check for some state IDs
    expect(screen.getByText('UP')).toBeInTheDocument();
    expect(screen.getByText('MH')).toBeInTheDocument();
  });

  it('shows tooltip on hover', async () => {
    render(<StatesExplorer />);
    
    const upState = screen.getByText('UP');
    fireEvent.mouseEnter(upState);

    // Tooltip should show name and seat count
    // Use getAllByText because "Uttar Pradesh" appears in both the grid and the tooltip
    const names = await screen.findAllByText(/Uttar Pradesh/i);
    expect(names.length).toBeGreaterThan(1);
    expect(screen.getByText(/80/)).toBeInTheDocument();
    expect(screen.getByText(/Seats/)).toBeInTheDocument();
  });
});
