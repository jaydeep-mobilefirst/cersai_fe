import React from "react";
import { render } from "@testing-library/react";
import SignupModal from "../SignupModal";

describe("SignupModal", () => {
    it("renders the signup modal correctly", () => {
        const { getByText } = render(<SignupModal />);
        const signupModalElement = getByText("signup modal");
        expect(signupModalElement).toBeInTheDocument();
    });
});
