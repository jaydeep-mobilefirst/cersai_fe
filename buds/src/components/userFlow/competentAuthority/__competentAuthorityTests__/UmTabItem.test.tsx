import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UmTabsItem from "../UmTabItems";

describe("UmTabsItem", () => {
    test("renders text correctly", () => {
        const text = "Test Text";
        const { getByText } = render(
            <UmTabsItem text={text} isActive={false} onClick={() => {}} />
        );
        const textElement = getByText(text);
        expect(textElement).toBeInTheDocument();
    });

    test("applies active styles when isActive is true", () => {
        const text = "Test Text";
        const { container } = render(
            <UmTabsItem text={text} isActive={true} onClick={() => {}} />
        );
        const listItem = container.firstChild;
        expect(listItem).toHaveClass("font-bold text-[#1C468E]");
        expect(listItem).toHaveClass("bg-[#1C468E]");
    });

    test("applies inactive styles when isActive is false", () => {
        const text = "Test Text";
        const { container } = render(
            <UmTabsItem text={text} isActive={false} onClick={() => {}} />
        );
        const listItem = container.firstChild;
        expect(listItem).not.toHaveClass("font-bold text-[#1C468E]");
        expect(listItem).not.toHaveClass("bg-[#1C468E]");
    });

    test("calls onClick function when clicked", () => {
        const text = "Test Text";
        const onClick = jest.fn();
        const { getByText } = render(
            <UmTabsItem text={text} isActive={false} onClick={onClick} />
        );
        const listItem = getByText(text);
        fireEvent.click(listItem);
        expect(onClick).toHaveBeenCalled();
    });
});

