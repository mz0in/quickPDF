export function onSubmit(selectedComponent, editor, details, myModal) {
  // Get the BlockManager module first
  const BlockManager = editor.Blocks // `Blocks` is an alias of `BlockManager`
  const htmlCode = selectedComponent?.toHTML()
  let cssCode = editor.CodeManager.getCode(selectedComponent, 'css', { cssc: editor.CssComposer })
  console.log(htmlCode)
  console.log(cssCode)
  // setBlockInLocalStorage(details, htmlCode, cssCode)
  //render all the blocks from localhost
  // loadAllBlocksFromLocalStorage(BlockManager)
  // myModal.close()
}

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

export function getBlocksFromLocalStorage() {
  let initalValue = {}

  let blocks = localStorage.getItem('userBlocks')
  if (blocks == null) {
    return initalValue
  } else {
    return JSON.parse(blocks)
  }
}

export function setBlockInLocalStorage(details, htmlCode, cssCode) {
  let blockNumber = localStorageIniter()
  const newName = `${details.name}-${blockNumber}`
  let allBlocks = getBlocksFromLocalStorage()
  if (!allBlocks[details.category]) {
    allBlocks[details.category] = {}
  }

  allBlocks[details.category][newName] = {
    htmlCode,
    cssCode
  }

  //updating blockNumbr
  blockNumber = blockNumber + 1
  localStorage.setItem('totalBlocks', JSON.stringify(blockNumber))
  localStorage.setItem('userBlocks', JSON.stringify(allBlocks))
}

export function addBlocksToBlockManager(BlockManager, details, htmlCode, cssCode) {
  // Add a new Block
  const block = BlockManager.add(details.id, {
    // Your block properties...
    label: details.id,
    category: details.category,
    content: `${htmlCode}
    <style>
    ${cssCode}
    </style>`
  })
}

export function loadAllBlocksFromLocalStorage(BlockManager) {
  // updating BlockManager
  let allBlocks = getBlocksFromLocalStorage()
  // Iterate over the allBlocks object
  for (let category in allBlocks) {
    let blocks = allBlocks[category]
    for (let blockID in blocks) {
      let block = blocks[blockID]
      let details = {
        id: blockID,
        category: category
      }
      let htmlCode = block.htmlCode
      let cssCode = block.cssCode
      addBlocksToBlockManager(BlockManager, details, htmlCode, cssCode)
    }
  }
  BlockManager.render()
}
