import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import {ResponseError} from '../../utils';

const AUTH = handler => (req, res) => {
  req.uniqueReqIdentifier = uuid.v4();
  if (!authorized(req)) return ResponseError(res, 401, 'Not Authorized');
  return handler(req, res);
};

const authorized = req => {
  let header = req.headers.authorization;
  if (!header) return false;
  let token = header.split(' ')[1]; // encoded auth token
  let decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
  if (decoded && decoded.userId) {
    req.currentUser = decoded || {};
    return true;
  }
  return false;
};

export default AUTH;
