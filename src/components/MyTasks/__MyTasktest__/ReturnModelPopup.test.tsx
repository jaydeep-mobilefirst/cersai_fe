import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReturnModelPopup from '../ReturnModelPopup';

describe('ReturnModelPopup Component', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    render(<ReturnModelPopup onClose={mockOnClose} onSave={mockOnSave} />);
  });

  it('should render the modal title', () => {
    const modalTitle = screen.getByText(/Are you sure you want to return this application\?/i);
    expect(modalTitle).toBeInTheDocument();
  });

  it('should display the "Return Reasons" label', () => {
    const returnReasonsLabel = screen.getByLabelText(/Return Reasons/i);
    expect(returnReasonsLabel).toBeInTheDocument();
  });

  it('should display the "Reasons" label for the textarea', () => {
    const reasonsLabel = screen.getByLabelText(/Reasons/i);
    expect(reasonsLabel).toBeInTheDocument();
  });

  it('should have a text area for typing the reasons', () => {
    const textArea = screen.getByPlaceholderText('Type your reason here');
    expect(textArea).toBeInTheDocument();
  });

  it('should display the word count below the textarea', () => {
    const wordCount = screen.getByText('0/500');
    expect(wordCount).toBeInTheDocument();
  });

  it('should update the word count when text is entered in the textarea', () => {
    const textArea = screen.getByPlaceholderText('Type your reason here');
    fireEvent.change(textArea, { target: { value: 'Test reason' } });
    expect(screen.getByText('2/500')).toBeInTheDocument();
  });

  it('should close the modal when the close button is clicked', () => {
    const closeButton = screen.getByAltText('icon'); // The close button with the "add" icon
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should display the "Submit & return" button', () => {
    const submitButton = screen.getByRole('button', { name: 'Submit & return' });
    expect(submitButton).toBeInTheDocument();
  });

  it('should call the onClose and onSave functions when the form is submitted', () => {
    const submitButton = screen.getByRole('button', { name: 'Submit & return' });
    fireEvent.click(submitButton);
    expect(mockOnClose).toHaveBeenCalled();
    expect(mockOnSave).toHaveBeenCalled();
  });
});
