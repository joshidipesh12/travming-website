import {useEffect} from 'react';
import '../styles/globals.css';

import SnackbarProvider from 'react-simple-snackbar';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {Provider} from 'react-redux';
import configureStore from '@f/store/store';
import DayjsUtils from '@date-io/dayjs';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {Head} from '@f/components';

const store = configureStore();
const persistedStore = persistStore(store);

function MyApp({Component, pageProps}) {
  useEffect(() => resize(), []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore} loading={null}>
        <MuiPickersUtilsProvider utils={DayjsUtils}>
          <SnackbarProvider>
            <Head />
            <Component {...pageProps} />
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </PersistGate>
    </Provider>
  );
}

// const serviceWorker = () => {
//   if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function () {
//       navigator.serviceWorker.register('../sw.js', {scope: '.'}).then(
//         registration =>
//           console.log(
//             'Service Worker registration successful with scope: ',
//             registration.scope,
//           ),
//         function (err) {
//           console.log('Service Worker registration failed: ', err);
//         },
//       );
//     });
//   }
// };

const resize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
};

// const setViewPort = dims => {
//   const [height, width] = dims;
//   let viewport = document.querySelector('meta[name=viewport]');
//   if (height && width)
//     viewport.setAttribute(
//       'content',
//       'height=' +
//         height.toFixed(0) +
//         'px, width=' +
//         width.toFixed(0) +
//         'px, initial-scale=1.0',
//     );
//   return () => {};
// };

export default MyApp;
