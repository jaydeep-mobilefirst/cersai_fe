import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UploadButton from "../UploadButton";
import { UploadButtonTexts } from "../../../utils/hardText/formComponents";

// Mocking the SVG components since they are not relevant for logic tests
jest.mock("./svgs/UploadButtonFolderSvg", () => () => <div>Folder Icon</div>);
jest.mock("./svgs/UploadButtonSvg1", () => () => <div>Upload Icon</div>);

describe("UploadButton Component", () => {
  const mockOnFileUpload = jest.fn();

  const renderComponent = () =>
    render(<UploadButton onFileUpload={mockOnFileUpload} />);

  beforeEach(() => {
    mockOnFileUpload.mockClear();
  });

  test("renders the upload button with initial texts", () => {
    renderComponent();

    // Check if the button text is rendered correctly
    expect(screen.getByText(UploadButtonTexts.uploadDocument)).toBeInTheDocument();
    expect(screen.getByText(UploadButtonTexts.noDocumentsAdded)).toBeInTheDocument();
  });

  // test("should open the file input dialog when the button is clicked", () => {
  //   renderComponent();

  //   // Simulate button click
  //   const button = screen.getByRole("button", {
  //     name: UploadButtonTexts.uploadDocument,
  //   });
  //   fireEvent.click(button);

  //   // Check if the file input is present
  //   const fileInput = screen.getByTestId("file-input");
  //   expect(fileInput).toBeInTheDocument();
  // });

  test("calls onFileUpload when a file is selected", () => {
    renderComponent();

    // Get the hidden file input
    const fileInput = screen.getByTestId("file-input");

    // Create a mock file and simulate a file selection
    const file = new File(["test"], "test.pdf", { type: "application/pdf" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Expect the onFileUpload callback to have been called with the selected file
    expect(mockOnFileUpload).toHaveBeenCalledWith(file);
  });

  test("updates the state when a file is selected", () => {
    renderComponent();

    // Get the file input
    const fileInput = screen.getByTestId("file-input");

    // Initially, the button should have the "no-file" class
    const button = screen.getByRole("button");
    expect(button).toHaveClass("no-file");

    // Create a mock file and simulate a file selection
    const file = new File(["test"], "test.pdf", { type: "application/pdf" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // After selecting a file, the button should have the "file-selected" class
    expect(button).toHaveClass("file-selected");
  });

  test("does not call onFileUpload when no file is selected", () => {
    renderComponent();

    // Get the file input
    const fileInput = screen.getByTestId("file-input");

    // Simulate a change event with no files selected
    fireEvent.change(fileInput, { target: { files: [] } });

    // Expect the onFileUpload callback not to be called
    expect(mockOnFileUpload).not.toHaveBeenCalled();
  });
});
