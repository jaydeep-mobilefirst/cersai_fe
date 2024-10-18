import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DashboardProfileSidebarRegulator from '../DashboardProfileSidebar';
import { profileSideBarListRegulator } from '../../../../utils/hardText/portalText';


jest.mock('../../../utils/hardText/portalText', () => ({
  profileSideBarListRegulator: [
    { title: 'Dashboard', url: 'dashboard', rurl: '/dt/dashboard', percentage: 50 },
    { title: 'Profile', url: 'profile', rurl: '/dt/profile', percentage: 75 },
  ],
}));

describe('DashboardProfileSidebarRegulator Component', () => {
  const mockFetchFormFields = jest.fn();

  beforeEach(() => {
    sessionStorage.setItem('firstName', 'John');
    sessionStorage.setItem('lastName', 'Doe');
  });

  afterEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  it('renders the user name correctly from sessionStorage', () => {
    render(
      <MemoryRouter>
        <DashboardProfileSidebarRegulator fetchFormFields={mockFetchFormFields} />
      </MemoryRouter>
    );

    // Check if the user's full name is rendered
    expect(screen.getByText('JohnDoe')).toBeInTheDocument();
  });

  it('renders the default completion percentage of 0%', () => {
    render(
      <MemoryRouter>
        <DashboardProfileSidebarRegulator fetchFormFields={mockFetchFormFields} />
      </MemoryRouter>
    );

    // Ensure that the default completion percentage is 0%
    expect(screen.getByText('0% Completed')).toBeInTheDocument();
  });

  it('updates the completion percentage when a sidebar item is clicked', () => {
    render(
      <MemoryRouter>
        <DashboardProfileSidebarRegulator fetchFormFields={mockFetchFormFields} />
      </MemoryRouter>
    );

    // Click on the "Profile" tab
    fireEvent.click(screen.getByText('Profile'));

    // The completion percentage should update to 75% as per the mock data
    expect(screen.getByText('75% Completed')).toBeInTheDocument();
  });

  it('calls fetchFormFields when a sidebar item is clicked', () => {
    render(
      <MemoryRouter>
        <DashboardProfileSidebarRegulator fetchFormFields={mockFetchFormFields} />
      </MemoryRouter>
    );

    // Click on the "Dashboard" tab
    fireEvent.click(screen.getByText('Dashboard'));

    // Verify that the fetchFormFields function is called once
    expect(mockFetchFormFields).toHaveBeenCalledTimes(1);
  });

  it('toggles the sidebar open and close when the button is clicked', () => {
    render(
      <MemoryRouter>
        <DashboardProfileSidebarRegulator fetchFormFields={mockFetchFormFields} />
      </MemoryRouter>
    );

    // Find the sidebar toggle button
    const sidebarButton = screen.getByRole('button', { name: 'Open sidebar' });

    // Click to open the sidebar
    fireEvent.click(sidebarButton);

    // Check if the sidebar content becomes visible
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders the correct number of sidebar items from the profileSideBarListRegulator', () => {
    render(
      <MemoryRouter>
        <DashboardProfileSidebarRegulator fetchFormFields={mockFetchFormFields} />
      </MemoryRouter>
    );

    // Check that the correct number of sidebar items is rendered
    const sidebarItems = screen.getAllByRole('listitem');
    expect(sidebarItems.length).toBe(profileSideBarListRegulator.length);
  });



  
});
