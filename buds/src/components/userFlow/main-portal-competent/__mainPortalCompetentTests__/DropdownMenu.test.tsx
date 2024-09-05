import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropdownMenu from "../DropdownMenu";

describe("DropdownMenu", () => {
    test("renders dropdown menu closed by default", () => {
        render(<DropdownMenu isOpen={false} toggleDropdown={() => {}} setIsOpen={() => {}} />);
        const dropdownIcon = screen.getByTestId("dropdown-icon");
        expect(dropdownIcon).toBeInTheDocument();
        expect(dropdownIcon).toHaveAttribute("data-testid", "dropdown-icon-closed");
    });

    test("renders dropdown menu open when isOpen is true", () => {
        render(<DropdownMenu isOpen={true} toggleDropdown={() => {}} setIsOpen={() => {}} />);
        const dropdownIcon = screen.getByTestId("dropdown-icon");
        expect(dropdownIcon).toBeInTheDocument();
        expect(dropdownIcon).toHaveAttribute("data-testid", "dropdown-icon-open");
    });

    test("calls toggleDropdown when dropdown icon is clicked", () => {
        const toggleDropdown = jest.fn();
        render(<DropdownMenu isOpen={false} toggleDropdown={toggleDropdown} setIsOpen={() => {}} />);
        const dropdownIcon = screen.getByTestId("dropdown-icon");
        fireEvent.click(dropdownIcon);
        expect(toggleDropdown).toHaveBeenCalledTimes(1);
    });

    test("calls handleLogOut when logout button is clicked", () => {
        const handleLogOut = jest.fn();
        render(<DropdownMenu isOpen={true} toggleDropdown={() => {}} setIsOpen={() => {}} />);
        const logoutButton = screen.getByText("Logout");
        fireEvent.click(logoutButton);
        expect(handleLogOut).toHaveBeenCalledTimes(1);
    });
});
