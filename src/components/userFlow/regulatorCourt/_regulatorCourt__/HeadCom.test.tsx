import { render, screen, fireEvent } from "@testing-library/react";
import HeadComp from "../HeadCom";
import React from "react";

describe("HeadComp Component", () => {
  const mockToggleMenu = jest.fn();

  test("renders the HeadComp and UI elements correctly", () => {
    render(<HeadComp />);

    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /logo/i })).toHaveAttribute("src", expect.stringContaining("logo.svg"));
  });

  test("displays the logo image correctly", () => {
    render(<HeadComp />);

    const logoImage = screen.getByAltText("logo");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveClass("rounded-full");
    expect(logoImage).toHaveClass("h-[52px]"); // Check if it has the correct height
    expect(logoImage).toHaveClass("w-[52px]"); // Check if it has the correct width
  });

  test("displays the close menu icon when the menu is open", () => {
    render(<HeadComp isMenuOpen={true} toggleMenu={mockToggleMenu} />);

    const closeIcon = screen.getByAltText("Close Menu");
    expect(closeIcon).toBeInTheDocument();
  });

  

  test("triggers the toggleMenu function when the close menu icon is clicked", () => {
    render(<HeadComp isMenuOpen={true} toggleMenu={mockToggleMenu} />);

    const closeIcon = screen.getByAltText("Close Menu");
    fireEvent.click(closeIcon);

    expect(mockToggleMenu).toHaveBeenCalledTimes(1);
  });
});
