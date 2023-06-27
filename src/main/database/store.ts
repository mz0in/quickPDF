import { app } from 'electron'
import path from 'path'
import fs from 'fs'

class Store {
  private data: any = {}
  private userDataPath: string

  constructor() {
    this.userDataPath = app.getPath('userData')
  }

  get(storeName: String, key: string): any {
    const filePath = path.join(this.userDataPath, storeName + '.json')
    try {
      this.data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
    } catch (e) {
      this.data = {}
    }
    return this.data[key]
  }

  set(storeName: string, key: string, val: any): void {
    const filePath = path.join(this.userDataPath, storeName + '.json')
    this.data[key] = val
    fs.writeFileSync(filePath, JSON.stringify(this.data))
  }

  setPDF(companyName: string, date: string, html: string): void {
    console.log(html)
    const directoryPath = path.join(this.userDataPath, 'companies')
    const filePath = path.join(directoryPath, `${companyName}.json`)
    let data = {}
    try {
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true })
      }
      if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
        // console.log(data)
      }
      // parsing html array to string
      data[date] = html
      fs.writeFileSync(filePath, JSON.stringify(data))
    } catch (e) {
      console.error(e)
    }
  }

  getPDF(companyName: string) {
    const directoryPath = path.join(this.userDataPath, 'companies')
    const filePath = path.join(directoryPath, `${companyName}.json`)
    let data = {}
    try {
      if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
      }
    } catch (e) {
      console.error(e)
    }

    return data
  }

  getPDFOnDate(companyName: string, date: string) {
    const directoryPath = path.join(this.userDataPath, 'companies')
    const filePath = path.join(directoryPath, `${companyName}.json`)
    let data = {}
    try {
      if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
      }
    } catch (e) {
      console.error(e)
    }

    return data[date];
  }
}

export default Store
