import * as Yup from "yup";

export const UserManagementValidation = Yup.object().shape({
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
});
