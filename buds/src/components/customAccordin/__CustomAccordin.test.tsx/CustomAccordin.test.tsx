import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Accordion from "../CustomAccordin";

describe("Accordion", () => {
    const items = [
        {
            header: "Header 1",
            content: "Content 1",
        },
        {
            header: "Header 2",
            content: "Content 2",
        },
    ];

    it("renders the accordion items correctly", () => {
        const { getByText } = render(<Accordion items={items} />);
        expect(getByText("Header 1")).toBeInTheDocument();
        expect(getByText("Header 2")).toBeInTheDocument();
    });

    it("toggles the accordion item when clicked", () => {
        const { getByText } = render(<Accordion items={items} />);
        const header1 = getByText("Header 1");
        const header2 = getByText("Header 2");

        fireEvent.click(header1);
        expect(getByText("Content 1")).toBeInTheDocument();

        fireEvent.click(header2);
        expect(getByText("Content 2")).toBeInTheDocument();

        fireEvent.click(header1);
        expect(getByText("Content 1")).not.toBeInTheDocument();
    });

    it("shows the edit button when showEdit prop is true", () => {
        const { getByText } = render(<Accordion items={items} showEdit={true} />);
        const editButton = getByText("Edit");
        expect(editButton).toBeInTheDocument();
    });

    it("calls handleEditClick when edit button is clicked", () => {
        const handleEditClick = jest.fn();
        const { getByText } = render(
            <Accordion
                items={items}
                showEdit={true}
                handleEditClick={handleEditClick}
            />
        );
        const editButton = getByText("Edit");
        fireEvent.click(editButton);
        expect(handleEditClick).toHaveBeenCalled();
    });
});
