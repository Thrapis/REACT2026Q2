import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SumbittedFormCard from './SumbittedFormCard';
import type { SumbittedForm } from '@/types/SumbittedForm';

describe('SumbittedFormCard Component', () => {
  const mockData: SumbittedForm = {
    image: 'some_image',
    name: 'Mr. Bombastick',
    age: 28,
    email: 'mr.bombastick@barn.com',
    gender: 'Male',
    country: 'United States of America',
    password: 'Qq1!',
    confirmPassword: 'Qq1!',
    termsAndConditions: true,
  };

  it('should render all form entries correctly', () => {
    render(<SumbittedFormCard data={mockData} />);

    expect(screen.getByText(mockData.name)).toBeInTheDocument();
    expect(screen.getByText(mockData.age)).toBeInTheDocument();
    expect(screen.getByText(mockData.email)).toBeInTheDocument();
    expect(screen.getByText(mockData.gender)).toBeInTheDocument();
    expect(screen.getByText(mockData.country)).toBeInTheDocument();
  });

  it('should render the image with the correct src attribute', () => {
    render(<SumbittedFormCard data={mockData} />);

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockData.image);
  });

  it('should display "Accepted" when termsAndConditions is true', () => {
    render(<SumbittedFormCard data={mockData} />);

    expect(screen.getByText('Accepted')).toBeInTheDocument();
    expect(screen.queryByText('Declined')).not.toBeInTheDocument();
  });

  it('should display "Declined" when termsAndConditions is false', () => {
    const declinedData: SumbittedForm = {
      ...mockData,
      termsAndConditions: false,
    };

    render(<SumbittedFormCard data={declinedData} />);

    expect(screen.getByText('Declined')).toBeInTheDocument();
    expect(screen.queryByText('Accepted')).not.toBeInTheDocument();
  });
});
