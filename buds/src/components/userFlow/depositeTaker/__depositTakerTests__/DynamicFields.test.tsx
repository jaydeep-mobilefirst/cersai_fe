import { render, screen } from "@testing-library/react";
import DynamicFields from "../DynamicFields";
import React from "react";

describe("DynamicFields", () => {
    test("renders input field", () => {
        render(<DynamicFields formFields={[{ typeId: 1, label: "Name" }]} />);
        const inputElement = screen.getByLabelText("Name");
        expect(inputElement).toBeInTheDocument();
    });

    test("renders textarea", () => {
        render(<DynamicFields formFields={[{ typeId: 2, label: "Description" }]} />);
        const textareaElement = screen.getByLabelText("Description");
        expect(textareaElement).toBeInTheDocument();
    });

    test("renders select button", () => {
        render(
            <DynamicFields
                formFields={[
                    {
                        typeId: 3,
                        label: "Category",
                        dropdown_options: {
                            options: [{ name: "Option 1", id: 1 }],
                        },
                    },
                ]}
            />
        );
        const selectButtonElement = screen.getByLabelText("Category");
        expect(selectButtonElement).toBeInTheDocument();
    });

    test("renders date picker", () => {
        render(<DynamicFields formFields={[{ typeId: 4, label: "Date" }]} />);
        const datePickerElement = screen.getByLabelText("Date");
        expect(datePickerElement).toBeInTheDocument();
    });

    test("renders DSC button", () => {
        render(<DynamicFields formFields={[{ typeId: 5, label: "DSC" }]} />);
        const dscButtonElement = screen.getByLabelText("DSC");
        expect(dscButtonElement).toBeInTheDocument();
    });
});

