import { Editor } from 'grapesjs'
import customSaveModal from './modal'
import { loadAllBlocksFromLocalStorage } from './function'

/**
 * User Blocks plugin for GrapesJS editor.
 * This plugin adds a custom button to each user-defined block type's toolbar.
 * Clicking the button opens a custom save modal for the block.
 * @param editor - GrapesJS editor instance.
 */
export default function userBlocksPlugin(editor: Editor): void {
  const dc = editor.DomComponents
  const BlockManager = editor.Blocks
  const id = 'block-adder'
  const htmlLabel = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
  `

  // Load all the blocks from block manager as soon as the editor initializes
  loadAllBlocksFromLocalStorage(BlockManager)

  dc.getTypes().forEach((elType) => {
    const { model: oldModel, view: oldView } = elType
    dc.addType(elType.id, {
      model: oldModel.extend({
        initToolbar() {
          //@ts-ignore Ignore type errors for oldModel.prototype.initToolbar.apply
          // eslint-disable-next-line prefer-rest-params
          oldModel.prototype.initToolbar.apply(this, arguments)
          const toolbar = this.get('toolbar')

          if (!toolbar.filter((tlb) => tlb.id === id).length) {
            toolbar.unshift({
              id,
              command: function () {
                customSaveModal(editor)
              },
              label: htmlLabel
            })
            this.set('toolbar', toolbar)
          }
        }
      }),
      view: oldView
    })
  })
}
