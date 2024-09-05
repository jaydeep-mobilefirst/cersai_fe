import React from "react";
import { render } from "@testing-library/react";
import SignUpSideBar from "../SignUpSideBar";

describe("SignUpSideBar", () => {
    it("renders without error", () => {
        render(<SignUpSideBar />);
    });
});
