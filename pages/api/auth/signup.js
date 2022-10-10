import DB from '../../../backend/middleware/mongodb';
import {jwtGenerator} from '../../../backend/lib/JWT';
import {ResponseError, ResponseSuccess} from '../../../utils';
import {IUser} from '../../../backend/modals';
import UserTable from '../../../backend/schema/UserTable';

async function handler(req, res) {
  if (req.method !== 'POST')
    return ResponseError(res, 400, 'Invalid HTTP Method');

  const payload = IUser.cast({...IUser.getDefault(), ...req.body});
  payload.createdOn = Date.now();

  let exists = await UserTable.exists({
    $or: [{username: payload.username}, {userId: payload.userId}],
  }).exec();

  if (exists) return ResponseError(res, 409, 'User Already Exists.');
  const newUser = new UserTable(payload);

  payload.password = null;
  const jwt = jwtGenerator(payload);
  if (!jwt) return ResponseError(res, 400, 'Invalid Params');

  newUser.save();
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
