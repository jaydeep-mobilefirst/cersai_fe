import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import UploadButtonV2 from "../UploadButtonV2";

// Mock the SVG imports
jest.mock("../../../assets/images/uploadFile-2.svg", () => "uploadFile-2.svg");
jest.mock("../../../assets/images/UploadIcon.png", () => "UploadIcon.png");

describe("UploadButtonV2 Component", () => {
  const mockOnFileUpload = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the upload button correctly", () => {
    render(<UploadButtonV2 onFileUpload={mockOnFileUpload} />);
    expect(screen.getByText("Upload DSC")).toBeInTheDocument();
    expect(screen.getByText("Document")).toBeInTheDocument();
  });

  it("calls the file input when the button is clicked", () => {
    render(<UploadButtonV2 onFileUpload={mockOnFileUpload} />);
    const button = screen.getByRole("button");
    const fileInput = screen.getByLabelText("hidden-file-input");

    fireEvent.click(button);
    expect(fileInput).toBeInTheDocument();
  });

  it("calls onFileUpload with the file when a file is selected", () => {
    const file = new File(["dummy content"], "example.pdf", {
      type: "application/pdf",
    });

    render(<UploadButtonV2 onFileUpload={mockOnFileUpload} />);

    const fileInput = screen.getByLabelText("hidden-file-input");

    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  it("calls onFileUpload with null when no file is selected", () => {
    render(<UploadButtonV2 onFileUpload={mockOnFileUpload} />);
    const fileInput = screen.getByLabelText("hidden-file-input");

    fireEvent.change(fileInput, { target: { files: [] } });
    expect(mockOnFileUpload).toHaveBeenCalledWith(null);
  });

  it("shows the correct button background color based on file selection", () => {
    render(<UploadButtonV2 onFileUpload={mockOnFileUpload} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-gray-600");

    const file = new File(["dummy content"], "example.pdf", {
      type: "application/pdf",
    });

    const fileInput = screen.getByLabelText("hidden-file-input");

    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(button).toHaveClass("bg-[#385723]");
  });

  it("should handle no onFileUpload prop being passed", () => {
    render(<UploadButtonV2 />);

    const file = new File(["dummy content"], "example.pdf", {
      type: "application/pdf",
    });

    const fileInput = screen.getByLabelText("hidden-file-input");

    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(mockOnFileUpload).not.toHaveBeenCalled(); // No error should be thrown
  });
});
