export default (editor, opts = {}) => {
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

  blocks.map((template) => {
    editor.BlockManager.add(template.category, template)
  })
}
