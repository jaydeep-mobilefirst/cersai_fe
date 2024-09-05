import { render, screen } from '@testing-library/react';
import QueryResolutionComp from '../QueryResolutionCom';
import React from 'react';

test('renders heading correctly', () => {
    render(<QueryResolutionComp />);
    const headingElement = screen.getByText(/Query Resolution/i);
    expect(headingElement).toBeInTheDocument();
});

test('renders date correctly', () => {
    render(<QueryResolutionComp />);
    const dateElement = screen.getByText(/Date/i);
    expect(dateElement).toBeInTheDocument();
});

test('renders month correctly', () => {
    render(<QueryResolutionComp />);
    const monthElement = screen.getByText(/Month/i);
    expect(monthElement).toBeInTheDocument();
});

test('renders location correctly', () => {
    render(<QueryResolutionComp />);
    const locationElement = screen.getByText(/Location/i);
    expect(locationElement).toBeInTheDocument();
});

test('renders city correctly', () => {
    render(<QueryResolutionComp />);
    const cityElement = screen.getByText(/City/i);
    expect(cityElement).toBeInTheDocument();
});

test('renders online heading correctly', () => {
    render(<QueryResolutionComp />);
    const onlineHeadingElement = screen.getByText(/Online Heading/i);
    expect(onlineHeadingElement).toBeInTheDocument();
});

test('renders description correctly', () => {
    render(<QueryResolutionComp />);
    const descriptionElement = screen.getByText(/Description/i);
    expect(descriptionElement).toBeInTheDocument();
});

test('renders button correctly', () => {
    render(<QueryResolutionComp />);
    const buttonElement = screen.getByText(/Button/i);
    expect(buttonElement).toBeInTheDocument();
});
