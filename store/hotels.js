import {createSlice} from '@reduxjs/toolkit';
import {rotateArray, shuffleArray} from '../public/utils';
import {apiCallRequested} from './api';

const slice = createSlice({
  name: 'hotels',
  initialState: {
    loading: false,
    locLoading: false,
    hotels: [],
    nearbys: [],
    country: 'India',
    state: 'Uttrakhand',
    city: null,
    coords: null,
    images: [],
  },
  reducers: {
    setCountry: (state, action) => {
      state.country = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setCoords: (state, action) => {
      state.coords = action.payload;
    },
    requestStarted: (state, action) => {
      state.loading = true;
    },
    requestSuccess: (state, action) => {
      state.loading = false;
    },
    requestFailed: (state, action) => {
      state.loading = false;
    },
    locStarted: (state, action) => {
      state.locLoading = true;
    },
    locSuccess: (state, action) => {
      let resp = action.payload.response.results[0];

      if (resp.city?.length) state.city = resp.city;
      else state.city = resp.subDistrict;

      state.country = resp.area;
      state.state = resp.state;
      state.locLoading = false;
    },
    locFailed: (state, action) => {
      state.locLoading = null;
    },
    geoCoordsRecieved: (state, action) => {
      if (action.payload.response.results.length) {
        const {lat, lon} = action.payload.response.results[0];
        state.coords = [lat, lon];
      }
    },
    reorderImages: (state, action) => {
      let images = state.images;
      rotateArray(images, 10);
      state.images = images;
    },
    imagesRequestSuccess: (state, action) => {
      let images = action.payload.response?.results ?? [];
      shuffleArray(images);
      state.images = images;
    },
  },
});

export const {
  setCountry,
  setState,
  setCity,
  setCoords,
  requestStarted,
  requestSuccess,
  requestFailed,

  locStarted,
  locSuccess,
  locFailed,
  geoCoordsRecieved,

  imagesRequestSuccess,
  reorderImages,
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

export const getLocByCoords = (lat, long) => async dispatch => {
  return dispatch(
    apiCallRequested({
      url: `https://apis.mapmyindia.com/advancedmaps/v1/${process.env.NEXT_PUBLIC_MAPMYIND_KEY}/rev_geocode?lat=${lat}&lng=${long}`,
      method: 'get',
      onStart: locStarted.type,
      onSuccess: locSuccess.type,
      onError: locFailed.type,
    }),
  );
};

export const getHotelImages = () => async dispatch => {
  return dispatch(
    apiCallRequested({
      url: `https://api.unsplash.com/search/photos?page=1&query=hotel%20resort&per_page=30&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
      method: 'get',
      onSuccess: imagesRequestSuccess.type,
    }),
  );
};

export const getCoordsByLoc =
  (type, country, state = '', city = '') =>
  async dispatch => {
    const text = `${city.length ? `city=${city}&` : ''}${
      state.length ? `state=${state}&` : ''
    }country=${country}`;

    return dispatch(
      apiCallRequested({
        url: `https://api.geoapify.com/v1/geocode/search?format=json&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_KEY}&type=${type}&limit=1&${text}`,
        method: 'get',
        onSuccess: geoCoordsRecieved.type,
      }),
    );
  };
