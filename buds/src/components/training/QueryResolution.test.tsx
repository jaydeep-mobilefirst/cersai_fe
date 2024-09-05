import React from "react";
import { render } from "@testing-library/react";
import QueryResolutionSessionComponent from "./QueryResolutionSessionComponent";

describe("QueryResolutionSessionComponent", () => {
    const session = {
        date: "2022-01-01",
        month: "January",
        location: "New York",
        city: "New York City",
        onlineHeading: "Join our online session",
        description: "Lorem ipsum dolor sit amet",
    };
    const buttonText = "Register";

    it("renders the component correctly", () => {
        const { getByText } = render(
            <QueryResolutionSessionComponent session={session} buttonText={buttonText} />
        );

        expect(getByText(session.date)).toBeInTheDocument();
        expect(getByText(session.month)).toBeInTheDocument();
        expect(getByText(session.location)).toBeInTheDocument();
        expect(getByText(session.city)).toBeInTheDocument();
        expect(getByText(session.onlineHeading)).toBeInTheDocument();
        expect(getByText(session.description)).toBeInTheDocument();
        expect(getByText(buttonText)).toBeInTheDocument();
    });
});

