import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChatBox from '../components/ChatBox';

vi.mock('../hooks/useProgress', () => ({
  useProgress: () => ({
    incrementQuestions: vi.fn()
  })
}));

describe('ChatBox Component', () => {
  it('renders initial bot greeting', () => {
    render(<ChatBox isEli10Mode={false} />);
    expect(screen.getByText(/Hello. I am your AI election guide/i)).toBeInTheDocument();
  });

  it('allows user to send a message via preset chip', async () => {
    render(<ChatBox isEli10Mode={false} />);
    
    // Click preset chip
    const presetBtn = screen.getByRole('button', { name: /How elections work/i });
    fireEvent.click(presetBtn);

    // Verify user message appears in chat
    expect(screen.getAllByText('How elections work').length).toBeGreaterThan(1);
    
    // We don't need to wait for the streaming text, just testing the user flow is enough for coverage
  });

  it('does not send empty messages', () => {
    render(<ChatBox isEli10Mode={false} />);
    
    const sendBtn = screen.getByRole('button', { name: /Send/i });
    expect(sendBtn).toBeDisabled();
  });
});
