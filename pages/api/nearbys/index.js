import {ResponseError, ResponseSuccess, rotateArray} from '../../../utils';

export default async function handler(req, res) {
  if (req.method !== 'GET')
    return ResponseError(res, 400, 'Invalid HTTP Method');

  const {lng, lat, types} = req.query;
  let data = await fetch(
    `https://api.geoapify.com/v2/places?${types}&limit=50&bias=proximity%3A${lng},${lat}&apiKey=${process.env.GEOAPIFY_KEY}`,
  );

  let {features} = await data.json();
  rotateArray(features, 10);
  return ResponseSuccess(res, 200, {features});
}
