import React from 'react';
import { render } from '@testing-library/react';
import ProfileBranchesForm from '../ProfileBranchesForm';

describe('ProfileBranchesForm', () => {
    it('renders without crashing', () => {
        render(<ProfileBranchesForm />);
    });
});
