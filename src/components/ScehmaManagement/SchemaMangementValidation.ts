import * as Yup from "yup";

export const SchemaFormValidation = Yup.object().shape({
  CompanyName: Yup.string()
    .required("Company Name  is required")
    .min(2, "Company Name must be at least 2 characters long"),
  PAN: Yup.string()
    .required("PAN is required")
    .matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      "PAN must be a valid 10-character alphanumeric identifier"
    ),
  TypeOfEntity: Yup.string()
    .required("Type Of Entity  is required")
    .min(2, "Type Of Entity must be at least 2 characters long"),

  EntityName: Yup.string()
    .required("Entity Name  is required")
    .min(2, "Entity Name must be at least 2 characters long"),
  EntityUniqueId: Yup.string()
    .required("Entity Unique Id is required")
    .matches(
      /^[A-Za-z0-9]{8}$/,
      "Unique ID Number must be 8 characters long and alphanumeric"
    ),
  RegulatorName: Yup.string().required("Regulator Name is required"),

  Branch: Yup.string().required("Branch is required"),
  SchemeAct: Yup.string().required("SchemeAct is required"),

  uniqueIdNumber: Yup.string()
    .required("Unique ID Number is required")
    .matches(
      /^[A-Za-z0-9]{8}$/,
      "Unique ID Number must be 8 characters long and alphanumeric"
    ),
  Status: Yup.string()
    .required("Scheme Name is required")
    .min(2, "Scheme Name must be at least 2 characters long"),
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
