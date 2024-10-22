import { render, screen, fireEvent } from "@testing-library/react";
import AddRolePopup from "../AddRolePopup";
import React from "react";

describe("AddRolePopup", () => {
    test("renders correctly", () => {
        render(<AddRolePopup onClose={() => {}} />);
        
        // Assert that the component renders without errors
        expect(screen.getByText("Add new role")).toBeInTheDocument();
        expect(screen.getByLabelText("Role")).toBeInTheDocument();
        expect(screen.getByLabelText("Functionalities mapped")).toBeInTheDocument();
        expect(screen.getByText("Cancel")).toBeInTheDocument();
        expect(screen.getByText("Save")).toBeInTheDocument();
    });

    // test("calls onClose when Cancel button is clicked", () => {
    //     const onCloseMock = jest.fn();
    //     render(<AddRolePopup onClose={onCloseMock} />);
        
    //     // Simulate a click on the Cancel button
    //     fireEvent.click(screen.getByText("Cancel"));
        
    //     // Assert that onCloseMock is called
    //     expect(onCloseMock).toHaveBeenCalled();
    // });

    // test("opens success popup when Save button is clicked with a selected functionality", () => {
    //     render(<AddRolePopup onClose={() => {}} />);
        
    //     // Select a functionality from the dropdown
    //     fireEvent.change(screen.getByLabelText("Functionalities mapped"), {
    //         target: { value: "Functionality 1" },
    //     });
        
    //     // Simulate a click on the Save button
    //     fireEvent.click(screen.getByText("Save"));
        
    //     // Assert that the success popup is opened
    //     expect(screen.findByText("Success Popup")).toBeInTheDocument();
    // });

    test("does not open success popup when Save button is clicked without selecting a functionality", () => {
        render(<AddRolePopup onClose={() => {}} />);
        
        // Simulate a click on the Save button without selecting a functionality
        fireEvent.click(screen.getByText("Save"));
        
        // Assert that the success popup is not opened
        expect(screen.queryByText("Success Popup")).not.toBeInTheDocument();
    });
});
