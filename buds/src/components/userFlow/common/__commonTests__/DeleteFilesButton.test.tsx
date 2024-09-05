import { render, fireEvent } from "@testing-library/react";
import DeleteFileButton from "../DeleteFileButton";
import React from "react";

describe("DeleteFileButton", () => {
    it("should render the component without errors", () => {
        render(<DeleteFileButton fieldData={null} fieldType="" />);
        // Add assertions here
    });

    it("should call onFileChange when clicked", () => {
        const onFileChange = jest.fn();
        const fieldData = null;
        const fieldType = "";

        const { getByTestId } = render(
            <DeleteFileButton
                fieldData={fieldData}
                fieldType={fieldType}
                onFileChange={onFileChange}
            />
        );

        fireEvent.click(getByTestId("delete-button"));

        expect(onFileChange).toHaveBeenCalled();
        // Add more assertions here
    });

    // Add more test cases here
});
