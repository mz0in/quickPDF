import { app } from 'electron'
import path from 'path'
import fs from 'fs'

class Store {
  private data: any

  // This will just return the property on the `data` object
  get(storeName: String, key: string): any {
    this.data = parseDataFile(storeName)
    return this.data[key]
  }

  // ...and this will set it
  set(storeName: string, key: string, val: any): void {
    const userDataPath = app.getPath('userData')
    const filePath = path.join(userDataPath, storeName + '.json')
    this.data[key] = val
    fs.writeFileSync(filePath, JSON.stringify(this.data))
  }
}

function parseDataFile(storeName: String): Record<string, any> | string {
  const userDataPath = app.getPath('userData')
  const filePath = path.join(userDataPath, storeName + '.json')

  try {
    return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
  } catch (error) {
    // if there was some kind of error, return the passed in defaults instead.
    return 'file was not there please save data first'
  }
}

// expose the class
export default Store
