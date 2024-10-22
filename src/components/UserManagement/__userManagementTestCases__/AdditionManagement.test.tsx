import { render, screen, fireEvent } from "@testing-library/react";
import AdditionSuccessfulModalOne from "../AdditonSuccessfulModalOne";
import React from "react";

const icon = "icon"

describe("AdditionSuccessfulModalOne", () => {
    test("renders the modal with the correct heading and paragraph", () => {
        const heading = "Test Heading";
        const paragraph = "Test Paragraph";
        const onClose = jest.fn();
        const onSave = jest.fn();
        const logo = null;

        render(
            <AdditionSuccessfulModalOne
                heading={heading}
                paragraph={paragraph}
                onClose={onClose}
                onSave={onSave}
                logo={logo}
            />
        );

        expect(screen.getByText(heading)).toBeInTheDocument();
        expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    // test("calls the onClose function when the close button is clicked", () => {
    //     const onClose = jest.fn();
    //     const onSave = jest.fn();
    //     const logo = null;

    //     render(
    //         <AdditionSuccessfulModalOne
    //             heading="Test Heading"
    //             paragraph="Test Paragraph"
    //             onClose={onClose}
    //             onSave={onSave}
    //             logo={logo}
    //         />
    //     );

    //     fireEvent.click(screen.getByAltText(/icon/i));

    //     expect(onClose).toHaveBeenCalled();
    // });

    test("calls the onSave function when the Okay button is clicked", () => {
        const onClose = jest.fn();
        const onSave = jest.fn();
        const logo = null;

        render(
            <AdditionSuccessfulModalOne
                heading="Test Heading"
                paragraph="Test Paragraph"
                onClose={onClose}
                onSave={onSave}
                logo={logo}
            />
        );

        fireEvent.click(screen.getByText("Okay"));

        expect(onSave).toHaveBeenCalled();
    });
});

