import { render, screen } from "@testing-library/react";
import HeadComp from "../HeadComp";
import React from "react";

test("renders logo image", () => {
    render(<HeadComp />);
    const logoImage = screen.getByAltText("logo");
    expect(logoImage).toBeInTheDocument();
});
