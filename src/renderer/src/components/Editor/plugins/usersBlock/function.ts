import { Editor } from 'grapesjs'

/**
 * Submits the selected component to be saved as a custom block.
 * @param selectedComponent - The selected component to be saved as a block.
 * @param editor - GrapesJS editor instance.
 * @param details - Details of the block to be saved, including name and category.
 * @param myModal - The modal object to close after submission.
 */
export function onSubmit(
  selectedComponent: any,
  editor: Editor,
  details: { name: string; category: string },
  myModal: any
): void {
  // Get the BlockManager module first
  const BlockManager = editor.Blocks // `Blocks` is an alias of `BlockManager`
  const htmlCode = selectedComponent?.toHTML()
  const cssCode = editor.CodeManager.getCode(selectedComponent, 'css', { cssc: editor.CssComposer })
  // console.log(`{
  //   media: \`<img height=\${height} width=\${width} class="firstBlockImages" src=\${images[0]} />\`,
  //   category: category,
  //   content: \`${htmlCode}
  //   <style>
  //   ${cssCode}
  //   </style>\`
  // },`)
  setBlockInLocalStorage(details, htmlCode, cssCode)
  // render all the blocks from localhost
  loadAllBlocksFromLocalStorage(BlockManager)
  myModal.close()
}

/**
 * Initializes the localStorage key for total block count.
 * @returns The current total block count.
 */
function localStorageIniter(): number {
  let blockValue = localStorage.getItem('totalBlocks')
  if (blockValue) {
    blockValue = String(parseInt(blockValue, 10) + 1)
  } else {
    blockValue = '1'
  }
  localStorage.setItem('totalBlocks', blockValue)
  return parseInt(blockValue, 10)
}

/**
 * Gets all the user blocks from localStorage.
 * @returns An object containing all the user blocks.
 */
export function getBlocksFromLocalStorage(): {
  [category: string]: { [blockName: string]: { htmlCode: string; cssCode: string } }
} {
  const initialValue: {
    [category: string]: { [blockName: string]: { htmlCode: string; cssCode: string } }
  } = {}

  const blocks = localStorage.getItem('userBlocks')
  if (blocks == null) {
    return initialValue
  } else {
    return JSON.parse(blocks)
  }
}

/**
 * Sets a block in localStorage with the provided details, HTML code, and CSS code.
 * @param details - Details of the block, including name and category.
 * @param htmlCode - The HTML code of the block.
 * @param cssCode - The CSS code of the block.
 */
export function setBlockInLocalStorage(
  details: { name: string; category: string },
  htmlCode: string,
  cssCode: string
): void {
  let blockNumber = localStorageIniter()
  const newName = `${details.name}-${blockNumber}`
  const allBlocks = getBlocksFromLocalStorage()
  if (!allBlocks[details.category]) {
    allBlocks[details.category] = {}
  }

  allBlocks[details.category][newName] = {
    htmlCode,
    cssCode
  }

  // updating blockNumber
  blockNumber = blockNumber + 1
  localStorage.setItem('totalBlocks', JSON.stringify(blockNumber))
  localStorage.setItem('userBlocks', JSON.stringify(allBlocks))
}

/**
 * Adds a block to the BlockManager with the provided details, HTML code, and CSS code.
 * @param BlockManager - GrapesJS BlockManager instance.
 * @param details - Details of the block, including name and category.
 * @param htmlCode - The HTML code of the block.
 * @param cssCode - The CSS code of the block.
 */
export function addBlocksToBlockManager(
  BlockManager: any,
  details: { id: string; category: string },
  htmlCode: string,
  cssCode: string
): void {
  // Add a new Block
  BlockManager.add(details.id, {
    // Your block properties...
    label: details.id,
    category: details.category,
    content: `${htmlCode}
    <style>
    ${cssCode}
    </style>`
  })
}

/**
 * Loads all blocks from localStorage and adds them to the BlockManager.
 * @param BlockManager - GrapesJS BlockManager instance.
 */
export function loadAllBlocksFromLocalStorage(BlockManager: any): void {
  // updating BlockManager
  const allBlocks = getBlocksFromLocalStorage()
  // Iterate over the allBlocks object
  for (const category in allBlocks) {
    const blocks = allBlocks[category]
    for (const blockID in blocks) {
      const block = blocks[blockID]
      const details = {
        id: blockID,
        category: category
      }
      const htmlCode = block.htmlCode
      const cssCode = block.cssCode
      addBlocksToBlockManager(BlockManager, details, htmlCode, cssCode)
    }
  }
  BlockManager.render()
}
