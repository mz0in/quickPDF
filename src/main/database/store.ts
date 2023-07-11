import { app } from 'electron'
import path from 'path'
import fs from 'fs'

interface CompanyData {
  papers: string[]
}

class Store {
  private data: any = {}
  private userDataPath: string

  constructor() {
    this.userDataPath = app.getPath('userData')
  }

  get(storeName: string, key: string): any {
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
    const companiesFolderPath = path.join(this.userDataPath, 'companies')
    const companyFolderPath = path.join(companiesFolderPath, companyName)
    const companyJsonFileName = `${companyName}.json`
    const companyJsonFilePath = path.join(companyFolderPath, companyJsonFileName)
    const jsonFileName = `${date}.json`
    const jsonFilePath = path.join(companyFolderPath, jsonFileName)

    // Create the "companies" folder if it doesn't exist
    if (!fs.existsSync(companiesFolderPath)) {
      fs.mkdirSync(companiesFolderPath)
    }

    // Create the company folder if it doesn't exist
    if (!fs.existsSync(companyFolderPath)) {
      fs.mkdirSync(companyFolderPath)
    }

    let companyData: CompanyData = { papers: [] }

    // Check if the company JSON file exists
    if (fs.existsSync(companyJsonFilePath)) {
      const companyJsonContent = fs.readFileSync(companyJsonFilePath, 'utf-8')
      companyData = JSON.parse(companyJsonContent)
    }

    // Add the date to the papers array
    if (!companyData.papers.includes(date)) {
      companyData.papers.push(date)
    }

    // Write the updated company data to the JSON file
    fs.writeFileSync(companyJsonFilePath, JSON.stringify(companyData))

    // Write or append the HTML code to the JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(html))
  }

  getPDF(companyName: string): any[] {
    const directoryPath = path.join(this.userDataPath, 'companies', companyName)
    const filePath = path.join(directoryPath, `${companyName}.json`)
    let data = { papers: [] }
    try {
      if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
      }
    } catch (e) {
      console.error(e)
    }

    return data.papers
  }

  getPDFOnDate(companyName: string, date: string): any {
    const directoryPath = path.join(this.userDataPath, 'companies', `${companyName}`)
    const filePath = path.join(directoryPath, `${date}.json`)
    let data = {}
    try {
      if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf-8' }))
        return data
      }
    } catch (e) {
      console.error(e)
    }

    return data
  }
}

export default Store
