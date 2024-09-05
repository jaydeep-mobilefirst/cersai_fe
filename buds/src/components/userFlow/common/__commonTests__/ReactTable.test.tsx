import React from "react";
import { render } from "@testing-library/react";
import ReactTable from "../ReactTable";

describe("ReactTable", () => {
    const columns = [
        { id: "1", header: "Header 1", cell: "Cell 1", footer: "Footer 1" },
        { id: "2", header: "Header 2", cell: "Cell 2", footer: "Footer 2" },
    ];

    const defaultData = [
        { id: "1", data: "Data 1" },
        { id: "2", data: "Data 2" },
    ];

    it("renders table with correct headers and data", () => {
        const { getByText } = render(
            <ReactTable columns={columns} defaultData={defaultData} />
        );

        expect(getByText("Header 1")).toBeInTheDocument();
        expect(getByText("Header 2")).toBeInTheDocument();
        expect(getByText("Cell 1")).toBeInTheDocument();
        expect(getByText("Cell 2")).toBeInTheDocument();
    });

    it("renders table with correct footer", () => {
        const { getByText } = render(
            <ReactTable columns={columns} defaultData={defaultData} />
        );

        expect(getByText("Footer 1")).toBeInTheDocument();
        expect(getByText("Footer 2")).toBeInTheDocument();
    });

    it("applies border-b class when borderB prop is true", () => {
        const { getByTestId } = render(
            <ReactTable columns={columns} defaultData={defaultData} borderB={true} />
        );

        const tableBody = getByTestId("table-body");
        const tableRows = tableBody.getElementsByTagName("tr");

        for (let i = 0; i < tableRows.length; i++) {
            const tableRow = tableRows[i];
            expect(tableRow.classList.contains("border-b")).toBe(true);
        }
    });

    it("does not apply border-b class when borderB prop is false", () => {
        const { getByTestId } = render(
            <ReactTable columns={columns} defaultData={defaultData} borderB={false} />
        );

        const tableBody = getByTestId("table-body");
        const tableRows = tableBody.getElementsByTagName("tr");

        for (let i = 0; i < tableRows.length; i++) {
            const tableRow = tableRows[i];
            expect(tableRow.classList.contains("border-b")).toBe(false);
        }
    });
});
