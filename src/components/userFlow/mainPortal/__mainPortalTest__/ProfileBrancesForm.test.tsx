import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileBranchesForm from '../ProfileBranchesForm';

describe('ProfileBranchesForm Component', () => {
  it('renders without crashing', () => {
    render(<ProfileBranchesForm />);
    
    // Verify that the component renders successfully
    const component = screen.getByText('ProfileBranchesForm');
    expect(component).toBeInTheDocument();
  });

  it('displays the correct text', () => {
    render(<ProfileBranchesForm />);
    
    // Check if the text "ProfileBranchesForm" is rendered
    expect(screen.getByText('ProfileBranchesForm')).toBeInTheDocument();
  });
});
