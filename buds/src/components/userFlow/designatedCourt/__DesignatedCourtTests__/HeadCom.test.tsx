import { render, screen } from '@testing-library/react';
import HeadComp from '../HeadCom';
import React from 'react';

test('renders logo and cross icon', () => {
    render(<HeadComp />);
    
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();

    const crossIconElement = screen.getByAltText('Close Menu');
    expect(crossIconElement).toBeInTheDocument();
});
