import Store from './store'
import { ipcMain } from 'electron'
import { generatePDF } from '../utils'
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

  ipcMain.handle('save', async (event, args) => {
    store.setPDF(args.info.companyName, args.info.date, args.codeOfPaper)
    // generating PDF
    let pdfBuffer = await generatePDF(args.html, args.info.width, args.info.height)
    return pdfBuffer
  })

  ipcMain.handle('getPapers', (event, args) => {
    let papers = store.getPDF(args.companyName)
    return papers
  })

  ipcMain.handle('getPapersWithDate', (event, args) => {
    let htmlCodeOfPaper = store.getPDFOnDate(args.companyName, args.date)
    return htmlCodeOfPaper
  })
}
