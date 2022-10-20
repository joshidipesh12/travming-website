import * as yup from 'yup';

export default yup.object().shape({
  userId: yup.string(),
  name: yup.string().nullable(),
  username: yup.string().email().required(),
  password: yup.string().nullable(),
  createdOn: yup.date(),
  lastUpdated: yup.date().nullable(),
  deletionDate: yup.date().nullable(),
  userPermissions: yup.object().nullable(),
});
