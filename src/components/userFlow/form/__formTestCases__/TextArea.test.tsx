import React from "react";
import { render, screen } from "@testing-library/react";
import TextArea from "../TextArea";

describe("TextArea Component", () => {
  it("renders the textarea with default background color", () => {
    render(<TextArea placeholder="Enter text" />);
    
    const textareaElement = screen.getByPlaceholderText("Enter text");
    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement).toHaveStyle("background-color: white");
  });

  it("renders the textarea with custom background color", () => {
    render(<TextArea placeholder="Enter text" backgroundColor="lightblue" />);
    
    const textareaElement = screen.getByPlaceholderText("Enter text");
    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement).toHaveStyle("background-color: lightblue");
  });

  it("renders the textarea as disabled", () => {
    render(<TextArea placeholder="Enter text" disabled />);
    
    const textareaElement = screen.getByPlaceholderText("Enter text");
    expect(textareaElement).toBeDisabled();
    expect(textareaElement).toHaveStyle("background-color: #E5E4E2");
  });

  it("renders additional class names", () => {
    render(
      <TextArea placeholder="Enter text" className="custom-class" />
    );
    
    const textareaElement = screen.getByPlaceholderText("Enter text");
    expect(textareaElement).toHaveClass("custom-class");
  });

 
});
