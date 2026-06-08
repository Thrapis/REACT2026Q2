import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ReactHookForm from '@/components/ReactHookForm/ReactHooKForm';

const mockAddForm = vi.fn();
vi.mock('@/stores/FormStore', () => ({
  useFormStore: () => ({
    addForm: mockAddForm,
    countries: ['USA', 'Canada', 'UK'],
  }),
}));

vi.mock('@/utils/ImageProcessing', () => ({
  convertToBase64: vi
    .fn()
    .mockResolvedValue('data:image/png;base64,mockBase64String'),
}));

describe('ReactHookForm Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all form fields with default values', () => {
    render(<ReactHookForm onClose={mockOnClose} />);

    expect(screen.getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Age:')).toHaveValue(18);
    expect(screen.getByLabelText(/Gender:/i)).toHaveValue('Unknown');
    expect(screen.getByLabelText('Password:')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password:')).toBeInTheDocument();
    expect(screen.getByLabelText(/Image:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Country:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Terms and Conditions/i)).not.toBeChecked();
    expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
  });

  it('should call addForm and onClose on successful form submission', async () => {
    const user = userEvent.setup();
    render(<ReactHookForm onClose={mockOnClose} />);

    await user.type(screen.getByLabelText(/Name:/i), 'Mr. Bombastick');
    await user.type(screen.getByLabelText(/Email:/i), 'mr.bombastick@barn.com');
    await user.clear(screen.getByLabelText('Age:'));
    await user.type(screen.getByLabelText('Age:'), '28');
    await user.selectOptions(screen.getByLabelText(/Gender:/i), 'Male');
    await user.type(screen.getByLabelText('Password:'), 'Qq1!');
    await user.type(screen.getByLabelText('Confirm Password:'), 'Qq1!');
    await user.type(screen.getByLabelText(/Country:/i), 'USA');
    await user.click(screen.getByLabelText(/Terms and Conditions/i));

    const file = new File(['hello'], 'profile.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/Image:/i);
    await user.upload(fileInput, file);

    await user.click(screen.getByRole('button', { name: /Submit/i }));

    await waitFor(() => {
      expect(mockAddForm).toHaveBeenCalledTimes(1);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    expect(mockAddForm).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Mr. Bombastick',
        age: 28,
        email: 'mr.bombastick@barn.com',
        gender: 'Male',
        image: 'data:image/png;base64,mockBase64String',
        country: 'USA',
        password: 'Qq1!',
        confirmPassword: 'Qq1!',
        termsAndConditions: true,
      })
    );
  });

  it('should handle image file selection and convert it to Base64 string', async () => {
    const user = userEvent.setup();
    render(<ReactHookForm onClose={mockOnClose} />);

    const file = new File(['content'], 'avatar.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByLabelText(/Image:/i);

    await user.upload(fileInput, file);

    expect((fileInput as HTMLInputElement).files?.[0]).toBe(file);
    expect((fileInput as HTMLInputElement).files).toHaveLength(1);
  });

  it('should render options inside the country datalist', () => {
    render(<ReactHookForm onClose={mockOnClose} />);

    const datalist = document.getElementById('country-list');
    expect(datalist).toBeInTheDocument();
    expect(datalist?.children).toHaveLength(3);
    expect(datalist?.children[0]).toHaveAttribute('value', 'USA');
  });
});
