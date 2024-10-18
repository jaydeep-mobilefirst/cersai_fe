import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';
import { MemoryRouter } from 'react-router-dom';

// Mock session storage
beforeEach(() => {
  sessionStorage.setItem('firstName', 'John');
  sessionStorage.setItem('lastName', 'Doe');
  sessionStorage.setItem('entityType', 'DT');
});

afterEach(() => {
  sessionStorage.clear();
  jest.clearAllMocks();
});

describe('Header Component', () => {
  it('displays user first name and last name from sessionStorage', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('displays correct entity title based on entityType (Deposit Taker)', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Deposit Taker')).toBeInTheDocument();
  });

  it('displays the static text CERSAI in the user information section', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('CERSAI')).toBeInTheDocument();
  });

  it('renders the setting icon and links to the correct profile page', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const settingsLink = screen.getByRole('link', { name: /Setting/i });
    expect(settingsLink).toBeInTheDocument();
    expect(settingsLink).toHaveAttribute('href', '/dt/profile?current=entity');
  });

  it('displays the user logo image', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const userLogo = screen.getByAltText('user logo');
    expect(userLogo).toBeInTheDocument();
  });

  it('toggles the dropdown menu when clicking on the user profile section', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Initially, dropdown menu should not be visible
    expect(screen.queryByText(/DropdownMenu/i)).not.toBeInTheDocument();

    // Simulate clicking on the profile section
    const profileSection = screen.getByText('John Doe');
    fireEvent.click(profileSection);

    // The dropdown menu should now be visible
    expect(screen.queryByText(/DropdownMenu/i)).toBeInTheDocument();

    // Simulate clicking again to close the dropdown
    fireEvent.click(profileSection);

    // The dropdown menu should not be visible
    expect(screen.queryByText(/DropdownMenu/i)).not.toBeInTheDocument();
  });

  it('sets the correct title based on entityType from sessionStorage', () => {
    sessionStorage.setItem('entityType', 'CA'); // Competent Authority

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('Competent Authority')).toBeInTheDocument();
  });

  it('does not display title if entityType is not in titleMap', () => {
    sessionStorage.setItem('entityType', 'UNKNOWN'); // Non-existent entityType

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.queryByText('Deposit Taker')).not.toBeInTheDocument();
    expect(screen.queryByText('Competent Authority')).not.toBeInTheDocument();
  });

  it('displays the default entity title if entityType is missing', () => {
    sessionStorage.removeItem('entityType');

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.queryByText('Deposit Taker')).not.toBeInTheDocument();
  });
});
