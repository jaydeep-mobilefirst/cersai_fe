import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpSideBar from '../SignUpSideBar';
import { MemoryRouter } from 'react-router-dom';

// Mock the required modules
jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/' }),
  useNavigate: () => jest.fn(),
  Link: 'a',
}));

jest.mock('../../../zust/deposit-taker-registration/registrationStore', () => ({
  useDepositTakerRegistrationStore: () => ({ allFormData: {}, sections: [] }),
}));

describe('SignUpSideBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<SignUpSideBar />);
    expect(screen.getByText('Competent Authority')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    render(<SignUpSideBar />);
    expect(screen.getByText('Competent Authority')).toBeInTheDocument();
  });

  it('shows the completion percentage', () => {
    render(<SignUpSideBar />);
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('0%')).toBeInTheDocument();
  });

  it('renders the progress bar', () => {
    render(<SignUpSideBar />);
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveClass('h-2');
    expect(progressBar).toHaveClass('bg-white');
    expect(progressBar).toHaveClass('rounded-[32px]');
  });

//   it('renders all sidebar items', () => {
//     render(<SignUpSideBar />);
//     signupSideBarCompetent.forEach((item) => {
//       const description = item.description === "Nodal Details" ? "Nodal Officer Details" : item.description;
//       expect(screen.getByText(description)).toBeInTheDocument();
//     });
//   });

  it('applies correct styling to sidebar items', () => {
    render(<SignUpSideBar />);
    const sidebarItems = screen.getAllByRole('button');
    sidebarItems.forEach((item) => {
      expect(item).toHaveClass('mb-[16px]');
      expect(item).toHaveClass('w-full');
      expect(item).toHaveClass('md:w-[290px]');
      expect(item).toHaveClass('h-14');
      expect(item).toHaveClass('p-2');
      expect(item).toHaveClass('rounded-lg');
    });
  });
});