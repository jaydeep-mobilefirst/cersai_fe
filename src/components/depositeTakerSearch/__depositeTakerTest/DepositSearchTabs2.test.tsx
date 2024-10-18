import React from "react";
import { render } from "@testing-library/react";
import DepositeSearchTabsContainer from "../DepositeSearchTabs";

test("renders DepositeSearchTabsContainer component", () => {
    render(<DepositeSearchTabsContainer />);
});
test("renders correct number of DepositeSearchTab components", () => {
    const { container } = render(<DepositeSearchTabsContainer />);
    const tabComponents = container.querySelectorAll(".DepositeSearchTab");
    expect(tabComponents.length).toBe(3);
});

test("renders DepositeSearchTab components with correct props", () => {
    const { container } = render(<DepositeSearchTabsContainer />);
    const tabComponents = container.querySelectorAll(".DepositeSearchTab");

    const expectedProps = [
        { text: "Deposit taker Registered", value: "1000k", bgColor: true },
        { text: "Banned", value: "1000k", bgColor: false },
        { text: "Active", value: "1000k", bgColor: true },
    ];

    tabComponents.forEach((tab, index) => {
        expect(tab).toHaveAttribute("text", expectedProps[index].text);
        expect(tab).toHaveAttribute("value", expectedProps[index].value);
        expect(tab).toHaveAttribute("bgColor", expectedProps[index].bgColor.toString());
    });
});
