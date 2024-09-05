import { render } from "@testing-library/react";
import AboutBudsHeadingComp from "../AboutBudsHeadingComp";
import React from "react";

describe("AboutBudsHeadingComp", () => {
    it("renders without error", () => {
        render(<AboutBudsHeadingComp />);
    });

    it("renders the heading text correctly", () => {
        const { getByText } = render(<AboutBudsHeadingComp />);
        const homePageData = {
            homePageData: {
              aboutBudsHeadingComp: [
                { text: "Your heading text here" },
                { text: "Your paragraph text here" },
              ],
            },
        };
        const headingText = getByText(homePageData.homePageData.aboutBudsHeadingComp[0].text);
        expect(headingText).toBeInTheDocument();
    });

    it("renders the paragraph text correctly", () => {
        const { getByText } = render(<AboutBudsHeadingComp />);
        const homePageData = {
            homePageData: {
              aboutBudsHeadingComp: [
                { text: "Your heading text here" },
                { text: "Your paragraph text here" },
              ],
            },
        };
        const paragraphText = getByText(homePageData.homePageData.aboutBudsHeadingComp[1].text);
        expect(paragraphText).toBeInTheDocument();
    });

    it("renders the items correctly", () => {
        const { getAllByAltText, getAllByText } = render(<AboutBudsHeadingComp />);
        const homePageData = {
            homePageData: {
              aboutBudsHeadingComp1: [
                { text: "Your item text here", icon: "Your icon here" },
                // Add more items as needed
              ],
            },
        };
        const items = homePageData?.homePageData?.aboutBudsHeadingComp1;
        items.forEach((item, idx) => {
            const itemImage = getAllByAltText("icon")[idx];
            const itemText = getAllByText(item.text)[idx];
            expect(itemImage).toBeInTheDocument();
            expect(itemText).toBeInTheDocument();
        });
    });
});
