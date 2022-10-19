import * as yup from 'yup';
import uuid from 'uuid';

export default yup.object().shape({
  userId: yup.string().default(() => uuid.v4()),
  name: yup.string().nullable(),
  username: yup.string().email().required(),
  password: yup.string().nullable(),
  createdOn: yup.date(),
  lastUpdated: yup.date().nullable(),
  deletionDate: yup.date().nullable(),
  userPermissions: yup.object().nullable(),
});
