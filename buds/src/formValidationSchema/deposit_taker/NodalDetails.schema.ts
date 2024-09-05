import * as Yup from 'yup';

const NodalDetailsSchema = Yup.object().shape({
  nodalOfficerName: Yup.string()
    .required('Field is required')
    .min(2, 'Name must be at least 2 characters'),
  nodalOfficerEmail: Yup.string()
    .required('Field is required')
    .email('Invalid email address'),
  nodalOfficerMobileNumber: Yup.string()
    .required('Field is required')
    .matches(/^[0-9]+$/, 'Mobile Number must be numeric')
    .length(10, 'Mobile Number must be exactly 10 digits'),
  nodalOfficerDesignation: Yup.string()
    .required('Field is required'),
  // Assuming the document upload is not mandatory; if it is, you can add a field for it as well
});

export default NodalDetailsSchema;

