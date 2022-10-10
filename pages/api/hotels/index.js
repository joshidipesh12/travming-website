import {ResponseError, ResponseSuccess, rotateArray} from '../../../utils';
// import DB from '@b/middleware/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return ResponseError(res, 400, 'Invalid HTTP Method');

  const {lat, lng} = req.query;
  let data = await fetch(
    `https://api.geoapify.com/v2/places?categories=accommodation&limit=50&bias=proximity%3A${lng},${lat}&apiKey=${process.env.GEOAPIFY_KEY}`,
  );

  let {features} = await data.json();
  rotateArray(features, 10);
  return ResponseSuccess(res, 200, {features});
}

// export default DB(handler);
