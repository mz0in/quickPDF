import UI from '../utils/ui'

export default class PagesApp extends UI {
  constructor(editor, opts = {}) {
    super(editor, opts)
    this.addPage = this.addPage.bind(this)
    this.selectPage = this.selectPage.bind(this)
    this.removePage = this.removePage.bind(this)
    this.isSelected = this.isSelected.bind(this)
    this.handlePageNumber = this.handlePageNumber.bind(this)
    this.openEdit = this.openEdit.bind(this)

    /* Set initial app state */
    this.state = {
      editablePageId: '',
      isShowing: true,
      pageNumber: '',
      pages: [],
      loading: false
    }
  }

  get editableId() {
    return this.state.editablePageId
  }

  onRender() {
    const { pm, setState, editor } = this
    setState({
      loading: true
    })
    setState({
      pages: [...pm.getAll()]
    })
    editor.on('page', () => {
      setState({
        pages: [...pm.getAll()]
      })
    })
    setState({
      loading: false
    })
  }

  isSelected(page) {
    return this.pm.getSelected().id === page.id
  }

  selectPage(e) {
    this.pm.select(e.currentTarget.dataset.key)
    this.update()
  }

  removePage(e) {
    console.log(e.currentTarget.dataset.key)
    this.pm.remove(e.currentTarget.dataset.key)
    this.update()
  }

  openEdit(e) {
    const { editor } = this
    this.setStateSilent({
      editablePageId: e.currentTarget.dataset.key
    })
    editor.Modal.close()
    editor.SettingsApp.setTab('page')
    editor.runCommand('open-settings')
  }

  editPage(id, name) {
    const currentPage = this.pm.get(id)
    currentPage?.set('name', name)
    this.update()
  }

  addPage() {
    const { pm, opts } = this
    const { pageNumber } = this.state
    if (!pageNumber) return
    pm.add({
      name: `page ${pageNumber + 1}`,
      id: `${pageNumber + 1}`,
      // styles: `.body {  width: ${opts?.width}px; height: ${opts?.height}px;}`,
      component: '<div class="html2pdf__page-break"></div>'
    })
    this.update()
  }

  handlePageNumber(e) {
    // console.log(e)
    this.setStateSilent({
      pageNumber: e
    })
  }

  renderPagesList() {
    const { pages, loading } = this.state
    const { opts, isSelected } = this

    if (loading) return opts.loader || '<div>Loading pages...</div>'

    return pages
      .map((page, i) => {
        this.handlePageNumber(Number(page.id))
        return `<div 
            data-id="${i}" 
            data-key="${page.get('private') ? '' : page.id || page.get('name')}"  
            class="page ${isSelected(page) ? 'selected' : ''}"
        >
            <i class="fa fa-file-o" style="margin:5px;"></i>
            ${page.get('name') || page.id}
            ${
              isSelected(page) || page.get('internal')
                ? ''
                : `<span class="page-close" data-key="${
                    page.id || page.get('name')
                  }"><i class="fa fa-times"></i>
            </span>`
            }
            ${
              page.get('internal')
                ? ''
                : `<span class="page-edit" data-key="${
                    page.id || page.get('name')
                  }"><i class="fa fa-hand-pointer-o"></i></span>`
            }
        </div>`
      })
      .join('\n')
  }

  update() {
    this.$el?.find('.pages').html(this.renderPagesList())
    this.$el?.find('.page').on('click', this.selectPage)
    this.$el?.find('.page-edit').on('click', this.openEdit)
    this.$el?.find('.page-close').on('click', this.removePage)
  }

  render() {
    const { $, editor } = this

    // Do stuff on render
    this.onRender()
    this.$el?.remove()

    const cont = $(`<div style="display: ${
      this.state.isShowing ? 'flex' : 'none'
    };" class="pages-wrp">
                <div class="pages">
                    ${this.renderPagesList()}
                </div>
                <div class="add-page">
                    ${editor.I18n.t('grapesjs-project-manager.pages.new')}
                </div>
            </div>`)
    cont.find('.add-page').on('click', this.addPage)

    this.$el = cont
    return cont
  }

  get findPanel() {
    return this.editor.Panels.getPanel('views-container')
  }

  showPanel() {
    this.state.isShowing = true
    this.findPanel?.set('appendContent', this.render()).trigger('change:appendContent')
    this.update()
  }

  hidePanel() {
    this.state.isShowing = false
    this.render()
  }
}
