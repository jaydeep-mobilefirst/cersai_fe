import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DropdownMenu from "../DropdownMenu";

describe("DropdownMenu", () => {
    test("renders toggle button", () => {
        render(<DropdownMenu isOpen={false} toggleDropdown={() => {}} setIsOpen={() => {}} />);
        const toggleButton = screen.getByRole("button");
        expect(toggleButton).toBeInTheDocument();
    });

    test("toggles dropdown when toggle button is clicked", () => {
        const toggleDropdown = jest.fn();
        render(<DropdownMenu isOpen={false} toggleDropdown={toggleDropdown} setIsOpen={() => {}} />);
        const toggleButton = screen.getByRole("button");
        fireEvent.click(toggleButton);
        expect(toggleDropdown).toHaveBeenCalled();
    });

    test("renders dropdown menu when isOpen is true", () => {
        render(<DropdownMenu isOpen={true} toggleDropdown={() => {}} setIsOpen={() => {}} />);
        const dropdownMenu = screen.getByRole("menu");
        expect(dropdownMenu).toBeInTheDocument();
    });

    test("calls handleLogOut when logout button is clicked", () => {
        const handleLogOut = jest.fn();
        render(<DropdownMenu isOpen={true} toggleDropdown={() => {}} setIsOpen={() => {}} />);
        const logoutButton = screen.getByText("Logout");
        fireEvent.click(logoutButton);
        expect(handleLogOut).toHaveBeenCalled();
    });
});
