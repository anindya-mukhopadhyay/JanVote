import { render, screen } from '@testing-library/react';
import Timeline from './Timeline';

// Mock StepCard to isolate Timeline testing
vi.mock('./StepCard', () => ({
  default: ({ step, stepNumber }) => (
    <div data-testid={`step-card-${step.id}`}>
      {stepNumber}: {step.title}
    </div>
  )
}));

describe('Timeline Component', () => {
  const mockSteps = [
    { id: 1, title: 'Step One', description: 'Desc 1', eli10: 'ELI1 1' },
    { id: 2, title: 'Step Two', description: 'Desc 2', eli10: 'ELI1 2' },
  ];

  it('renders all steps', () => {
    render(
      <Timeline steps={mockSteps} isEli10Mode={false} />
    );

    expect(screen.getByTestId('step-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('step-card-2')).toBeInTheDocument();
    expect(screen.getByText('1: Step One')).toBeInTheDocument();
    expect(screen.getByText('2: Step Two')).toBeInTheDocument();
  });
});
