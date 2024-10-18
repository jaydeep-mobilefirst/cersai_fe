import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DscKeyLogin from "../DscKeyLogin";

// Mock the image imports
jest.mock("../../../assets/images/new_images/uploadFile-2.png", () => "uploadFolderIcon");
jest.mock("../../../assets/images/UploadIcon.png", () => "uploadIcon");

describe("DscKeyLogin Component", () => {
  const mockSetDscSelected = jest.fn();
  const mockSetDscCertificate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the DscKeyLogin component with 'DSC Certificate' text when not selected", () => {
    render(
      <DscKeyLogin
        setDscSelected={mockSetDscSelected}
        setDscCertificate={mockSetDscCertificate}
        isDscSelected={false}
      />
    );
    expect(screen.getByText("DSC Certificate")).toBeInTheDocument();
  });

  test("displays certificate name when DSC is selected", () => {
    render(
      <DscKeyLogin
        setDscSelected={mockSetDscSelected}
        setDscCertificate={mockSetDscCertificate}
        isDscSelected={true}
        dsc3UserInput='{"SelCertSubject":"CN=John Doe,OU=Org,O=Company"}'
      />
    );
    // Test expects "CN=John Doe" part of certificate name to be shown
    expect(screen.getByText("CN=John Doe")).toBeInTheDocument();
  });

  test("renders the upload folder icon and button icon", () => {
    render(
      <DscKeyLogin
        setDscSelected={mockSetDscSelected}
        setDscCertificate={mockSetDscCertificate}
      />
    );
    const folderIcon = screen.getByAltText("UploadButtonFolderSvg");
    const buttonIcon = screen.getByAltText("UploadButtonSvg1");
    expect(folderIcon).toBeInTheDocument();
    expect(buttonIcon).toBeInTheDocument();
  });

  test("renders a button with the correct styling when DSC is not selected", () => {
    render(
      <DscKeyLogin
        setDscSelected={mockSetDscSelected}
        setDscCertificate={mockSetDscCertificate}
        isDscSelected={false}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-[#1c468e]");
  });

  test("renders a button with the correct styling when DSC is selected", () => {
    render(
      <DscKeyLogin
        setDscSelected={mockSetDscSelected}
        setDscCertificate={mockSetDscCertificate}
        isDscSelected={true}
      />
    );
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-[#1c468e]");
  });

  test("displays the modal with the correct text when isModalOpen is true", () => {
    render(
      <DscKeyLogin
        setDscSelected={mockSetDscSelected}
        setDscCertificate={mockSetDscCertificate}
      />
    );
    
    const extensionModal = screen.getByText(
      "You need to install the SignerDigital browser extension to register with a USB token."
    );
    expect(extensionModal).toBeInTheDocument();
  });
});
