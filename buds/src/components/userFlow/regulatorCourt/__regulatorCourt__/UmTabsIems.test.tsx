import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UmTabsItem from "../UmTabItems";

describe("UmTabsItem", () => {
    test("renders text correctly", () => {
        const { getByText } = render(
            <UmTabsItem text="Test Text" isActive={false} onClick={() => {}} />
        );
        const textElement = getByText("Test Text");
        expect(textElement).toBeInTheDocument();
    });

    // test("applies active styles when isActive is true", () => {
    //     const { container } = render(
    //         <UmTabsItem text="Test Text" isActive={true} onClick={() => {}} />
    //     );
    //     const textElement = container.querySelector(".font-bold");
    //     const dividerElement = container.querySelector(".bg-[#1C468E]");
    //     expect(textElement).toBeInTheDocument();
    //     expect(dividerElement).toBeInTheDocument();
    // });

    // test("applies inactive styles when isActive is false", () => {
    //     const { container } = render(
    //         <UmTabsItem text="Test Text" isActive={false} onClick={() => {}} />
    //     );
    //     const textElement = container.querySelector(".text-[#666666]");
    //     const dividerElement = container.querySelector(".bg-white");
    //     expect(textElement).toBeInTheDocument();
    //     expect(dividerElement).toBeInTheDocument();
    // });

    test("calls onClick function when clicked", () => {
        const onClickMock = jest.fn();
        const { container } = render(
            <UmTabsItem text="Test Text" isActive={false} onClick={onClickMock} />
        );
        const listItem = container.querySelector("li");
        if (listItem) {
            fireEvent.click(listItem);
            expect(onClickMock).toHaveBeenCalled();
        }
    });
});

