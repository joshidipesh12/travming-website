import {createSlice} from '@reduxjs/toolkit';
import {apiCallRequested} from './api';

const slice = createSlice({
  name: 'hotels',
  initialState: {
    loading: false,
    hotels: [],
    country: 'Australia',
    state: 'New South Whales',
    city: 'Sydney',
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
    requestStarted: (state, action) => {
      state.loading = true;
    },
    requestSuccess: (state, action) => {
      state.loading = true;
    },
    requestFailed: (state, action) => {
      state.loading = true;
    },
  },
});

export const {
  setCountry,
  setState,
  setCity,
  requestStarted,
  requestSuccess,
  requestFailed,
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
