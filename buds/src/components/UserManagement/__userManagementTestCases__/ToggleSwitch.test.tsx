import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ToggleSwitch from "../ToggleSwitch";

describe("ToggleSwitch", () => {
    it("renders correctly", () => {
        const { getByRole } = render(<ToggleSwitch enabled={true} />);
        const switchButton = getByRole("switch");
        expect(switchButton).toBeInTheDocument();
    });

    it("calls apiCall function when clicked", () => {
        const apiCallMock = jest.fn();
        const { getByRole } = render(
            <ToggleSwitch enabled={true} apiCall={apiCallMock} />
        );
        const switchButton = getByRole("switch");
        fireEvent.click(switchButton);
        expect(apiCallMock).toHaveBeenCalled();
    });

    it("changes background color based on variant prop", () => {
        const { getByRole } = render(
            <ToggleSwitch enabled={true} variant="table" />
        );
        const switchButton = getByRole("switch");
        expect(switchButton).toHaveClass("bg-[#D4FDC6]");
    });

    it("changes circle background color based on variant prop", () => {
        const { getByRole } = render(
            <ToggleSwitch enabled={true} variant="table" />
        );
        const circle = getByRole("switch").querySelector("span");
        expect(circle).toHaveClass("bg-[#385723]");
    });
});

