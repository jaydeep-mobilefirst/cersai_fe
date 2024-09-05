import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ToggleSwitch from "../ToggleSwitch";

describe("ToggleSwitch", () => {
    it("renders without crashing", () => {
        render(<ToggleSwitch enabled={true} />);
    });

    it("renders with the correct variant", () => {
        render(<ToggleSwitch enabled={true} variant="table" />);
        // Add your assertion here
    });

    it("calls the apiCall function when clicked", () => {
        const apiCallMock = jest.fn();
        const { getByRole } = render(
            <ToggleSwitch enabled={true} apiCall={apiCallMock} />
        );
        const toggleSwitch = getByRole("switch");
        fireEvent.click(toggleSwitch);
        expect(apiCallMock).toHaveBeenCalled();
    });

    // Add more test cases as needed
});

