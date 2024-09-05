import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ToggleSwitch from "../ToggleSwitch";

test("ToggleSwitch changes state when clicked", () => {
    const { getByRole } = render(<ToggleSwitch enabled={true} />);
    const toggleSwitch = getByRole("switch");

    fireEvent.click(toggleSwitch);

    expect(toggleSwitch.getAttribute("aria-checked")).toBe("true");
});
