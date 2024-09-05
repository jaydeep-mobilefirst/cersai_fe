import { render, screen, fireEvent } from "@testing-library/react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import React from "react";

jest.mock("react-router-dom", () => ({
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));

describe("Navbar", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render the Navbar component", () => {
        render(<Navbar />);
        // Add your assertions here
    });

    // it("should navigate to the FAQ page when FAQ menu item is clicked", () => {
    //     useLocation.mockReturnValue({ pathname: "/faq" });
    //     const navigateMock = jest.fn();
    //     useNavigate.mockReturnValue(navigateMock);

    //     render(<Navbar />);
    //     const faqMenuItem = screen.getByText("FAQ");
    //     fireEvent.click(faqMenuItem);

    //     expect(navigateMock).toHaveBeenCalledWith("/faq");
    //     // Add your assertions here
    // });

    // it("should navigate to the Notifications page when Notifications menu item is clicked", () => {
    //     useLocation.mockReturnValue({ pathname: "/notifications" });
    //     const navigateMock = jest.fn();
    //     useNavigate.mockReturnValue(navigateMock);

    //     render(<Navbar />);
    //     const notificationsMenuItem = screen.getByText("NOTIFICATIONS");
    //     fireEvent.click(notificationsMenuItem);

    //     expect(navigateMock).toHaveBeenCalledWith("/notifications");
    //     // Add your assertions here
    // });

    // it("should navigate to the Home page when Home menu item is clicked", () => {
    //     useLocation.mockReturnValue({ pathname: "/" });
    //     const navigateMock = jest.fn();
    //     useNavigate.mockReturnValue(navigateMock);

    //     render(<Navbar />);
    //     const homeMenuItem = screen.getByText("HOME");
    //     fireEvent.click(homeMenuItem);

    //     expect(navigateMock).toHaveBeenCalledWith("/");
    //     // Add your assertions here
    // });

    // Add more test cases for other menu items and scenarios
});
