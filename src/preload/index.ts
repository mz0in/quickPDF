import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer

interface Size {
  width: number,
  height: number
}

const api = {
  generatePDF: (size: Size, html: string) => ipcRenderer.invoke("generatePDF", {size, html})
}

// Custom DataBase Handler APIs
const DB = {
  setData: (storeName: string, key: string, value: any) => ipcRenderer.invoke("setDB", {storeName, key, value}),
  getData: (storeName: string, key: string) => ipcRenderer.invoke('getDB', { storeName, key })
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.  
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('DB', DB)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
