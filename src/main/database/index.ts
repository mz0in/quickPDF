import Store from './store'
import { ipcMain } from 'electron'

/**
 * direct bindings for DataBase
 * with just storeName, key, value
 */
const store = new Store()

export function DbCalls() {
  ipcMain.handle('setDB', (event, args) => {
    store.set(args.storeName, args.key, args.value)
  })

  ipcMain.handle('getDB', (event, args) => {
    let result = store.get(args.storeName, args.key)
    // console.log(args);
    return result
  })
}