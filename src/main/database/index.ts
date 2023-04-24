import Store from './store'
import { ipcMain } from 'electron';

/**
 * direct bindings for DataBase
 * with just storeName, key, value
 */
const store = new Store()

export const setDB = (): void => {
  ipcMain.handle('setDB', (event, args) => {
    store.set(args.storeName, args.key, args.value)
  })
};

export const getDB = (): void => {
  ipcMain.handle('getDB', (event, args) => {
    let result = store.get(args.storeName, args.key)
    // console.log(args);
    return result
  })
};
