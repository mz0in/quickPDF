import { Editor } from "grapesjs";

interface PluginOptions {
    companyName: string;
  }

export default function (editor: Editor, options: PluginOptions) {
    const { companyName } = options;
    const category = "templates"
  
    // Check if data is available in localStorage
    const localStorageData = localStorage.getItem(companyName);
  
    let companyData = {};
  
    if (localStorageData) {
      try {
        companyData = JSON.parse(localStorageData);
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
      }
    }

    const blocks = Object.keys(companyData).map((layout)=> {
        return {
            category,
        }
    })
    return {};
  };