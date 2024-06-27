import * as Yup from "yup";

export const UserManagementValidation = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name must contain only alphabets"),
  middleName: Yup.string().matches(
    /^[a-zA-Z]*$/,
    "Middle name must contain only alphabets"
  ),
  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name must contain only alphabets"),
  role: Yup.string().required("Role is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),
});
