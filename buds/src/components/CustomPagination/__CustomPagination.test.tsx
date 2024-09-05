import { render, fireEvent } from "@testing-library/react";
import CustomPagination from "./CustomPagination";
import React from "react";

describe("CustomPagination", () => {
    test("renders correctly", () => {
        const { getByText } = render(
            <CustomPagination
                totalItems={100}
                itemsPerPage={10}
                maxPageNumbersToShow={5}
            />
        );

        expect(getByText("Showing data")).toBeInTheDocument();
        expect(getByText("Previous")).toBeInTheDocument();
        expect(getByText("Next")).toBeInTheDocument();
    });

    test("disables previous button on first page", () => {
        const { getByText } = render(
            <CustomPagination
                totalItems={100}
                itemsPerPage={10}
                maxPageNumbersToShow={5}
                currentPage={1}
            />
        );

        const previousButton = getByText("Previous");
        expect(previousButton).toBeDisabled();
    });

    test("disables next button on last page", () => {
        const { getByText } = render(
            <CustomPagination
                totalItems={100}
                itemsPerPage={10}
                maxPageNumbersToShow={5}
                currentPage={10}
            />
        );

        const nextButton = getByText("Next");
        expect(nextButton).toBeDisabled();
    });

    test("calls setCurrentPage when page number is clicked", () => {
        const setCurrentPage = jest.fn();
        const { getByText } = render(
            <CustomPagination
                totalItems={100}
                itemsPerPage={10}
                maxPageNumbersToShow={5}
                currentPage={5}
                setCurrentPage={setCurrentPage}
            />
        );

        const pageButton = getByText("3");
        fireEvent.click(pageButton);

        expect(setCurrentPage).toHaveBeenCalledWith(3);
    });
});
