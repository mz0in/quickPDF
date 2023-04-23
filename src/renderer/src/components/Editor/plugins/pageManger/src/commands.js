export default (editor = {}) => {
  const cm = editor.Commands

  cm.add('open-pages', {
    run(editor) {
      editor.PagesApp.showPanel()
    },
    stop(editor) {
      editor.PagesApp.hidePanel()
    }
  })
}
