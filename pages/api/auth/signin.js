import DB from '../../../backend/middleware/mongodb';
import {jwtGenerator} from '../../../backend/lib/JWT';
import {ResponseError, ResponseSuccess} from '../../../utils';
import {IUser} from '../../../backend/modals';
import UserTable from '../../../backend/schema/UserTable';

async function handler(req, res) {
  if (req.method !== 'POST')
    return ResponseError(res, 400, 'Invalid HTTP Method.');

  const {username, password} = req.body;

  let users = await UserTable.find({username}).exec();
  if (!users.length) return ResponseError(res, 404, "User Doesn't Exists.");

  let user = await UserTable.findOne({$and: [{username}, {password}]}).exec();
  if (!user) return ResponseError(res, 401, 'Invalid Password.');

  user.password = null;
  const payload = IUser.cast(user, {stripUnknown: true});
  const jwt = jwtGenerator(payload);

  if (!jwt) return ResponseError(res, 400, 'Invalid Params.');
  return ResponseSuccess(res, 200, {jwt, user: payload});
}

export const config = {
  api: {
    bodyParser: {
      // sizeLimit: '1mb',
    },
  },
};

export default DB(handler);
