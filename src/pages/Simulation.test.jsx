import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Simulation from './Simulation';

// Mock the child components to simplify the test
vi.mock('../components/MockElection', () => ({
  default: () => <div data-testid="mock-election">Mock Election Component</div>
}));

vi.mock('../components/StatesExplorer', () => ({
  default: () => <div data-testid="states-explorer">States Explorer Component</div>
}));

describe('Simulation Component', () => {
  it('renders both MockElection and StatesExplorer components', () => {
    render(
      <MemoryRouter>
        <Simulation isEli10Mode={false} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Democracy Simulator/i })).toBeInTheDocument();
    
    // Check that both child components are rendered
    expect(screen.getByTestId('mock-election')).toBeInTheDocument();
    expect(screen.getByTestId('states-explorer')).toBeInTheDocument();
  });
});
