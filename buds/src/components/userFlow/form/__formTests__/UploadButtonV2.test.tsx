import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UploadButtonV2 from "../UploadButtonV2";

describe("UploadButtonV2", () => {
    // it("should call onFileUpload when a file is selected", () => {
    //     const onFileUpload = jest.fn();
    //     const { getByLabelText } = render(<UploadButtonV2 onFileUpload={onFileUpload} />);
    //     const fileInput = getByLabelText("Upload file");

    //     fireEvent.change(fileInput, { target: { files: [new File([], "test.png")] } });

    //     expect(onFileUpload).toHaveBeenCalledWith(expect.any(File));
    // });

    // it("should call onFileUpload with null when no file is selected", () => {
    //     const onFileUpload = jest.fn();
    //     const { getByLabelText } = render(<UploadButtonV2 onFileUpload={onFileUpload} />);
    //     const fileInput = getByLabelText("Upload file");

    //     fireEvent.change(fileInput, { target: { files: [] } });

    //     expect(onFileUpload).toHaveBeenCalledWith(null);
    // });

    // it("should open file input when button is clicked", () => {
    //     const { getByLabelText } = render(<UploadButtonV2 />);
    //     // const fileInput = getByLabelText("Upload file");
    //     const button = getByLabelText("Upload button");

    //     fireEvent.click(button);

    //     // expect(fileInput).toHaveProperty("value", "");
    // });
});

