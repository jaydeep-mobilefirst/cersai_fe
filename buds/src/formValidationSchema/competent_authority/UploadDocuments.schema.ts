import * as yup from "yup";

export const UploadDocumentsSchema = yup.object().shape({
    file:yup.mixed().required('File is required')
});