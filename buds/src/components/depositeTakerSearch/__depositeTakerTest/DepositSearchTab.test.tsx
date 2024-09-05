import React from "react";
import { render } from "@testing-library/react";
import DepositeSearchTab from "../DepositeSearchTab";

test("renders DepositeSearchTab component", () => {
    const props = {
        text: "Sample Text",
        value: "Sample Value",
        bgColor: true,
    };

    const { getByText } = render(<DepositeSearchTab {...props} />);

    const textElement = getByText(props.text);
    const valueElement = getByText(props.value);

    expect(textElement).toBeInTheDocument();
    expect(valueElement).toBeInTheDocument();
});
