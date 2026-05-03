import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('App Component', () => {
  it('renders the Navbar with JanVote logo', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('JanVote')).toBeInTheDocument();
  });

  it('renders the Home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // Home page has text about "Civic Mastery"
    expect(screen.getByText(/Civic Mastery/i)).toBeInTheDocument();
  });
});
