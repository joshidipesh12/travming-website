import * as yup from 'yup';
import {v4 as uuidv4} from 'uuid';

export default yup.object().shape({
  userId: yup
    .string()
    .uuid()
    .default(() => uuidv4()),
  name: yup.string().nullable(),
  username: yup.string().email().required(),
  password: yup.string().nullable(),
  createdOn: yup.date(),
  lastUpdated: yup.date().nullable(),
  deletionDate: yup.date().nullable(),
  userPermissions: yup.object().nullable(),
});
