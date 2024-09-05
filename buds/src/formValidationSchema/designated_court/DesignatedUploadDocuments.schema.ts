import * as yup from "yup";

export const DesignatedUploadDocumentsSchema = yup.object().shape({
    file:yup.mixed().required('File is required')
});