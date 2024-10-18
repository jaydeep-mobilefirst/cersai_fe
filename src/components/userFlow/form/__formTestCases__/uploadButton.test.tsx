import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UploadButton from "../UploadButton";

describe("UploadButton Component", () => {
  const mockFile = new File(["dummy content"], "example.txt", {
    type: "text/plain",
  });
  const onFileUploadMock = jest.fn();

  it("opens file input when button is clicked", () => {
    render(<UploadButton />);
    const buttonElement = screen.getByRole("button");

    fireEvent.click(buttonElement);
    
    const fileInput = screen.getByRole("textbox"); // Since input is hidden, this simulates the file selection
    expect(fileInput).toBeInTheDocument();
  });

  it("calls onFileUpload when a file is selected", () => {
    render(<UploadButton onFileUpload={onFileUploadMock} />);

    const fileInput = screen.getByRole("textbox");
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    expect(onFileUploadMock).toHaveBeenCalledWith(mockFile);
    expect(onFileUploadMock).toHaveBeenCalledTimes(1);
  });

  it("updates the button state when a file is selected", () => {
    render(<UploadButton />);

    const buttonElement = screen.getByRole("button");
    const fileInput = screen.getByRole("textbox");

    expect(buttonElement).toHaveClass("no-file");

    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    expect(buttonElement).toHaveClass("file-selected");
  });
});
