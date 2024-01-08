import * as yup from 'yup';

const validationSchema = yup.object().shape({
  phoneNumber: yup.string().required('Phone number is required'),
  password: yup.string().required('Password is required'),
  role :yup.string().required('role is required'),
});

export default validationSchema;