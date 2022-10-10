import uuid from 'uuid';
import jwt from 'jsonwebtoken';
import lodash from 'lodash';

export const jwtGenerator = payload => {
  let tokenPayload = lodash.cloneDeep(jwtConfig.payload);
  let currentDateTime = Math.floor(new Date().getTime() / 1000);
  let expiryDateTime =
    currentDateTime + jwtConfig.expirationDays * 24 * 60 * 60;
  tokenPayload.iat = currentDateTime;
  tokenPayload.exp = expiryDateTime;

  tokenPayload.user = payload;
  // console.log({tokenPayload, isValid: IUser.isValidSync(tokenPayload.user)});
  // if (!IUser.isValidSync(tokenPayload.user)) return null;

  return jwt.sign(tokenPayload, process.env.JWT_TOKEN_SECRET, {
    algorithm: 'HS512',
  });
};

export const jwtValidator = (req, res, next) => {
  req.uniqueReqIdentifier = uuid.v4();
  if (_ignoreAuthentication(req)) next();
  else if (authorized(req)) {
    next();
  } else {
    var notAuthorized = {code: 0, message: 'not authorized', fields: ''};
    res.setHeader('Content-Type', 'application/json');
    return res.status(401).end(JSON.stringify(notAuthorized));
  }
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

const _ignoreAuthentication = req => {
  if (!jwtConfig) return false;
  var fullUrl = req.protocol + '://' + req.hostname + req.originalUrl;
  let matched = null;
  for (let urlPattern in jwtConfig.ignoreJWTValidationJSON) {
    if (jwtConfig.ignoreJWTValidationJSON.hasOwnProperty(urlPattern)) {
      if (!matched) matched = fullUrl.match(urlPattern);
    }
  }
  return matched && matched.length;
};

const jwtConfig = {
  stayedDays: 2,
  expirationDays: 30,
  payload: {
    iss: 'api.parkez.org',
    user: {},
  },
};
