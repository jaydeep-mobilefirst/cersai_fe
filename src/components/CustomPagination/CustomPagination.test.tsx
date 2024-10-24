import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomPagination from "./CustomPagination";
import "@testing-library/jest-dom";

describe("CustomPagination", () => {
  const mockSetCurrentPage = jest.fn();

  beforeEach(() => {
    mockSetCurrentPage.mockClear();
  });

  it("renders pagination text correctly", () => {
    render(
      <CustomPagination
        totalItems={100}
        itemsPerPage={10}
        maxPageNumbersToShow={5}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    expect(screen.getByText("Showing data 1 of 10")).toBeInTheDocument();
  });

  it("renders the correct number of page buttons", () => {
    render(
      <CustomPagination
        totalItems={100}
        itemsPerPage={10}
        maxPageNumbersToShow={5}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    expect(screen.getAllByRole("button")).toHaveLength(6); // Previous, 1, 2, Next
  });

  it("disables the 'Previous' button on the first page", () => {
    render(
      <CustomPagination
        totalItems={100}
        itemsPerPage={10}
        maxPageNumbersToShow={5}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
  });

  it("disables the 'Next' button on the last page", () => {
    render(
      <CustomPagination
        totalItems={50}
        itemsPerPage={10}
        maxPageNumbersToShow={5}
        currentPage={5}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("calls setCurrentPage when a page number is clicked", () => {
    render(
      <CustomPagination
        totalItems={100}
        itemsPerPage={10}
        maxPageNumbersToShow={5}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    const page2Button = screen.getByText("2");
    fireEvent.click(page2Button);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it("calls setCurrentPage when 'Next' is clicked", () => {
    render(
      <CustomPagination
        totalItems={100}
        itemsPerPage={10}
        maxPageNumbersToShow={5}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(2);
  });

  it("calls setCurrentPage when 'Previous' is clicked", () => {
    render(
      <CustomPagination
        totalItems={100}
        itemsPerPage={10}
        maxPageNumbersToShow={5}
        currentPage={2}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(1);
  });

  it("renders ellipsis when there are many pages", () => {
    render(
      <CustomPagination
        totalItems={200}
        itemsPerPage={10}
        maxPageNumbersToShow={5}
        currentPage={10}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    expect(screen.getAllByText("...")).toHaveLength(2);
  });

  it("does not render ellipsis when pages are few", () => {
    render(
      <CustomPagination
        totalItems={30}
        itemsPerPage={10}
        maxPageNumbersToShow={5}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
      />
    );

    expect(screen.queryByText("...")).not.toBeInTheDocument();
  });
});
