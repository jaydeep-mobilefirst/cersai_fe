import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from '../userProfile/Footer'; // Adjust the path accordingly

describe('Footer Component', () => {
  it('should render the "Back" button when showbackbtn is true', () => {
    render(<Footer showbackbtn={true} backNavigation={jest.fn()} />);
    
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('should not render the "Back" button when showbackbtn is false', () => {
    render(<Footer showbackbtn={false} />);
    
    const backButton = screen.queryByText('Back');
    expect(backButton).toBeNull();
  });

  it('should render the "Save and continue" button when hidecontiuebtn is false', () => {
    render(<Footer hidecontiuebtn={false} />);

    expect(screen.getByText('Save and continue')).toBeInTheDocument();
  });

  it('should not render the "Save and continue" button when hidecontiuebtn is true', () => {
    render(<Footer hidecontiuebtn={true} />);

    const continueButton = screen.queryByText('Save and continue');
    expect(continueButton).toBeNull();
  });

  it('should disable the buttons when the "disabled" prop is true', () => {
    render(<Footer disabled={true} hidecontiuebtn={false} showbackbtn={true} />);

    const saveAndContinueButton = screen.getByText('Save and continue');
    expect(saveAndContinueButton).toBeDisabled();
  });

  it('should enable the buttons when the "disabled" prop is false', () => {
    render(<Footer disabled={false} hidecontiuebtn={false} showbackbtn={true} />);

    const saveAndContinueButton = screen.getByText('Save and continue');
    expect(saveAndContinueButton).not.toBeDisabled();
  });

  it('should call the "backNavigation" function when the "Back" button is clicked', () => {
    const mockBackNavigation = jest.fn();
    render(<Footer showbackbtn={true} backNavigation={mockBackNavigation} />);

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockBackNavigation).toHaveBeenCalledTimes(1);
  });

  it('should render the "Save and Submit" button when the path is correct', () => {
    render(<Footer hidecontiuebtn={false} showbackbtn={true} path="/dt/profile" />);

    expect(screen.getByText('Save and Submit')).toBeInTheDocument();
  });

  it('should render the footer text correctly', () => {
    render(<Footer />);

    expect(screen.getByText('© 2024 Protean BUDs, All Rights Reserved.')).toBeInTheDocument();
  });

  it('should show the loader in "Save and continue" button when loader1 is true', () => {
    render(<Footer loader1={true} hidecontiuebtn={false} />);

    const loaderElement = screen.getByTestId('loader-spin'); // Assuming LoaderSpin component has a data-testid="loader-spin"
    expect(loaderElement).toBeInTheDocument();
  });

  it('should show the loader in "Save and Submit" button when loader is true', () => {
    render(<Footer loader={true} />);

    const loaderElement = screen.getByTestId('loader-spin'); // Assuming LoaderSpin component has a data-testid="loader-spin"
    expect(loaderElement).toBeInTheDocument();
  });
});
