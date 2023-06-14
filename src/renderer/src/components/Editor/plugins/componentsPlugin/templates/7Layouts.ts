import {componentClass, componentStyle} from "../helper"
const category = '7 Blocks'
const stylePrefix = 'qpdf7-'
// const rowHeight = 75

const clsRow = `${stylePrefix}row`
const clsCell = `${stylePrefix}cell`
const styleRow = `
    .${clsRow} {
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;
      padding: 10px;
    }
    }`

// const styleClm = `
//     .${clsCell} {
//       min-height: ${rowHeight}px;
//       flex-grow: 1;
//       flex-basis: 100%;
//     }`

const step = 0.2
const minDim = 1
const currentUnit = 1
const resizerBtm: Record<string, any> = {
  tl: 0,
  tc: 0,
  tr: 0,
  cl: 0,
  cr: 0,
  bl: 0,
  br: 0,
  minDim
}
const resizerRight: Record<string, any> = {
  ...resizerBtm,
  cr: 1,
  bc: 0,
  currentUnit,
  minDim,
  step,
  keyWidth: 'flex-basis'
}

const rowAttr = {
  class: clsRow,
  'data-gjs-droppable': `.${clsCell}`,
  'data-gjs-resizable': resizerBtm,
  'data-gjs-name': 'Row'
}

const colAttr: Record<string, any> = {
  // class: `${clsCell}`,
  'data-gjs-draggable': `.${clsRow}`,
  'data-gjs-resizable': resizerRight,
  'data-gjs-name': 'Cell',
  'data-gjs-unstylable': 'width',
  'data-gjs-stylable-require': 'flex-basis'
}

const attrsToString = (attrs: Record<string, any>) => {
  const result = []

  for (let key in attrs) {
    let value = attrs[key]
    const toParse = value instanceof Array || value instanceof Object
    value = toParse ? JSON.stringify(value) : value
    // @ts-ignore
    result.push(`${key}=${toParse ? `'${value}'` : `'${value}'`}`)
  }

  return result.length ? ` ${result.join(' ')}` : ''
}

const attrsRow = attrsToString(rowAttr)
const attrsCell = attrsToString(colAttr)
const commonBlockProps = {
  category,
  select: true
}

const blocks = [
  {
    ...commonBlockProps,
    label: '7 block',
    content: `<div ${attrsRow}>
      <div ${attrsCell} class="${componentClass(clsCell, 0)}"></div>
      <div ${attrsCell} class="${componentClass(clsCell, 1)}"></div>
      <div ${attrsCell} class="${componentClass(clsCell, 2)}"></div>
      <div ${attrsCell} class="${componentClass(clsCell, 3)}"></div>
      <div ${attrsCell} class="${componentClass(clsCell, 4)}"></div>
      <div ${attrsCell} class="${componentClass(clsCell, 5)}"></div>
      <div ${attrsCell} class="${componentClass(clsCell, 6)}"></div>
    </div>
    <style>
    ${componentStyle(clsCell, [1,2,3,4,5,6])}
        ${styleRow}
      </style>`
  },
  {
    ...commonBlockProps,
    label: '5/2 block',
    content: `<div ${attrsRow}>
    <div ${attrsCell} class="${componentClass(clsCell, 7)}" style='flex-basis : 71%;'></div>
    <div ${attrsCell} class="${componentClass(clsCell, 8)}" style='flex-basis : 29%;'></div>
  </div>
  <style>
  ${componentStyle(clsCell, [7, 8])}
      ${styleRow}
    </style>`
  },
  {
    ...commonBlockProps,
    label: '4/3 block',
    content: `<div ${attrsRow}>
    <div ${attrsCell} class="${componentClass(clsCell, 9)}" style='flex-basis : 58%;'></div>
    <div ${attrsCell} class="${componentClass(clsCell, 10)}" style='flex-basis : 42%;'></div>
  </div>
  <style>
  ${componentStyle(clsCell, [9, 10])}
      ${styleRow}
    </style>`
  },
  {
    ...commonBlockProps,
    label: '3/4 block',
    content: `<div ${attrsRow}>
    <div ${attrsCell} class="${componentClass(clsCell, 11)}" style='flex-basis : 42%;'></div>
    <div ${attrsCell} class="${componentClass(clsCell, 12)}" style='flex-basis : 58%;'></div>
  </div>
  <style>
  ${componentStyle(clsCell, [11, 12])}
      ${styleRow}
    </style>`
  },
  {
    ...commonBlockProps,
    label: '2/5 block',
    content: `<div ${attrsRow}>
    <div ${attrsCell} class="${componentClass(clsCell, 13)}" style='flex-basis : 29%;'></div>
    <div ${attrsCell} class="${componentClass(clsCell, 14)}" style='flex-basis : 71%;'></div>
  </div>
  <style>
  ${componentStyle(clsCell, [13, 14])}
      ${styleRow}
    </style>`
  },
  {
    ...commonBlockProps,
    label: 'Full 7',
    content: `<div ${attrsRow}>
    <div ${attrsCell} class="${componentClass(clsCell, 15)}" style='flex-basis : 100%;'></div>
  </div>
  <style>
      ${componentStyle(clsCell, 15)}
      ${styleRow}
    </style>`
  }
]

export default blocks
