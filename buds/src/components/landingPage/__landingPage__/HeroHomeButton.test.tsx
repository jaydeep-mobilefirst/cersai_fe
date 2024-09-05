import React from "react";
import { render, screen } from "@testing-library/react";
import HeroHome from "../HeroHome";

describe("HeroHome", () => {
    test("renders HeroHome component", () => {
        render(<HeroHome />);
        // Add your assertions here
    });

    test("renders text from homePageData", () => {
        // Mock the useLandingStore hook
        jest.mock("../../zust/useLandingStore", () => ({
            useLandingStore: jest.fn(() => ({
                homePageData: {
                    homePageData: {
                        hero: [
                            { text: "Text 1" },
                            { text: "Text 2" },
                            { text: "Text 3" },
                            { text: "Text 4" },
                        ],
                    },
                },
            })),
        }));

        render(<HeroHome />);
        // Add your assertions here
    });

    // Add more test cases as needed
});
