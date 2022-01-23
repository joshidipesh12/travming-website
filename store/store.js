import {persistReducer} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import reducer from './reducer';
import api from './middleware/api';
// import {logout} from './login';

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = (state, action) => {
  // if (action.type === logout.type) {
  //   persistConfig.storage.removeItem('persist:root');
  //   state = undefined;
  // }
  return reducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function () {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(api),
  });
}
