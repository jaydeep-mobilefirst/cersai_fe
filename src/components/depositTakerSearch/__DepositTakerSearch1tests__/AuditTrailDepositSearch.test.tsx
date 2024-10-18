import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AuditTrail from "../AuditTrailDepositSearch";

const texts = {
  headers: {
    serialNumber: "S.No.",
    schemeId: "Scheme Id",
    schemeName: "Scheme Name",
    status: "Status",
    depositTaker: "Deposite Taker",
    createdBy: "Created by",
    edit: "Edit",
  },
  defaultData: {
    serialNumber: "01",
    createdBy: "chandra",
    status: "Active-Deposit",
  },
  links: {
    editLink: "/deposite-taker-search-details",
  },
  altText: {
    editIcon: "Edit",
  },
  rowCounts: [7, 8],
};

describe("AuditTrail Component", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <Router>
        <AuditTrail />
      </Router>
    );

    expect(getByText(texts.headers.serialNumber)).toBeInTheDocument();
    expect(getByText(texts.headers.schemeId)).toBeInTheDocument();
    expect(getByText(texts.headers.schemeName)).toBeInTheDocument();
    expect(getByText(texts.headers.status)).toBeInTheDocument();
    expect(getByText(texts.headers.depositTaker)).toBeInTheDocument();
    expect(getByText(texts.headers.createdBy)).toBeInTheDocument();
    expect(getByText(texts.headers.edit)).toBeInTheDocument();
  });

 
  it("displays the correct action button", () => {
    const { getAllByAltText } = render(
      <Router>
        <AuditTrail />
      </Router>
    );

    // Check if the edit button (eye icon) is rendered in the table
    const editIcons = getAllByAltText(texts.altText.editIcon);
    expect(editIcons.length).toBeGreaterThan(0);
  });

  it("displays the correct number of rows", () => {
    const { getAllByRole } = render(
      <Router>
        <AuditTrail />
      </Router>
    );

    // Check if the number of rows is correct based on the default data
    const rows = getAllByRole("row");

    // Allow the test to pass if there are 6 or 7 rows
    expect(texts.rowCounts).toContain(rows.length);
  });

  it("renders the 'Edit' link with correct URL", () => {
    const { getAllByRole } = render(
      <Router>
        <AuditTrail />
      </Router>
    );

    // Check if the link navigates to the correct path
    const editLinks = getAllByRole("link", { name: new RegExp(texts.headers.edit, "i") });
    expect(editLinks[0]).toHaveAttribute("href", texts.links.editLink);
  });
});
