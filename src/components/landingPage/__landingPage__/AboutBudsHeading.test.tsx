import React from "react";
import { render, screen } from "@testing-library/react";
import AboutBudsHeadingComp from "../AboutBudsHeadingComp";

describe("AboutBudsHeadingComp", () => {
    it("renders without error", () => {
        render(<AboutBudsHeadingComp />);
    });

    // it("renders the heading text correctly", () => {
    //     render(<AboutBudsHeadingComp />);
    //     const headingText = screen.getByText(/Your heading text here/i); // Using a case-insensitive match
    //     expect(headingText).toBeInTheDocument();
    // });

    // it("renders the paragraph text correctly", () => {
    //     render(<AboutBudsHeadingComp />);
    //     const paragraphText = screen.getByText(/Your paragraph text here/i, { exact: false }); // Flexible matching
    //     expect(paragraphText).toBeInTheDocument();
    // });

    it("renders the items correctly", () => {
        render(<AboutBudsHeadingComp />);
        const items = [
            { text: "Your item text here", icon: "Your icon here" },
            // Add more items as needed
        ];

        items.forEach((item) => {
            const itemImage = screen.findByAltText(/icon/i); // Adjust this if the alt text is different
           
           
           
        });
    });
});
