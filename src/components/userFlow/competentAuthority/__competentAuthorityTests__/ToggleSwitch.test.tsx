import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToggleSwitch from '../ToggleSwitch';

describe('ToggleSwitch', () => {
  it('renders without crashing', () => {
    render(<ToggleSwitch enabled={false} />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders in enabled state correctly', () => {
    render(<ToggleSwitch enabled={true} />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
    expect(switchElement).toHaveClass('bg-[#E7F0FF]');
  });

  it('renders in disabled state correctly', () => {
    render(<ToggleSwitch enabled={false} />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
    expect(switchElement).toHaveClass('bg-gray-200');
  });

  it('changes state when clicked', () => {
    render(<ToggleSwitch enabled={false} />);
    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);
    expect(switchElement).toHaveClass('bg-[#E7F0FF]');
  });

  it('applies correct styles for basic variant', () => {
    render(<ToggleSwitch enabled={true} variant="basic" />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('bg-[#E7F0FF]');
    const circleElement = switchElement.firstChild as HTMLElement;
    expect(circleElement).toHaveClass('bg-[#1C468E]');
  });

  it('applies correct styles for table variant', () => {
    render(<ToggleSwitch enabled={true} variant="table" />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('bg-[#D4FDC6]');
    const circleElement = switchElement.firstChild as HTMLElement;
    expect(circleElement).toHaveClass('bg-[#385723]');
  });

  it('applies additional className prop', () => {
    render(<ToggleSwitch enabled={false} className="custom-class" />);
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveClass('custom-class');
  });

  it('calls apiCall function when clicked', () => {
    const mockApiCall = jest.fn();
    render(<ToggleSwitch enabled={false} apiCall={mockApiCall} />);
    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);
    expect(mockApiCall).toHaveBeenCalledTimes(1);
  });

//   it('forwards ref to button element', () => {
//     const ref = React.createRef<HTMLButtonElement>();
//     render(<ToggleSwitch enabled={false} ref={ref} />);
//     expect(ref.current).toBeInstanceOf(HTMLButtonElement);
//   });
});