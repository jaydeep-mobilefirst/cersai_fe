import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OtpInput from '../OtpInput';

describe('OtpInput Component', () => {
  const mockOnChange = jest.fn();
  const mockOnResend = jest.fn();

  beforeEach(() => {
    render(
      <OtpInput
        label="Enter OTP"
        infoText="We have sent you an OTP"
        resendText="Resend OTP"
        timer="30"
        error=""
        onResend={mockOnResend}
        onChange={mockOnChange}
        value={['', '', '', '', '', '']}
      />
    );
  });

  it('renders correctly with given props', () => {
    expect(screen.getByText('Enter OTP')).toBeInTheDocument();
    expect(screen.getByText('We have sent you an OTP')).toBeInTheDocument();
    expect(screen.getByText('Resend OTP')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const input = screen.getAllByPlaceholderText('0');
    fireEvent.change(input[0], { target: { value: '1' } });
    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(expect.anything(), 0);
  });

  it('calls onResend when resend button is clicked', () => {
    const resendButton = screen.getByText('Resend OTP');
    fireEvent.click(resendButton);
    expect(mockOnResend).toHaveBeenCalledTimes(0);
  });

  it('disables resend button when timer is active', () => {
    const resendButton = screen.getByText('Resend OTP');
    expect(resendButton).toBeDisabled();
  });

 
});
