import {createSlice} from '@reduxjs/toolkit';
import {rotateArray, shuffleArray} from '../../utils';
import {apiCallRequested} from './api';

const slice = createSlice({
  name: 'hotels',
  initialState: {
    locLoading: false,
    city: null,
    state: 'Delhi',
    country: 'India',
    coords: null,
    images: [],
    hotels: [],
    hotelsLoading: false,
  },
  reducers: {
    setCountry: (state, action) => {
      state.country = action.payload;
      state.coords = null;
    },
    setState: (state, action) => {
      state.state = action.payload;
      state.coords = null;
    },
    setCity: (state, action) => {
      state.city = action.payload;
      state.coords = null;
    },
    setCoords: (state, action) => {
      state.coords = action.payload;
    },
    locRequested: (state, action) => {
      state.locLoading = true;
    },
    locRequestSuccess: (state, action) => {
      let resp = action.payload.response.results[0];

      if (resp.city?.length) state.city = resp.city;
      else state.city = resp.subDistrict;

      state.country = resp.area;
      state.state = resp.state;
      state.locLoading = false;
    },
    locRequestFailed: (state, action) => {
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
      state.images = action.payload.response.results;
    },
    hotelsRequested: (state, action) => {
      state.hotelsLoading = true;
    },
    hotelsRecieved: (state, action) => {
      state.hotels = action.payload.response.features;
      state.hotelsLoading = false;
    },
    hotelsNotRecieved: (state, action) => {
      state.hotelsLoading = false;
    },
  },
});

export const {
  setCountry,
  setState,
  setCity,
  setCoords,

  locRequested,
  locRequestSuccess,
  locRequestFailed,
  geoCoordsRecieved,

  imagesRequestSuccess,
  reorderImages,

  hotelsRequested,
  hotelsRecieved,
  hotelsNotRecieved,
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
      onStart: locRequested.type,
      onSuccess: locRequestSuccess.type,
      onError: locRequestFailed.type,
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

export const getHotels = coords => async dispatch => {
  return dispatch(
    apiCallRequested({
      url: `/api/hotels?lng=${coords[1]}&lat=${coords[0]}`,
      method: 'get',
      onStart: hotelsRequested.type,
      onSuccess: hotelsRecieved.type,
      onError: hotelsNotRecieved.type,
    }),
  );
};

export const getHotelImages = () => async dispatch => {
  return dispatch(
    apiCallRequested({
      url: `/api/hotels/images`,
      method: 'get',
      onSuccess: imagesRequestSuccess.type,
    }),
  );
};
