import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DscAuth from "../DscAuth";

describe("DscAuth component", () => {
    it("renders without crashing", () => {
        render(<DscAuth />);
    });

    // it("calls onFileUpload when a file is selected", () => {
    //     const onFileUpload = jest.fn();
    //     const { getByLabelText } = render(<DscAuth onFileUpload={onFileUpload} />);
    //     const fileInput = getByLabelText("Upload DSC");

    //     fireEvent.change(fileInput, {
    //         target: {
    //             files: [new File(["test.crt"], "test.crt", { type: "application/x-x509-ca-cert" })],
    //         },
    //     });

    //     expect(onFileUpload).toHaveBeenCalledWith(expect.any(File));
    // });

    // it("calls onFileUpload with null when no file is selected", () => {
    //     const onFileUpload = jest.fn();
    //     const { getByLabelText } = render(<DscAuth onFileUpload={onFileUpload} />);
    //     const fileInput = getByLabelText("Upload DSC");

    //     fireEvent.change(fileInput, {
    //         target: {
    //             files: null,
    //         },
    //     });

    //     expect(onFileUpload).toHaveBeenCalledWith(null);
    // });
});
