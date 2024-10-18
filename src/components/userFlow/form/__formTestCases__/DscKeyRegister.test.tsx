import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DscKeyRegister from "../DscKeyRegister";

// Mock the image imports
jest.mock("../../../assets/images/new_images/uploadFile-2.png", () => "uploadFolderIcon");
jest.mock("../../../assets/images/UploadIcon.png", () => "uploadIcon");

describe("DscKeyRegister Component", () => {
  const mockSetDscSelected = jest.fn();
  const mockSetDscCertificate = jest.fn();
  const mockOnFileUpload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the DscKeyRegister component with default text 'Upload DSC Certificate' when no DSC is selected", () => {
    render(
      <DscKeyRegister
        setDscSelected={mockSetDscSelected}
        setDscCertificate={mockSetDscCertificate}
        isDscSelected={false}
        disable={false}
      />
    );
    expect(screen.getByText("Upload DSC Certificate")).toBeInTheDocument();
  });

  test("displays the certName when DSC is selected", () => {
    render(
      <DscKeyRegister
        setDscSelected={mockSetDscSelected}
        setDscCertificate={mockSetDscCertificate}
        isDscSelected={true}
        fieldData={{ userInput: { SelCertSubject: "CN=John Doe,OU=Org,O=Company" } }}
      />
    );
    expect(screen.getByText("CN=John Doe")).toBeInTheDocument();
  });

  test("renders the upload folder icon and button icon", () => {
    render(
      <DscKeyRegister
        setDscSelected={mockSetDscSelected}
        setDscCertificate={mockSetDscCertificate}
      />
    );
    const folderIcon = screen.getByAltText("UploadButtonFolderSvg");
    const buttonIcon = screen.getByAltText("UploadButtonSvg1");
    expect(folderIcon).toBeInTheDocument();
    expect(buttonIcon).toBeInTheDocument();
  });

  test("button is disabled when the disable prop is true", () => {
    render(
      <DscKeyRegister
        setDscSelected={mockSetDscSelected}
        setDscCertificate={mockSetDscCertificate}
        disable={true}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  test("button is enabled when the disable prop is false", () => {
    render(
      <DscKeyRegister
        setDscSelected={mockSetDscSelected}
        setDscCertificate={mockSetDscCertificate}
        disable={false}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toBeEnabled();
  });

  test("displays the fieldData certificate name when available", () => {
    render(
      <DscKeyRegister
        fieldData={{ userInput: { SelCertSubject: "CN=Jane Smith,OU=Org,O=Company" } }}
      />
    );
    expect(screen.getByText("CN=Jane Smith")).toBeInTheDocument();
  });

  test("displays the correct background color for the button when DSC is selected", () => {
    render(
      <DscKeyRegister
        isDscSelected={true}
        setDscSelected={mockSetDscSelected}
        setDscCertificate={mockSetDscCertificate}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-[#1c468e]");
  });

  test("renders the modal with correct text when modal is open", () => {
    render(
      <DscKeyRegister
        setDscSelected={mockSetDscSelected}
        setDscCertificate={mockSetDscCertificate}
      />
    );
    // Manually open the modal by clicking the button (as modal opens based on SignerDigital state)
    fireEvent.click(screen.getByRole("button"));

    expect(
      screen.getByText(
        "You need to install the SignerDigital browser extension to register with a USB token."
      )
    ).toBeInTheDocument();
  });
});
