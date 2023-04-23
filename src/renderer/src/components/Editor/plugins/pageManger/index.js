import PagesApp from './src/manager'
import commands from './src/commands'
import en from './src/locate/en'

export default (editor, opts = {}) => {
  const options = {
    ...{
      // Confirm delete page
      confirmDeletePage() {
        return confirm('Are you sure to delete this page')
      },

      // When template or page is deleted
      onDelete(res) {
        console.log('Deleted:', res)
      },

      // Handle promise from delete
      onDeleteAsync(del) {
        return del
      },

      // Handle promise from update
      onUpdateAsync(up) {
        return up
      },

      // Send feedback when open is clicked on current page
      currentPageOpen() {
        console.log('Current page already open')
      },

      i18n: {}
    },
    ...opts
  }

  editor.I18n.addMessages({
    en,
    ...options.i18n
  })

  editor.PagesApp = new PagesApp(editor, options)

  // Load commands
  commands(editor, options)
}
