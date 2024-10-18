import React from 'react';
import { render } from '@testing-library/react';
import FAQSection from '../FaqSection';
import FaqItem from '../FaqItem'; // Importing FaqItem for mocking
import '@testing-library/jest-dom/extend-expect';

jest.mock('../FaqItem', () => ({ question, answer }: { question: string; answer: string | string[] }) => (
  <div>
    <h3>{question}</h3>
    <p>{Array.isArray(answer) ? answer.join(' ') : answer}</p>
  </div>
));

describe('FAQSection Component', () => {
  const mockTitle = 'Frequently Asked Questions';
  const mockItems = [
    { question: 'What is React?', answer: 'React is a JavaScript library for building user interfaces.' },
    { question: 'What is a component?', answer: 'Components are building blocks of a React application.' },
    { question: 'How does useState work?', answer: ['useState is a hook that lets you add state to functional components.'] }
  ];

  it('renders the title correctly', () => {
    const { getByText } = render(<FAQSection title={mockTitle} items={mockItems} />);
    expect(getByText('Frequently Asked Questions')).toBeInTheDocument();
  });

  it('renders the correct number of FaqItem components', () => {
    const { getAllByText } = render(<FAQSection title={mockTitle} items={mockItems} />);
    
    // Assuming each FAQ item has a corresponding question
    const questions = getAllByText(/What is|How does/i);
    expect(questions.length).toBe(3);
  });

  it('renders the FAQ items correctly', () => {
    const { getByText } = render(<FAQSection title={mockTitle} items={mockItems} />);
    
    // Check that the FAQ questions and answers are rendered correctly
    expect(getByText('What is React?')).toBeInTheDocument();
    expect(getByText('React is a JavaScript library for building user interfaces.')).toBeInTheDocument();

    expect(getByText('What is a component?')).toBeInTheDocument();
    expect(getByText('Components are building blocks of a React application.')).toBeInTheDocument();

    expect(getByText('How does useState work?')).toBeInTheDocument();
    expect(getByText('useState is a hook that lets you add state to functional components.')).toBeInTheDocument();
  });

  it('handles cases where there are no items', () => {
    const { queryByText } = render(<FAQSection title={mockTitle} items={[]} />);
    
    // Ensure no FAQ items are rendered
    expect(queryByText('What is React?')).not.toBeInTheDocument();
  });
});
