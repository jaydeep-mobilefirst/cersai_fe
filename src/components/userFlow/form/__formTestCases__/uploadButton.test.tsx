import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UploadButton from "../UploadButton";

describe("UploadButton Component", () => {
  // Define expected texts and class names for maintainability
  const texts = {
    buttonLabel: "Upload File", // Replace with the actual text on your button if different
    inputRole: "textbox", // Adjust if the role differs (e.g., "file" if it's a file input)
  };
  const classNames = {
    noFile: "no-file",
    fileSelected: "file-selected",
  };
  
  const mockFile = new File(["dummy content"], "example.txt", {
    type: "text/plain",
  });
  const onFileUploadMock = jest.fn();

  it("opens file input when button is clicked", () => {
    render(<UploadButton />);
    
    // Get the button and click it
    const buttonElement = screen.getByRole("button", { name: texts.buttonLabel });
    fireEvent.click(buttonElement);
    
    // Check if the file input is present in the document
    const fileInput = screen.getByRole(texts.inputRole);
    expect(fileInput).toBeInTheDocument();
  });

  it("calls onFileUpload when a file is selected", () => {
    render(<UploadButton onFileUpload={onFileUploadMock} />);
    
    // Simulate file input change
    const fileInput = screen.getByRole(texts.inputRole);
    fireEvent.change(fileInput, { target: { files: [mockFile] } });
    
    // Verify if the callback was called with the correct file
    expect(onFileUploadMock).toHaveBeenCalledWith(mockFile);
    expect(onFileUploadMock).toHaveBeenCalledTimes(1);
  });

  it("updates the button state when a file is selected", () => {
    render(<UploadButton />);
    
    const buttonElement = screen.getByRole("button", { name: texts.buttonLabel });
    const fileInput = screen.getByRole(texts.inputRole);
    
    // Verify initial class state
    expect(buttonElement).toHaveClass(classNames.noFile);
    
    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [mockFile] } });
    
    // Verify updated class state
    expect(buttonElement).toHaveClass(classNames.fileSelected);
  });
});
