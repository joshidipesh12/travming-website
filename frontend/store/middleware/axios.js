import localforage from 'localforage';
import memoryDriver from 'localforage-memoryStorageDriver';
import {setup} from 'axios-cache-adapter';

async function configureAxios() {
  if (!global.axios) {
    await localforage.defineDriver(memoryDriver);
    const forageStore = localforage.createInstance({
      driver: [
        localforage.INDEXEDDB,
        localforage.LOCALSTORAGE,
        memoryDriver._driver,
      ],
      name: 'axios-api-cache',
    });

    global.axios = setup({
      cache: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        exclude: {methods: ['put', 'patch', 'delete']},
        store: forageStore,
      },
    });
  }
  return global.axios;
}

export default configureAxios;
