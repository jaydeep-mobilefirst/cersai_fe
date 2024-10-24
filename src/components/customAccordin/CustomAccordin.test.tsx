import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Accordion from "./CustomAccordin"
import "@testing-library/jest-dom";

const mockItems = [
  { header: "Header 1", content: "Content 1" },
  { header: "Header 2", content: "Content 2", hasError: true },
  { header: "Header 3", content: "Content 3" },
];


describe("Accordion", () => {
  it("renders all accordion headers", () => {
    render(<Accordion items={mockItems} />);

    expect(screen.getByText("Header 1")).toBeInTheDocument();
    expect(screen.getByText("Header 2")).toBeInTheDocument();
    expect(screen.getByText("Header 3")).toBeInTheDocument();
  });


  

  
  it("renders the Edit button when `showEdit` is true", () => {
    render(<Accordion items={mockItems} showEdit={true} />);
    expect(screen.getAllByText("Edit")).toHaveLength(mockItems.length);
  });

  it("does not render the Edit button when `showEdit` is false", () => {
    render(<Accordion items={mockItems} showEdit={false} />);
    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

 

  it("resets activeIndex when `showAccordion` is true", () => {
    const { rerender } = render(
      <Accordion items={mockItems} showAccordion={false} />
    );

    // Initially, the first item should be open
    expect(screen.queryByText("Content 1")).toBeInTheDocument();

    rerender(<Accordion items={mockItems} showAccordion={true} />);

    // When showAccordion is true, the activeIndex should be reset
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
  });
});
