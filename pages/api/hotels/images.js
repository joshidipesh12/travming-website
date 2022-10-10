import {ResponseError, ResponseSuccess, shuffleArray} from '../../../utils';

async function handler(req, res) {
  if (req.method !== 'GET')
    return ResponseError(res, 400, 'Invalid HTTP Method');

  let data = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=hotel%20resort&per_page=50&client_id=${process.env.UNSPLASH_KEY}`,
  );

  let {results} = await data.json();
  shuffleArray(results);
  return ResponseSuccess(res, 200, {results});
}

export default handler;
