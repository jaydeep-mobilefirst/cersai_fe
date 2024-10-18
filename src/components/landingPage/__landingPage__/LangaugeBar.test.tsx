import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LanguageBar from "../LanguageBar";

const texts = {
  languageLabel: "Language Label", // Adjust this to match the actual label text from your homePageData
  english: "English",
  hindi: "हिंदी",
  kashmiri: "کٲشُر",
  urdu: "اردو",
  activeClass: "bg-[#0B2551] text-white p-2", // The class for the active language button
};

test("renders LanguageBar component", () => {
  render(<LanguageBar />);
});



test("displays language names", () => {
  const { getByText } = render(<LanguageBar />);
  const languageName1 = getByText(new RegExp(texts.english, "i"));
  const languageName2 = getByText(new RegExp(texts.hindi, "i"));
  const languageName3 = getByText(new RegExp(texts.kashmiri, "i"));
  const languageName4 = getByText(new RegExp(texts.urdu, "i"));

  expect(languageName1).toBeInTheDocument();
  expect(languageName2).toBeInTheDocument();
  expect(languageName3).toBeInTheDocument();
  expect(languageName4).toBeInTheDocument();
});

test("changes language when a language is clicked", () => {
  const { getByText } = render(<LanguageBar />);

  const hindiButton = getByText(new RegExp(texts.hindi, "i"));
  fireEvent.click(hindiButton);

  // Assert that the clicked language is now the active one
  expect(hindiButton).toHaveClass(texts.activeClass);

  const englishButton = getByText(new RegExp(texts.english, "i"));
  expect(englishButton).not.toHaveClass(texts.activeClass);
});
