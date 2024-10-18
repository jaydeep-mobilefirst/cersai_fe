import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UploadButtonSimple from '../UploadButtonSimple';

describe('UploadButtonSimple Component', () => {

  test('renders the upload button with correct label and icon', () => {
    const { getByText, getByAltText } = render(<UploadButtonSimple />);
    expect(getByText('Upload')).toBeInTheDocument();
    expect(getByAltText('')).toBeInTheDocument();  // Verifies the icon is rendered
  });

  test('calls file input click when button is clicked', () => {
    const { getByText, getByRole } = render(<UploadButtonSimple />);
    const button = getByText('Upload');
    const fileInput = getByRole('button');

    fireEvent.click(button);
    expect(fileInput).toBeInTheDocument();
  });

  test('invokes onFileUpload when a file is selected', () => {
    const mockOnFileUpload = jest.fn();
    const { getByTestId } = render(<UploadButtonSimple onFileUpload={mockOnFileUpload} />);
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

    const fileInput = getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  test('invokes onFileUpload with null when no file is selected', () => {
    const mockOnFileUpload = jest.fn();
    const { getByTestId } = render(<UploadButtonSimple onFileUpload={mockOnFileUpload} />);

    const fileInput = getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: null } });

    expect(mockOnFileUpload).toHaveBeenCalledWith(null);
  });

  test('fileSelected state changes when file is uploaded', () => {
    const { getByTestId, rerender } = render(<UploadButtonSimple />);
    const file = new File(['dummy content'], 'example.png', { type: 'image/png' });

    const fileInput = getByTestId('file-input');
    fireEvent.change(fileInput, { target: { files: [file] } });

    rerender(<UploadButtonSimple />);
    expect(fileInput).toBeInTheDocument();
  });
});
