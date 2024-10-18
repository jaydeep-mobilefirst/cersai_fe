import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProfileUploadDocument from "../ProfileUploadDocument";

// Mock the image imports
jest.mock("../../../assets/images/trash.svg", () => "trash-icon");
jest.mock("../../../assets/images/folder-open-light.svg", () => "folder-icon");
jest.mock("./svgs/UploadButtonSvg1", () => () => <svg data-testid="upload-icon" />);

describe("ProfileUploadDocument Component", () => {
  const mockOnFileUpload = jest.fn();
  const mockDeleteFile = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the button with default text 'Upload Document' when no file is selected", () => {
    render(<ProfileUploadDocument onFileUpload={mockOnFileUpload} />);

    expect(screen.getByText("Upload Document")).toBeInTheDocument();
    expect(screen.getByTestId("upload-icon")).toBeInTheDocument();
  });

  test("renders the correct document name", () => {
    render(<ProfileUploadDocument documentName="Test Document" onFileUpload={mockOnFileUpload} />);

    expect(screen.getByText("Test Document")).toBeInTheDocument();
  });

  test("renders the required asterisk if required is true", () => {
    render(<ProfileUploadDocument documentName="Test Document" required={true} onFileUpload={mockOnFileUpload} />);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  test("renders the folder icon correctly", () => {
    render(<ProfileUploadDocument onFileUpload={mockOnFileUpload} />);

    const folderIcon = screen.getByAltText("Error");
    expect(folderIcon).toBeInTheDocument();
    expect(folderIcon).toHaveAttribute("src", "folder-icon");
  });

  test("renders the file name when a file is selected", () => {
    render(
      <ProfileUploadDocument
        documentName="Test Document"
        fileName="test-file.pdf"
        onFileUpload={mockOnFileUpload}
      />
    );

    expect(screen.getByText("test-file.pdf")).toBeInTheDocument();
  });

  test("renders the delete button when a file is selected", () => {
    render(
      <ProfileUploadDocument
        documentName="Test Document"
        fileName="test-file.pdf"
        onFileUpload={mockOnFileUpload}
        deleteFile={mockDeleteFile}
      />
    );

    const deleteIcon = screen.getByRole("button", { name: /trash/i });
    expect(deleteIcon).toBeInTheDocument();
  });

  test("calls deleteFile function when the delete button is clicked", () => {
    render(
      <ProfileUploadDocument
        documentName="Test Document"
        fileName="test-file.pdf"
        onFileUpload={mockOnFileUpload}
        deleteFile={mockDeleteFile}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /trash/i });
    fireEvent.click(deleteButton);

    expect(mockDeleteFile).toHaveBeenCalledTimes(1);
  });

  test("renders the 'View' button when a file is selected", () => {
    render(
      <ProfileUploadDocument
        documentName="Test Document"
        fileName="test-file.pdf"
        onFileUpload={mockOnFileUpload}
      />
    );

    const viewButton = screen.getByText("View");
    expect(viewButton).toBeInTheDocument();
  });

  test("renders the upload button when no file is selected", () => {
    render(<ProfileUploadDocument onFileUpload={mockOnFileUpload} />);

    const uploadButton = screen.getByTestId("upload-icon");
    expect(uploadButton).toBeInTheDocument();
  });
});
