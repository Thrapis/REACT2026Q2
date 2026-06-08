import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UncontrolledForm from './UncontrolledForm';

const mockAddForm = vi.fn();
vi.mock('@/stores/FormStore', () => ({
  useFormStore: () => ({
    addForm: mockAddForm,
  }),
}));

vi.mock('@/utils/ImageProcessing', () => ({
  convertToBase64: vi
    .fn()
    .mockResolvedValue('data:image/png;base64,mockBase64String'),
}));

vi.mock('@/constants/Countries', () => ({
  COUNTRIES: ['USA', 'Canada', 'UK'],
}));

describe('UncontrolledForm Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all form fields empty by default', () => {
    render(<UncontrolledForm onClose={mockOnClose} />);

    expect(screen.getByLabelText(/Name:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Email:/i)).toHaveValue('');
    expect(screen.getByLabelText(/^Age:$/)).toHaveValue(null);
    expect(screen.getByLabelText(/Gender:/i)).toHaveValue('Unknown');
    expect(screen.getByLabelText(/^Password:$/)).toHaveValue('');
    expect(screen.getByLabelText(/Confirm Password:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Image:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Country:/i)).toHaveValue('');
    expect(screen.getByLabelText(/Terms and Conditions/i)).not.toBeChecked();
  });

  it('should call addForm and onClose on a successful submission', async () => {
    const user = userEvent.setup();
    render(<UncontrolledForm onClose={mockOnClose} />);

    await user.type(screen.getByLabelText(/Name:/i), 'Mr. Bombastick');
    await user.type(screen.getByLabelText(/Email:/i), 'mr.bombastick@barn.com');
    await user.type(screen.getByLabelText(/^Age:$/), '28');
    await user.selectOptions(screen.getByLabelText(/Gender:/i), 'Male');
    await user.type(screen.getByLabelText(/^Password:$/), 'Qq1!');
    await user.type(screen.getByLabelText(/Confirm Password:/i), 'Qq1!');
    await user.type(screen.getByLabelText(/Country:/i), 'USA');
    await user.click(screen.getByLabelText(/Terms and Conditions/i));

    const file = new File(['hello'], 'profile.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/Image:/i);
    await user.upload(fileInput, file);

    await user.click(screen.getByRole('button', { name: /Submit/i }));

    expect(mockAddForm).toHaveBeenCalledTimes(1);
    expect(mockOnClose).toHaveBeenCalledTimes(1);

    expect(mockAddForm).toHaveBeenCalledWith({
      name: 'Mr. Bombastick',
      email: 'mr.bombastick@barn.com',
      age: 28,
      gender: 'Male',
      password: 'Qq1!',
      confirmPassword: 'Qq1!',
      image: 'data:image/png;base64,mockBase64String',
      country: 'USA',
      termsAndConditions: true,
    });
  });

  it('should render validation errors when submitting an empty form', async () => {
    const user = userEvent.setup();
    render(<UncontrolledForm onClose={mockOnClose} />);

    await user.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      const errorMessages = document.querySelectorAll('.u-form-error-message');
      expect(errorMessages.length).toBeGreaterThan(0);
    });

    expect(mockAddForm).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should render options inside the country datalist', () => {
    render(<UncontrolledForm onClose={mockOnClose} />);

    const datalist = document.getElementById('country-list');
    expect(datalist).toBeInTheDocument();
    expect(datalist?.children).toHaveLength(3);
    expect(datalist?.children[0]).toHaveAttribute('value', 'USA');
  });
});
