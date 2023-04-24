import Store from './store'
import { ipcMain } from 'electron';

/**
 * direct bindings for DataBase
 * with just storeName, key, value
 */
const store = new Store()

export const setDB = (): void => {
  ipcMain.on('setDB', (event, data) => {
    store.set(data.storeName, data.key, data.value)
    console.log("data in server", data)
  })
};

export const getDB = (): void => {
  ipcMain.on('getDB', (event, data) => {
    let result = store.get(data.storeName, data.key)
    console.log('geting data', data)
    return "result"
  })
};
