

// Hidden for simplicity
import * as yup from "yup";

export const VerificationFormSchema = yup.object().shape({
  companyName: yup
    .string()
    .required("Company Name is required")
    .min(2, "Company Name must be at least 2 characters long"),
 
});

/// entity details page schema
export const EntityDetailschema = yup.object().shape({
  uniqueId: yup.string().required("Unique Id is required"),
  addressLine1: yup.string().required("Address Line 1 is required"),
  addressLine2: yup.string(),
  pincode:yup.string().required('Pin Code is required'),
  state: yup.string().required("State is required"),
  jurisdiction: yup.string().required("Jurisdiction is required"),
});
