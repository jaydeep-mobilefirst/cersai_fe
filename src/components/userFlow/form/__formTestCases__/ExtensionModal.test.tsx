import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ExtensionModal from "../ExtensionModal";

describe("ExtensionModal Component", () => {
  const mockHandleClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the modal when open is true", () => {
    render(
      <ExtensionModal open={true} handleClose={mockHandleClose} title="Test Modal">
        <p>Test content inside the modal</p>
      </ExtensionModal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Test content inside the modal")).toBeInTheDocument();
    expect(screen.getByText("Please install the SignerDigital browser extension using")).toBeInTheDocument();
    expect(screen.getByText("this link.")).toBeInTheDocument();
  });

  test("does not render the modal when open is false", () => {
    const { queryByText } = render(
      <ExtensionModal open={false} handleClose={mockHandleClose} title="Test Modal">
        <p>Test content inside the modal</p>
      </ExtensionModal>
    );

    expect(queryByText("Test Modal")).toBeNull();
    expect(queryByText("Test content inside the modal")).toBeNull();
  });

  test("renders the close button and triggers handleClose when clicked", () => {
    render(
      <ExtensionModal open={true} handleClose={mockHandleClose} title="Test Modal">
        <p>Test content inside the modal</p>
      </ExtensionModal>
    );

    const closeButton = screen.getByText("Close");
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test("renders the 'x' close icon and triggers handleClose when clicked", () => {
    render(
      <ExtensionModal open={true} handleClose={mockHandleClose} title="Test Modal">
        <p>Test content inside the modal</p>
      </ExtensionModal>
    );

    const closeIcon = screen.getByText("×");
    expect(closeIcon).toBeInTheDocument();

    fireEvent.click(closeIcon);
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  test("renders the SignerDigital extension link correctly", () => {
    render(
      <ExtensionModal open={true} handleClose={mockHandleClose} title="Test Modal">
        <p>Test content inside the modal</p>
      </ExtensionModal>
    );

    const link = screen.getByText("this link.");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://web.signer.digital/GetStarted");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
