import {useEffect} from 'react';
import '../styles/globals.css';

import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux';
import configureStore from '../store/store';

const store = configureStore();
const persistedStore = persistStore(store);

function MyApp({Component, pageProps}) {
  useEffect(() => {
    resize();
    serviceWorker();
    return () => {};
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

const serviceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker
        .register('/sw.js', {
          scope: '.',
        })
        .then(
          function (registration) {
            console.log(
              '', // 'Service Worker registration successful with scope: ',
              registration.scope,
            );
          },
          function (err) {
            console.log('Service Worker registration failed: ', err);
          },
        );
    });
  }
};

const resize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
};

export default MyApp;
