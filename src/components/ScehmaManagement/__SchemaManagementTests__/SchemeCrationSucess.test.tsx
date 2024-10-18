import { render, screen, fireEvent } from "@testing-library/react";
import SchemeCreationSuccess from "../SchemeCrationSucess";
import React from "react";

describe("SchemeCreationSuccess Component", () => {
  const mockClosePopup = jest.fn();
  const mockSuccessPopup = jest.fn();

  beforeEach(() => {
    render(
      <SchemeCreationSuccess
        closePopup={mockClosePopup}
        SuccessPopup={mockSuccessPopup}
      />
    );
  });

  test("renders the modal with the correct text and elements", () => {
    const heading = screen.getByText("Scheme Creation Successful");
    const successMessage = screen.getByText(
      /Success! Your scheme creation is complete./i
    );
    const okButton = screen.getByText("Okay");

    expect(heading).toBeInTheDocument();
    expect(successMessage).toBeInTheDocument();
    expect(okButton).toBeInTheDocument();
  });

  test("renders the close button with the 'add' image", () => {
    const closeButton = screen.getByAltText("cross");

    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass("cursor-pointer");
  });

  test("calls closePopup when the close button is clicked", () => {
    const closeButton = screen.getByAltText("cross");

    fireEvent.click(closeButton);
    expect(mockClosePopup).toHaveBeenCalled();
  });

  test("calls SuccessPopup when the 'Okay' button is clicked", () => {
    const okButton = screen.getByText("Okay");

    fireEvent.click(okButton);
    expect(mockSuccessPopup).toHaveBeenCalled();
  });

  test("renders the success tick icon", () => {
    const tickIcon = screen.getByAltText("TickIcon");

    expect(tickIcon).toBeInTheDocument();
    expect(tickIcon).toHaveClass("h-[52px] w-[52px]");
  });

  test("renders with correct modal styles", () => {
    const modal = screen.getByRole("presentation");

    expect(modal).toHaveStyle("display: flex");
    expect(modal).toHaveStyle("align-items: center");
    expect(modal).toHaveStyle("justify-content: center");
  });

  test("renders the hr element for visual separation", () => {
    const hrElement = screen.getByRole("separator");

    expect(hrElement).toBeInTheDocument();
  });

  test("renders the button with correct styling", () => {
    const okButton = screen.getByText("Okay");

    expect(okButton).toHaveClass(
      "bg-[#1C468E] rounded-xl w-[45%] md:w-[224px] px-4 md:px-10 py-3 text-white font-semibold text-sm transition-colors duration-200"
    );
  });
});
