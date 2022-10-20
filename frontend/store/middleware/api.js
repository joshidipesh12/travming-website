import {REHYDRATE, PERSIST} from 'redux-persist';
import * as actions from '../api';
import configureAxios from './axios';

const api =
  ({dispatch}) =>
  next =>
  async action => {
    // const connected = navigator ? navigator.onLine : true;

    if (action.type !== actions.apiCallRequested.type) return next(action);

    const {
      // customUrl,
      url,
      method,
      headers,
      data,
      params,
      onStart,
      onSuccess,
      onError,
      successCallback,
    } = action.payload;

    if (onStart) dispatch({type: onStart});

    next(action);

    try {
      let axios = await configureAxios();
      let response = await axios.request({
        // baseURL: customUrl ?? '', //AVD_LocalHost: 10.0.2.2:8082
        url,
        headers,
        method,
        params,
        data,
      });

      // General
      dispatch(actions.apiCallSuccess(response.data));

      // Specific
      if (onSuccess) {
        dispatch({
          type: onSuccess,
          payload: {
            response: response.data,
            params: data,
            successCallback,
          },
        });
      }
    } catch (error) {
      console.log(
        `\n[URL: ${url}]\n[Message: ${error.message}]\n[Code: ${JSON.stringify(
          error.response?.data?.message,
        )}]`,
      );

      // General
      dispatch(actions.apiCallFailed(error));

      // Specific
      if (onError) {
        dispatch({
          type: onError,
          payload: {
            error: error.message,
            status: error.response?.status,
            response: error.response?.data,
          },
        });
      }
    }
  };

export default api;
