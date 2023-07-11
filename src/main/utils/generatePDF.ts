import { BrowserWindow } from 'electron'

export async function generatePDF(
  html: string,
  width: number,
  height: number
): Promise<Buffer | undefined> {
  const printableWindow = new BrowserWindow({ show: false, webPreferences: { webSecurity: false } })
  printableWindow.loadURL('data:text/html;base64,' + Buffer.from(html).toString('base64'))
  const customPageSize = { width: width, height: height }
  console.log(customPageSize)
  const option = {
    landscape: false,
    printBackground: true,
    pageSize: customPageSize,
    preferCSSPageSize: true
  }
  let pdfBuffer: Buffer | undefined

  await new Promise<void>((resolve) => {
    printableWindow.webContents.on('did-finish-load', async () => {
      pdfBuffer = await printableWindow.webContents.printToPDF(option)
      resolve()
    })
  })
  return pdfBuffer
}
