import {createSlice} from '@reduxjs/toolkit';
import {apiCallRequested} from './api';

const slice = createSlice({
  name: 'login',
  initialState: {
    loginLoading: false,
    signupLoading: false,
    user: null,
    token: null,
    error: null,
  },
  reducers: {
    noError: (state, action) => {
      state.error = null;
    },
    requestLogin: (state, action) => {
      state.loginLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.token = action.payload.response.jwt;
      state.user = action.payload.response.user;
      console.log("login success")
      state.loginLoading = false;
    },
    loginFailed: (state, action) => {
      state.loginLoading = false;
      state.error = action.payload.response.message;
    },
    requestSignup: (state, action) => {
      state.signupLoading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.token = action.payload.response.jwt;
      state.user = action.payload.response.user;
      console.log("signup success")
      state.signupLoading = false;
    },
    signupFailed: (state, action) => {
      state.signupLoading = false;
      state.error = action.payload.response.message;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const {
  loginFailed,
  loginSuccess,
  requestLogin,
  requestSignup,
  signupFailed,
  signupSuccess,
  logout,
  noError,
} = slice.actions;
export default slice.reducer;

// Action Creators

export const loginUser =
  ({username, password}) =>
  async dispatch => {
    return dispatch(
      apiCallRequested({
        url: `api/auth/signin`,
        method: 'post',
        data: {username, password},
        onStart: requestLogin.type,
        onSuccess: loginSuccess.type,
        onError: loginFailed.type,
      }),
    );
  };

export const signupUser =
  ({name, username, password}) =>
  async dispatch => {
    return dispatch(
      apiCallRequested({
        url: `api/auth/signup`,
        method: 'post',
        data: {name, username, password},
        onStart: requestSignup.type,
        onSuccess: signupSuccess.type,
        onError: signupFailed.type,
      }),
    );
  };
