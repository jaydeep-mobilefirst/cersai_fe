import { render, screen, fireEvent } from "@testing-library/react";
import DynamicFileUpload from "../DynamicFileUpload";
import React from "react";

describe("DynamicFileUpload", () => {
    const mockData = {
        id: 1,
        documentName: "Test Document",
        required: true,
        fileName: "test.pdf",
        fileSizeLimit: 5000000,
        fileType: "pdf",
        uploadFileId: 12345,
        error: null,
    };

    test("renders document name", () => {
        render(<DynamicFileUpload data={mockData} />);
        const documentName = screen.getByText("Test Document");
        expect(documentName).toBeInTheDocument();
    });

    test("renders file name if available", () => {
        render(<DynamicFileUpload data={mockData} />);
        const fileName = screen.getByText("test.pdf");
        expect(fileName).toBeInTheDocument();
    });

    test("renders 'No Document uploaded' if no file name available", () => {
        const mockDataWithoutFileName = { ...mockData, fileName: "" };
        render(<DynamicFileUpload data={mockDataWithoutFileName} />);
        const noDocumentUploaded = screen.getByText("No Document uploaded");
        expect(noDocumentUploaded).toBeInTheDocument();
    });

    test("renders required indicator if required is true", () => {
        render(<DynamicFileUpload data={mockData} />);
        const requiredIndicator = screen.getByText("*");
        expect(requiredIndicator).toBeInTheDocument();
    });

    test("does not render required indicator if required is false", () => {
        const mockDataNotRequired = { ...mockData, required: false };
        render(<DynamicFileUpload data={mockDataNotRequired} />);
        const requiredIndicator = screen.queryByText("*");
        expect(requiredIndicator).toBeNull();
    });

    test("opens upload popup when folder icon is clicked", () => {
        render(<DynamicFileUpload data={mockData} />);
        const folderIcon = screen.getByAltText("Folder Open Icon");
        fireEvent.click(folderIcon);
        const uploadPopup = screen.getByText("Upload File");
        expect(uploadPopup).toBeInTheDocument();
    });

    // Add more test cases as needed
});
