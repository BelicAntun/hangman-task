import * as yup from 'yup';

export const VALIDATION_SCHEMA = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username shoud be at least 3 characters long')
    .max(18, 'Username should be at most 12 characters long'),
});
