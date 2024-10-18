import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DscButton from "../Dscbutton";

// Mock the image imports
jest.mock("../../../assets/images/new_images/uploadFile-2.png", () => "uploadFolderIcon");
jest.mock("../../../assets/images/UploadIcon.png", () => "uploadIcon");

describe("DscButton Component", () => {
  test("renders the button with default text 'Document'", () => {
    render(<DscButton />);
    expect(screen.getByText("Upload DSC")).toBeInTheDocument();
    expect(screen.getByText("Document")).toBeInTheDocument();
  });

  test("displays the selected file name", () => {
    render(<DscButton />);
    
    const input = screen.getByRole("textbox", { hidden: true });
    fireEvent.change(input, {
      target: { files: [new File(["dummy content"], "test-file.crt", { type: "application/x-x509-ca-cert" })] },
    });
    
    expect(screen.getByText("test-file.crt")).toBeInTheDocument();
  });

  test("calls onFileUpload when a file is selected", () => {
    const mockOnFileUpload = jest.fn();
    render(<DscButton onFileUpload={mockOnFileUpload} />);
    
    const input = screen.getByRole("textbox", { hidden: true });
    const file = new File(["dummy content"], "test-file.crt", { type: "application/x-x509-ca-cert" });
    
    fireEvent.change(input, { target: { files: [file] } });
    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  test("calls onFileUpload with null when no file is selected", () => {
    const mockOnFileUpload = jest.fn();
    render(<DscButton onFileUpload={mockOnFileUpload} />);
    
    const input = screen.getByRole("textbox", { hidden: true });
    fireEvent.change(input, { target: { files: [] } });
    
    expect(mockOnFileUpload).toHaveBeenCalledWith(null);
  });

  test("disables the button when disabled prop is true", () => {
    render(<DscButton disabled />);
    
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  test("renders fname when provided", () => {
    render(<DscButton fname="provided-file.crt" />);
    
    expect(screen.getByText("provided-file.crt")).toBeInTheDocument();
  });

  test("displays the correct icons", () => {
    render(<DscButton />);
    
    const folderIcon = screen.getByAltText("UploadButtonFolderSvg");
    const uploadIcon = screen.getByAltText("UploadButtonSvg1");
    
    expect(folderIcon).toBeInTheDocument();
    expect(uploadIcon).toBeInTheDocument();
  });
});
