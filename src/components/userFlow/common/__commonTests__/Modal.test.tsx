import { render, screen, fireEvent } from "@testing-library/react";
import ModelDiv from "../Modal";
import React from "react";

describe("ModelDiv", () => {
  test("renders the component", () => {
    render(<ModelDiv />);
    const component = screen.getByText(/Lorem ipsum/i);
    expect(component).toBeInTheDocument();
  });

  test("opens the modal when the button is clicked", () => {
    render(<ModelDiv />);
    const openButton = screen.getByText("Open Modal");
    fireEvent.click(openButton);
    const modal = screen.getByText("Model Div"); // Use getByText here
    expect(modal).toBeInTheDocument();
  });

  test("closes the modal when the close button is clicked", () => {
    render(<ModelDiv />);
    const openButton = screen.getByText("Open Modal");
    fireEvent.click(openButton); // Open the modal

    const closeButton = screen.getByAltText("icon");
    fireEvent.click(closeButton); // Close the modal

    const modal = screen.queryByText("Model Div");
    expect(modal).not.toBeInTheDocument();
  });
});
