import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UmTabsItem from "../UmTabItems";

describe("UmTabsItem", () => {
    it("renders the text correctly", () => {
        const text = "Test Text";
        const { getByText } = render(
            <UmTabsItem text={text} isActive={false} onClick={() => {}} />
        );
        expect(getByText(text)).toBeInTheDocument();
    });

    it("applies the active class when isActive is true", () => {
        const { container } = render(
            <UmTabsItem text="Test Text" isActive={true} onClick={() => {}} />
        );
        expect(container.querySelector(".font-bold")).toBeInTheDocument();
        expect(container.querySelector(".text-[#1C468E]")).toBeInTheDocument();
        expect(container.querySelector(".bg-[#1C468E]")).toBeInTheDocument();
    });

    it("applies the inactive class when isActive is false", () => {
        const { container } = render(
            <UmTabsItem text="Test Text" isActive={false} onClick={() => {}} />
        );
        expect(container.querySelector(".text-[#666666]")).toBeInTheDocument();
        expect(container.querySelector(".bg-white")).toBeInTheDocument();
    });

    it("calls the onClick function when clicked", () => {
        const onClick = jest.fn();
        const { getByText } = render(
            <UmTabsItem text="Test Text" isActive={false} onClick={onClick} />
        );
        const listItem = getByText("Test Text");
        fireEvent.click(listItem);
        expect(onClick).toHaveBeenCalled();
    });
});

