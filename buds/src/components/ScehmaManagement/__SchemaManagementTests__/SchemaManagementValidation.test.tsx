import * as Yup from "yup";

describe("SchemaFormValidation", () => {
    it("should validate CompanyName field", async () => {
        const validData = { CompanyName: "ABC Company" };
        const invalidData = { CompanyName: "" };

        const validResult = await Yup.object().shape({
            CompanyName: Yup.string()
                .required("Company Name is required")
                .min(2, "Company Name must be at least 2 characters long"),
        }).isValid(validData);

        const invalidResult = await Yup.object().shape({
            CompanyName: Yup.string()
                .required("Company Name is required")
                .min(2, "Company Name must be at least 2 characters long"),
        }).isValid(invalidData);

        expect(validResult).toBe(true);
        expect(invalidResult).toBe(false);
    });

    // Add more test cases for other fields...
});
