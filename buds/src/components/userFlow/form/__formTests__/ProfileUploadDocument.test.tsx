import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProfileUploadDocument from "../ProfileUploadDocument";

describe("ProfileUploadDocument", () => {
    it("renders without crashing", () => {
        render(<ProfileUploadDocument />);
    });

    it("calls onFileUpload when a file is selected", () => {
        const onFileUpload = jest.fn();
        const { getByLabelText } = render(
            <ProfileUploadDocument onFileUpload={onFileUpload} />
        );

        const fileInput = getByLabelText("Upload Document");
        fireEvent.change(fileInput, { target: { files: [new File([], "test.pdf")] } });

        expect(onFileUpload).toHaveBeenCalledWith(expect.any(File));
    });

    it("calls deleteFile when delete button is clicked", () => {
        const deleteFile = jest.fn();
        const { getByLabelText } = render(
            <ProfileUploadDocument deleteFile={deleteFile} fileName="test.pdf" />
        );

        const deleteButton = getByLabelText("Delete File");
        fireEvent.click(deleteButton);

        expect(deleteFile).toHaveBeenCalled();
    });

    it("calls handleOnClikcView when view button is clicked", () => {
        const handleOnClikcView = jest.fn();
        const { getByLabelText } = render(
            <ProfileUploadDocument handleOnClikcView={handleOnClikcView} fileName="test.pdf" />
        );

        const viewButton = getByLabelText("View File");
        fireEvent.click(viewButton);

        expect(handleOnClikcView).toHaveBeenCalled();
    });
});

