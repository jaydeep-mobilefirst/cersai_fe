// TextArea.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import TextArea from '../TextArea'; // Adjust the import path as necessary

describe('TextArea Component', () => {
  test('renders textarea with default background color', () => {
    render(<TextArea />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass('defaultBackgroundColorClass'); // Check default background color class
  });

  test('renders textarea with custom background color', () => {
    render(<TextArea backgroundColor="custom-bg-color" />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-bg-color'); // Check if custom background color is applied
  });

  test('renders textarea with passed props', () => {
    const { container } = render(<TextArea placeholder="Enter text here" />);
    const textarea = screen.getByPlaceholderText(/enter text here/i);
    expect(textarea).toBeInTheDocument();
    
    // Check for other props. Example: Test for a specific class
    expect(textarea).toHaveClass('form-textarea');
  });

 

  test('renders the SVG icon', () => {
    render(<TextArea />);
    const svgIcon = document.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });
});
