import * as Yup from "yup";

export const SchemaFormValidation = Yup.object().shape({
  SchemeName: Yup.string()
    .required("Scheme Name is required")
    .min(2, "Scheme Name must be at least 2 characters long"),
  schemeDescription: Yup.string()
    .required("Scheme Description is required")
    .min(10, "Scheme Description must be at least 10 characters long"),
  startSchemaDate: Yup.date()
    .required("Registration approval Date is required")
    .max(new Date(), "Date should not be in the future"),
  endSchemaDate: Yup.date()
    .required("Last day to enter scheme is required")
    .when(
      "startSchemaDate",
      (startSchemaDate, schema) =>
        startSchemaDate &&
        schema.min(startSchemaDate, "End date must be after the start date")
    ),
  minInvestment: Yup.number().required("Minimum investment amount is required"),
  maxInvestment: Yup.number().required("Maximum investment amount is required"),
  numberOfInvestors: Yup.number().required("Number of investors is required"),
});
