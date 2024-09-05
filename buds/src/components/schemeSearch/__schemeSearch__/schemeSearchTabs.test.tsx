import React from "react";
import { render } from "@testing-library/react";
import SchemeSearchTab from "../schemeSearchTab";

describe("SchemeSearchTab", () => {
    it("renders correctly", () => {
        const props = {
            text: "Scheme Registered",
            value: "1000k",
            bgColor: true,
        };

        const { getByText } = render(<SchemeSearchTab {...props} />);

        expect(getByText("Scheme Registered")).toBeInTheDocument();
        expect(getByText("1000k")).toBeInTheDocument();
    });
});
