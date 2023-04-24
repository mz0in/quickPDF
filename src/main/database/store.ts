import { app } from 'electron'
import path from 'path'
import fs from 'fs'

class Store {
  private data: any = {}
  private userDataPath: string

  constructor() {
    this.userDataPath = app.getPath('userData');
  }

  get(storeName: String, key: string): any {
    const filePath = path.join(this.userDataPath, storeName + '.json');
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
}

export default Store
