import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import DropdownMenu from "../DropdownMenu";

jest.mock("axios");

describe("DropdownMenu", () => {
    test("renders dropdown menu", () => {
        render(
            <BrowserRouter>
                <DropdownMenu toggleDropdown={() => {}} isOpen={true} setIsOpen={() => {}} />
            </BrowserRouter>
        );

        const dropdownMenu = screen.getByRole("menu");
        expect(dropdownMenu).toBeInTheDocument();
    });

    test("toggles dropdown menu", () => {
        const toggleDropdown = jest.fn();
        render(
            <BrowserRouter>
                <DropdownMenu toggleDropdown={toggleDropdown} isOpen={false} setIsOpen={() => {}} />
            </BrowserRouter>
        );

        const dropdownToggle = screen.getByRole("button");
        fireEvent.click(dropdownToggle);

        expect(toggleDropdown).toHaveBeenCalledTimes(1);
    });

    // test("logs out when logout button is clicked", async () => {
    //     const navigateMock = jest.fn();
    //     const sessionStorageMock = {
    //         getItem: jest.fn(),
    //         clear: jest.fn(),
    //     };
    //     Object.defineProperty(window, "sessionStorage", {
    //         value: sessionStorageMock,
    //     });
    //     axios.post.mockResolvedValueOnce({});
    //     render(
    //         <BrowserRouter>
    //             <DropdownMenu toggleDropdown={() => {}} isOpen={true} setIsOpen={() => {}} />
    //         </BrowserRouter>
    //     );

    //     const logoutButton = screen.getByText("Logout");
    //     fireEvent.click(logoutButton);

    //     expect(axios.post).toHaveBeenCalledWith(expect.stringContaining("/logout"), {
    //         refresh_token: expect.any(String),
    //     });
    //     await screen.findByText("Logout");
    //     expect(navigateMock).toHaveBeenCalledWith("/");
    //     expect(sessionStorageMock.clear).toHaveBeenCalledTimes(1);
    // });
});

