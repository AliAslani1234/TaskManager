import * as Yup from 'yup';

const SubUserValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  lastName: Yup.string().required('Last Name is required').min(3, 'Last Name must be at least 3 characters'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  password: Yup.string().required('Password is required'),
  role: Yup.string().required('Role is required'),
  agree: Yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
});

export default SubUserValidationSchema;