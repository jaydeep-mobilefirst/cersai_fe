import * as Yup from "yup";

describe("UserManagementValidation", () => {
    it("should validate a valid user", async () => {
        const validUser = {
            firstName: "John",
            middleName: "Doe",
            lastName: "Smith",
            role: "Admin",
            email: "john@example.com",
            mobileNumber: "1234567890",
        };

        const isValid = await Yup.object().shape({
            firstName: Yup.string()
                .required("First name is required")
                .min(2, "First name must be at least 2 characters long"),
            middleName: Yup.string(),
            lastName: Yup.string()
                .required("Last name is required")
                .min(2, "Last name must be at least 2 characters long"),
            role: Yup.string().required("Role is required"),
            email: Yup.string()
                .required("Email is required")
                .email("Email is invalid"),
            mobileNumber: Yup.string()
                .required("Mobile number is required")
                .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
        }).isValid(validUser);

        expect(isValid).toBe(true);
    });

    it("should validate an invalid user", async () => {
        const invalidUser = {
            firstName: "",
            middleName: "Doe",
            lastName: "Smith",
            role: "Admin",
            email: "john@example.com",
            mobileNumber: "1234567890",
        };

        const isValid = await Yup.object().shape({
            firstName: Yup.string()
                .required("First name is required")
                .min(2, "First name must be at least 2 characters long"),
            middleName: Yup.string(),
            lastName: Yup.string()
                .required("Last name is required")
                .min(2, "Last name must be at least 2 characters long"),
            role: Yup.string().required("Role is required"),
            email: Yup.string()
                .required("Email is required")
                .email("Email is invalid"),
            mobileNumber: Yup.string()
                .required("Mobile number is required")
                .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
        }).isValid(invalidUser);

        expect(isValid).toBe(false);
    });
});
