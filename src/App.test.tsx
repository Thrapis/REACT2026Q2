import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import type { SumbittedForm } from '@/types/SumbittedForm';

const mockUseFormStore = vi.fn();
vi.mock('./stores/FormStore', () => ({
  useFormStore: () => mockUseFormStore(),
}));

vi.mock('@/components/Modal/Modal', () => ({
  default: ({
    children,
    onClose,
  }: {
    children: React.ReactNode;
    onClose: () => void;
  }) => (
    <div data-testid="mock-modal">
      <button data-testid="mock-modal-close" onClick={onClose}>
        X
      </button>
      {children}
    </div>
  ),
}));

vi.mock('@/components/UncontrolledForm/UncontrolledForm', () => ({
  default: () => <div data-testid="uncontrolled-form">Uncontrolled Form</div>,
}));

vi.mock('./components/ReactHookForm/ReactHooKForm', () => ({
  default: () => <div data-testid="rh-form">React Hook Form</div>,
}));

vi.mock('./components/SumbittedFormCard/SumbittedFormCard', () => ({
  default: ({ data }: { data: SumbittedForm }) => (
    <div data-testid="form-card">{data.name}</div>
  ),
}));

describe('App Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render headers, action buttons, and an empty list by default', () => {
    mockUseFormStore.mockReturnValue({ forms: [] });
    render(<App />);

    expect(
      screen.getByRole('button', { name: /Open Uncontrolled Modal/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Open React Hook Form Modal/i })
    ).toBeInTheDocument();
    expect(screen.queryByTestId('form-card')).not.toBeInTheDocument();
  });

  it('should render a card for each form present in the store data array', () => {
    const mockForms: Partial<SumbittedForm>[] = [
      {
        name: 'Mr. Bombastick',
        email: 'mr.bombastick@barn.com',
        age: 28,
        gender: 'Male',
        password: 'Qq1!',
        confirmPassword: 'Qq1!',
        image: 'data:image/png;base64,mockBase64',
        country: 'United States of America',
        termsAndConditions: true,
      },

      {
        name: 'Roger',
        email: 'roger@barn.com',
        age: 12,
        gender: 'Unknown',
        password: 'Qq1!',
        confirmPassword: 'Qq1!',
        image: 'data:image/png;base64,mockBase64',
        country: 'United States of America',
        termsAndConditions: true,
      },
    ];
    mockUseFormStore.mockReturnValue({ forms: mockForms });

    render(<App />);

    const cards = screen.getAllByTestId('form-card');
    expect(cards).toHaveLength(2);
    expect(screen.getByText('Mr. Bombastick')).toBeInTheDocument();
    expect(screen.getByText('Roger')).toBeInTheDocument();
  });

  it('should open and close the Uncontrolled Form modal', async () => {
    const user = userEvent.setup();
    mockUseFormStore.mockReturnValue({ forms: [] });
    render(<App />);

    expect(screen.queryByTestId('uncontrolled-form')).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: /Open Uncontrolled Modal/i })
    );
    expect(screen.getByTestId('uncontrolled-form')).toBeInTheDocument();

    await user.click(screen.getByTestId('mock-modal-close'));
    expect(screen.queryByTestId('uncontrolled-form')).not.toBeInTheDocument();
  });

  it('should open and close the React Hook Form modal', async () => {
    const user = userEvent.setup();
    mockUseFormStore.mockReturnValue({ forms: [] });
    render(<App />);

    expect(screen.queryByTestId('rh-form')).not.toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: /Open React Hook Form Modal/i })
    );
    expect(screen.getByTestId('rh-form')).toBeInTheDocument();

    await user.click(screen.getByTestId('mock-modal-close'));
    expect(screen.queryByTestId('rh-form')).not.toBeInTheDocument();
  });
});
