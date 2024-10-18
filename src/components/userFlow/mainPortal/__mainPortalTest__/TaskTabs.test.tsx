import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TaskTabs from '../TaskTabs';
import TaskTabsItem from '../TaskTabItems';

jest.mock('./TaskTabItems', () => jest.fn(() => <div>Mocked TaskTabsItem</div>));

describe('TaskTabs Component', () => {
  it('renders all the tabs with correct text and links', () => {
    render(
      <MemoryRouter>
        <TaskTabs />
      </MemoryRouter>
    );

    // Verify that all tabs are rendered with correct text
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
    expect(screen.getByText('Update DSC 3 Certificate')).toBeInTheDocument();

    // Verify links are correct
    const profileLink = screen.getByText('Profile').closest('a');
    expect(profileLink).toHaveAttribute('href', '/dt/profile');

    const resetPasswordLink = screen.getByText('Reset Password').closest('a');
    expect(resetPasswordLink).toHaveAttribute('href', '/dt/resetpassword');

    const updateDSC3Link = screen.getByText('Update DSC 3 Certificate').closest('a');
    expect(updateDSC3Link).toHaveAttribute('href', '/dt/uploaddsc3');
  });

  it('sets the default active tab to "Profile"', () => {
    render(
      <MemoryRouter>
        <TaskTabs />
      </MemoryRouter>
    );

    expect(TaskTabsItem).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'Profile',
        isActive: true,
      }),
      expect.anything()
    );
  });

  it('updates the active tab when the URL changes', () => {
    render(
      <MemoryRouter initialEntries={['/dt/resetpassword']}>
        <TaskTabs />
      </MemoryRouter>
    );

    expect(TaskTabsItem).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'Reset Password',
        isActive: true,
      }),
      expect.anything()
    );
  });

  it('calls handleTabClick and updates active tab when a tab is clicked', () => {
    render(
      <MemoryRouter>
        <TaskTabs />
      </MemoryRouter>
    );

    // Simulate clicking on "Update DSC 3 Certificate"
    fireEvent.click(screen.getByText('Update DSC 3 Certificate'));

    expect(TaskTabsItem).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'Update DSC 3 Certificate',
        isActive: true,
      }),
      expect.anything()
    );
  });
});
