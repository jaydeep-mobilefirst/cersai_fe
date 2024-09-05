import React from 'react';
import { render } from '@testing-library/react';
import DynamicTick from '../DynamicTick';

test('renders DynamicTick component with stroke color "#1C468E"', () => {
    render(<DynamicTick stroke="#1C468E" />);
});

test('renders DynamicTick component with stroke color "#FF0000"', () => {
    render(<DynamicTick stroke="#FF0000" />);
});

test('renders DynamicTick component with no stroke color', () => {
    render(<DynamicTick stroke="" />);
});
