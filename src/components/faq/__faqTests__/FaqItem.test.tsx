import React from "react";
import { render, fireEvent } from "@testing-library/react";
import FAQItem from "../FaqItem";

describe("FAQItem", () => {
    const question = "What is the meaning of life?";
    const answer = "42";

    it("renders the question correctly", () => {
        const { getByText } = render(<FAQItem question={question} answer={answer} />);
        expect(getByText(question)).toBeInTheDocument();
    });

    it("toggles the answer when clicked", () => {
        const { getByAltText, getByText, queryByText } = render(<FAQItem question={question} answer={answer} />);
        const toggleButton = getByAltText("toggle");

        fireEvent.click(toggleButton);
        expect(getByText(answer)).toBeInTheDocument(); // After opening the answer

        fireEvent.click(toggleButton);
        expect(queryByText(answer)).not.toBeInTheDocument(); // After closing the answer
    });
});
