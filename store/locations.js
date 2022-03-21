import {createSlice} from '@reduxjs/toolkit';
import {apiCallRequested} from './api';

const slice = createSlice({
  name: 'loc',
  initialState: {
    states: [],
    statesError: false,
    cities: [],
    citiesError: false,
    loading: false,
  },
  reducers: {
    statesRequested: (state, action) => {
      state.cities = [];
      state.statesError = false;
      state.loading = true;
    },
    statesSuccess: (state, action) => {
      if (action.payload.response) {
        let arr = action.payload.response.data.states ?? [];
        shuffleArray(arr);
        state.states = arr;
      }
      state.loading = false;
    },
    statesFailed: (state, action) => {
      state.statesError = true;
      state.citiesError = true;
      state.loading = false;
    },
    citiesRequested: (state, action) => {
      state.citiesError = false;
      state.loading = true;
    },
    citiesSuccess: (state, action) => {
      if (action.payload.response) {
        state.cities = action.payload.response.data;
      }
      state.loading = false;
    },
    citiesFailed: (state, action) => {
      state.citiesError = true;
      state.loading = false;
    },
  },
});

export const {
  citiesRequested,
  statesRequested,
  citiesSuccess,
  statesSuccess,
  citiesFailed,
  statesFailed,
} = slice.actions;
export default slice.reducer;

// Action Creators

export const getStates = country => async dispatch => {
  return dispatch(
    apiCallRequested({
      url: `https://countriesnow.space/api/v0.1/countries/states`,
      method: 'post',
      data: {country},
      // headers: {Authorization: `Bearer ${token}`},
      onStart: statesRequested.type,
      onSuccess: statesSuccess.type,
      onError: statesFailed.type,
    }),
  );
};

export const getCities = (country, state) => async dispatch => {
  return dispatch(
    apiCallRequested({
      url: `https://countriesnow.space/api/v0.1/countries/state/cities`,
      method: 'post',
      data: {country, state},
      // headers: {Authorization: `Bearer ${token}`},
      onStart: citiesRequested.type,
      onSuccess: citiesSuccess.type,
      onError: citiesFailed.type,
    }),
  );
};

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
