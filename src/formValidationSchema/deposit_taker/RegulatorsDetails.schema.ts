import * as Yup from "yup";
// Helper function to parse dates in dd-mm-yyyy format
const parseDateString = (value: any, originalValue: any) => {
  const dateParts = originalValue.split("-");
  if (dateParts.length === 3) {
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1; // months are 0 indexed
    const year = parseInt(dateParts[2], 10);
    return new Date(year, month, day);
  }
  return originalValue;
};
const RegulatorsDetails = Yup.object().shape({
  regulatorName: Yup.string()
    .required("Regulator Name is required")
    .min(2, "Regulator Name must be at least 2 characters long"),
  registrationNo: Yup.string()
    .required("Registration No. is required")
    .matches(/^[A-Za-z0-9]+$/, "Registration No. must be alphanumeric"),
  registrationDate: Yup.string()
    .required("Registration approval Date is required")
    .matches(
      /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
      "Enter valid date"
    ),
});

export default RegulatorsDetails;
