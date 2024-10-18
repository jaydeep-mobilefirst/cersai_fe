import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';
import { MemoryRouter } from 'react-router-dom';

// Mock sessionStorage
beforeEach(() => {
  sessionStorage.setItem('firstName', 'John');
  sessionStorage.setItem('lastName', 'Doe');
  sessionStorage.setItem('entityType', 'RG');
});

afterEach(() => {
  sessionStorage.clear();
  jest.clearAllMocks();
});

describe('Header Component', () => {
  it('renders the correct entity title based on entityType', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check if the correct title is displayed (in this case, "Regulator")
    expect(screen.getByText('Regulator')).toBeInTheDocument();
  });

  it('renders the user\'s first and last name from sessionStorage', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check if the user's name is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('navigates to the settings page when the settings icon is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Click the settings icon
    const settingsLink = screen.getByRole('link', { name: /Setting/i });
    expect(settingsLink).toHaveAttribute('href', '/rg/profile?current=regulator');
  });

  it('toggles the dropdown menu when user icon is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Dropdown should not be visible initially
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();

    // Click the user icon to open the dropdown
    fireEvent.click(screen.getByAltText('user logo'));

    // Check if the dropdown is visible
    expect(screen.getByText('Logout')).toBeInTheDocument();

    // Click the user icon again to close the dropdown
    fireEvent.click(screen.getByAltText('user logo'));

    // Check if the dropdown is no longer visible
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});
