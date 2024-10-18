import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  test('renders the Button component correctly', () => {
    render(<Button type="button" label="Click Me" />);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
  });

  test('renders the correct label', () => {
    render(<Button type="submit" label="Submit" />);
    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toBeInTheDocument();
  });

  test('has the correct button type', () => {
    render(<Button type="reset" label="Reset" />);
    const buttonElement = screen.getByText('Reset');
    expect(buttonElement).toHaveAttribute('type', 'reset');
  });

  test('applies the correct styles', () => {
    render(<Button type="button" label="Styled Button" />);
    const buttonElement = screen.getByText('Styled Button');
    expect(buttonElement).toHaveClass('bg-[#385723]');
    expect(buttonElement).toHaveClass('rounded-xl');
    expect(buttonElement).toHaveClass('p-3');
    expect(buttonElement).toHaveClass('text-white');
  });
});
