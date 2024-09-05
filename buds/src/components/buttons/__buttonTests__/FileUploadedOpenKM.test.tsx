import { render, screen, fireEvent } from "@testing-library/react";
import FileUploadOpenKm from "../FileUploadOpenKM";
import React from "react";

describe("FileUploadOpenKm", () => {
    test("renders without errors", () => {
        render(<FileUploadOpenKm setFileData={() => {}} fileData={null} />);
        // Assert that the component renders without throwing any errors
    });

    test("displays upload button when no file is selected", () => {
        render(<FileUploadOpenKm setFileData={() => {}} fileData={null} />);
        const uploadButton = screen.getByRole("button", { name: /upload/i });
        expect(uploadButton).toBeInTheDocument();
    });

    test("displays file name when a file is selected", () => {
        const file = new File(["dummy content"], "test.png", { type: "image/png" });
        render(<FileUploadOpenKm setFileData={() => {}} fileData={null} />);
        const fileInput = screen.getByLabelText(/upload document/i);
        fireEvent.change(fileInput, { target: { files: [file] } });
        const fileName = screen.getByText(/test.png/i);
        expect(fileName).toBeInTheDocument();
    });

    test("displays delete button when a file is selected", () => {
        const file = new File(["dummy content"], "test.png", { type: "image/png" });
        render(<FileUploadOpenKm setFileData={() => {}} fileData={null} />);
        const fileInput = screen.getByLabelText(/upload document/i);
        fireEvent.change(fileInput, { target: { files: [file] } });
        const deleteButton = screen.getByRole("button", { name: /delete/i });
        expect(deleteButton).toBeInTheDocument();
    });

    // Add more test cases as needed
});
