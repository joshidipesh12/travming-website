import {createSlice} from '@reduxjs/toolkit';
import {apiCallRequested} from './api';

const slice = createSlice({
  name: 'login',
  initialState: {
    loginLoading: false,
    signupLoading: false,
    usename: null,
    password: null,
    loggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.usename = action.payload.username;
      state.loggedIn = true;
    },
    signup: (state, action) => {
      state.usename = action.payload.username;
      state.loggedIn = true;
    },
    logout: (state, action) => {
      state.loggedIn = false;
      state.usename = null;
      state.password = null;
    },
  },
});

export const {login, signup} = slice.actions;
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
