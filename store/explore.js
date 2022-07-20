import {createSlice} from '@reduxjs/toolkit';
import {apiCallRequested} from './api';
import {rotateArray, shuffleArray} from '../public/utils';
import config from '../config.json';

const slice = createSlice({
  name: 'explore',
  initialState: {
    search_load: false,
    autoSuggestions: [],
    suggestionHistory: [],
    auto_load: false,
    images: [],
    nearbys: [],
    nearbysLoading: false,
  },
  reducers: {
    addSuggestionToHistory: (state, action) => {
      state.suggestionHistory.push(action.payload);
    },
    clearHistory: (state, action) => {
      state.suggestionHistory = [];
    },
    autoCompleteRequested: (state, action) => {
      state.auto_load = true;
    },
    autoCompleteSuccess: (state, action) => {
      state.autoSuggestions = action.payload.response?.features ?? [];
      state.auto_load = false;
    },
    autoCompleteFailed: (state, action) => {
      state.auto_load = false;
    },
    resetSuggestions: (state, action) => {
      state.autoSuggestions = [];
    },
    reorderImages: (state, action) => {
      rotateArray(state.images, 10);
    },
    imagesRequestSuccess: (state, action) => {
      let images = action.payload.response?.results ?? [];
      shuffleArray(images);
      state.images = images;
    },
    nearbysRequested: (state, action) => {
      state.nearbysLoading = true;
    },
    nearbysRecieved: (state, action) => {
      state.nearbys = action.payload.response.features ?? [];
      rotateArray(state.images, 10);
      state.nearbysLoading = false;
    },
    nearbysNotRecieved: (state, action) => {
      state.nearbysLoading = false;
    },
  },
});

export const {
  addSuggestionToHistory,
  clearHistory,
  autoCompleteRequested,
  autoCompleteSuccess,
  autoCompleteFailed,
  resetSuggestions,
  imagesRequestSuccess,
  reorderImages,

  nearbysRequested,
  nearbysRecieved,
  nearbysNotRecieved,
} = slice.actions;
export default slice.reducer;

// Action Creators

// export const getStates = () => async dispatch => {
//   let token = await Cache.get('token');
//   return dispatch(
//     apiCallRequested({
//       url: `states`,
//       method: 'post',
//       data: {country_id: '101'},
//       headers: {Authorization: `Bearer ${token}`},
//       onStart: locationRequested.type,
//       onSuccess: statesRecieved.type,
//       onError: locationFailed.type,
//     }),
//   );
// };

export const getAutoCompleteSuggestions =
  (query = '') =>
  async dispatch => {
    return query.length > 2
      ? dispatch(
          apiCallRequested({
            url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}`,
            method: 'get',
            onStart: autoCompleteRequested.type,
            onSuccess: autoCompleteSuccess.type,
            onError: autoCompleteFailed.type,
          }),
        )
      : null;
  };

export const getNearbyImages = () => async dispatch => {
  return dispatch(
    apiCallRequested({
      url: `https://api.unsplash.com/search/photos?page=1&query=restaurant&per_page=30&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
      method: 'get',
      onSuccess: imagesRequestSuccess.type,
    }),
  );
};

export const getNearbys = (coords, types) => async dispatch => {
  if (!types) {
    types = config.nearby_types;
  }
  return dispatch(
    apiCallRequested({
      url: `https://api.geoapify.com/v2/places?categories=${types.join(
        ',',
      )}&limit=50&bias=proximity%3A${coords[1]},${coords[0]}&apiKey=${
        process.env.NEXT_PUBLIC_GEOAPIFY_KEY
      }`,
      method: 'get',
      onStart: nearbysRequested.type,
      onSuccess: nearbysRecieved.type,
      onError: nearbysNotRecieved.type,
    }),
  );
};
