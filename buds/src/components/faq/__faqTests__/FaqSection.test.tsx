import React from 'react';
import { render } from '@testing-library/react';
import FAQSection from '../FaqSection';

describe('FAQSection', () => {
    const title = 'Frequently Asked Questions';
    const items = [
        { question: 'Question 1', answer: 'Answer 1' },
        { question: 'Question 2', answer: 'Answer 2' },
    ];

    it('renders the title correctly', () => {
        const { getByText } = render(<FAQSection title={title} items={items} />);
        expect(getByText(title)).toBeInTheDocument();
    });

    it('renders the FAQ items correctly', () => {
        const { getByText } = render(<FAQSection title={title} items={items} />);
        items.forEach((item) => {
            expect(getByText(item.question)).toBeInTheDocument();
            expect(getByText(item.answer)).toBeInTheDocument();
        });
    });
});
