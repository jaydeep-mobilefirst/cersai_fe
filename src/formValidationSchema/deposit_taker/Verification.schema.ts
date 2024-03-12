// Hidden for simplicity
import * as yup from "yup";

export const VerificationFormSchema = yup.object().shape({
    companyName: yup
    .string()
    .required('Company Name is required')
    .min(2, 'Company Name must be at least 2 characters long'),
    panNumber: yup
    .string()
    .required('PAN Number is required')
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'PAN Number is invalid')
});