/**
 * blocks are big components like header, footer, layouts, cards
 */

import { Editor } from 'grapesjs'

const myPlugin = (editor: Editor, opts = {}) => {
  const defaults = {}

  const options = { ...defaults, ...opts }

  const customBlock1 = {
    id: 'my-custom-block-1',
    label: 'My Custom Block 1',
    content: '<div class="my-custom-block-1">Hello, world!</div>',
    category: 'Custom Blocks',
    attributes: {
      class: 'my-custom-block-1'
    }
  }

  const customBlock2 = {
    id: 'my-custom-block-2',
    label: 'My Custom Block 2',
    content: '<div class="my-custom-block-2">Goodbye, world!</div>',
    category: 'Custom Blocks',
    attributes: {
      class: 'my-custom-block-2'
    }
  }

  editor.BlockManager.add(customBlock1.id, customBlock1)
  editor.BlockManager.add(customBlock2.id, customBlock2)
}

export default myPlugin
