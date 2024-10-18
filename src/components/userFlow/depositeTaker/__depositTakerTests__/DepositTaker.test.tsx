import React from "react";
import { render, screen } from "@testing-library/react"; // Import screen
import DepositeTaker from "../DepositeTaker";
import SignUpSideBar from "../SignUpSideBar";


describe("DepositeTaker", () => {
    it("renders SignUpSideBar and NodalDetails components", () => {
        render(<DepositeTaker />);
        expect(screen.getByTestId("sign-up-sidebar")).toBeInTheDocument();
        expect(screen.getByTestId("nodal-details")).toBeInTheDocument();
    });
});