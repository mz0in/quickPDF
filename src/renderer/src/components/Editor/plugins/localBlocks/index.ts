import { Editor } from 'grapesjs'

interface LocalBlocksOptions {
  companyName: string
}

/**
 * Load blocks from the localStorage and add them to the GrapesJS block manager.
 * @param editor - GrapesJS editor instance.
 * @param opts - Local Blocks plugin options.
 */
export default function localBlocksPlugin(editor: Editor, opts: LocalBlocksOptions): void {
  const { companyName } = opts
  const category = 'templates'

  // Check if data is available in localStorage
  const localStorageData = localStorage.getItem(companyName)

  let companyData = {}

  if (localStorageData) {
    try {
      companyData = JSON.parse(localStorageData)
    } catch (error) {
      console.error('Error parsing localStorage data:', error)
    }
  }

  const blocks = Object.keys(companyData).map((layout) => {
    return {
      category,
      select: true,
      label: layout,
      content: `${companyData[layout].htmlBody}
      <style>
        ${companyData[layout].css}
      </style>`
    }
  })

  blocks.forEach((template) => {
    editor.BlockManager.add(template.category, template)
  })
}
