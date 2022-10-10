import {createSlice} from '@reduxjs/toolkit';
import {apiCallRequested} from './api';
import {shuffleArray} from '../../utils';

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
      state.states = [];
      state.statesError = false;
      state.loading = true;
    },
    statesSuccess: (state, action) => {
      if (action.payload.response) {
        state.cities = [];
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

const base = 'https://countriesnow.space/api/v0.1';

export const getStates = country => async dispatch => {
  return dispatch(
    apiCallRequested({
      url: `${base}/countries/states`,
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
      url: `${base}/countries/state/cities`,
      method: 'post',
      data: {country, state},
      // headers: {Authorization: `Bearer ${token}`},
      onStart: citiesRequested.type,
      onSuccess: citiesSuccess.type,
      onError: citiesFailed.type,
    }),
  );
};
