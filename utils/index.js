/* Randomize array in-place using Durstenfeld shuffle algorithm */
export const shuffleArray = array => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

export const rotateArray = (array = [], count, reverse = false) => {
  let arr = array;
  for (let i = 0; i < count; i++) {
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
  }
  array = arr;
};

export const ResponseError = (res, code, message) => {
  return res.status(code ?? 400).json({status: 'error', message});
};

export const ResponseSuccess = (res, code, payload) => {
  return res.status(code ?? 200).json({status: 'success', ...payload});
};
