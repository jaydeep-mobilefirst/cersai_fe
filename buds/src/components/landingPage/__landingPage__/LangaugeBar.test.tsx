import React from "react";
import { render } from "@testing-library/react";
import LanguageBar from "../LanguageBar";

test("renders LanguageBar component", () => {
    render(<LanguageBar />);
});

test("displays language label", () => {
    const { getByText } = render(<LanguageBar />);
    const languageLabel = getByText("Your Language Label"); // Replace "Your Language Label" with the actual label text
    expect(languageLabel).toBeInTheDocument();
});

test("displays language names", () => {
    const { getByText } = render(<LanguageBar />);
    const languageName1 = getByText("Language Name 1"); // Replace "Language Name 1" with the actual language name
    const languageName2 = getByText("Language Name 2"); // Replace "Language Name 2" with the actual language name
    // Add more assertions for other language names if needed
    expect(languageName1).toBeInTheDocument();
    expect(languageName2).toBeInTheDocument();
});

