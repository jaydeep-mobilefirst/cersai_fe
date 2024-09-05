import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import DropdownMenu from "../DropdownMenu";

jest.mock("axios");

describe("DropdownMenu", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders dropdown menu", () => {
        render(
            <BrowserRouter>
                <DropdownMenu toggleDropdown={() => {}} isOpen={true} setIsOpen={() => {}} />
            </BrowserRouter>
        );

        expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    test("toggles dropdown menu", () => {
        const toggleDropdown = jest.fn();

        render(
            <BrowserRouter>
                <DropdownMenu toggleDropdown={toggleDropdown} isOpen={false} setIsOpen={() => {}} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole("button"));

        expect(toggleDropdown).toHaveBeenCalledTimes(1);
    });

    // // test("logs out when logout button is clicked", async () => {
    // //     const navigate = jest.fn();
    // //     const sessionStorageMock = {
    // //         getItem: jest.fn(),
    // //         clear: jest.fn(),
    // //     };

    // //     Object.defineProperty(window, "sessionStorage", {
    // //         value: sessionStorageMock,
    // //     });

    // //     axios.post.mockResolvedValueOnce({});

    //     render(
    //         <BrowserRouter>
    //             <DropdownMenu toggleDropdown={() => {}} isOpen={true} setIsOpen={() => {}} />
    //         </BrowserRouter>
    //     );

    //     fireEvent.click(screen.getByText("Logout"));

    //     await waitFor(() => {
    //         expect(navigate).toHaveBeenCalledWith("/");
    //         expect(sessionStorageMock.clear).toHaveBeenCalledTimes(1);
    //     });
    // });
});
