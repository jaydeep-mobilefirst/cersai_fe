import * as yup from "yup";

export const DesignatedDetailsSchema = yup.object().shape({
    nameofcompanycompanyauthority: yup
    .string()
    .required('Company Name is required')
    .min(2, 'Company Name must be at least 2 characters long'),
    addressLine1: yup
    .string()
    .required('address  is required'),
    addressLine2: yup
    .string(),
    pincode:yup
    .number(),
    state:yup
    .string(),
    jursidiction:yup.string()
});