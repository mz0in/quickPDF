import { styleWithFlex } from '../helper'
const category = '7 Blocks'
const stylePrefix = 'qpdf7-'
const rowHeight = 75

const clsCell = `${stylePrefix}cell`
const clsRow = `${stylePrefix}row`
const styleRow = `
      display: flex;
      justify-content: flex-start;
      align-items: stretch;
      flex-wrap: nowrap;
      padding: 5px;`

const styleClm = `
      min-height: ${rowHeight}px;
      flex-grow: 1;
      flex-basis: 100%;`

const step = 1
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
  // class: clsRow,
  'data-gjs-droppable': `.${clsCell}`,
  'data-gjs-resizable': resizerBtm,
  'data-gjs-name': 'Row'
}

const colAttr: Record<string, any> = {
  // class: clsCell,
  'data-gjs-draggable': `.${clsRow}`,
  // 'data-gjs-droppable': `.section`
  'data-gjs-resizable': resizerRight,
  'data-gjs-name': 'Cell',
  // 'data-gjs-type': 'column',
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
    content: `<div ${attrsRow} style="${styleRow}">
      <div ${attrsCell} style="${styleClm}"></div>
      <div ${attrsCell} style="${styleClm}"></div>
      <div ${attrsCell} style="${styleClm}"></div>
      <div ${attrsCell} style="${styleClm}"></div>
      <div ${attrsCell} style="${styleClm}"></div>
      <div ${attrsCell} style="${styleClm}"></div>
      <div ${attrsCell} style="${styleClm}"></div>
    </div>`
  },
  {
    ...commonBlockProps,
    label: '6/1 block',
    content: `<div ${attrsRow} style="${styleRow}">
    <div ${attrsCell} style="${styleWithFlex(1)}"></div>
    <div ${attrsCell} style="${styleWithFlex(6)}"></div>
  </div>`
  },
  {
    ...commonBlockProps,
    label: '5/2 block',
    content: `<div ${attrsRow} style="${styleRow}">
    <div ${attrsCell} style="${styleWithFlex(2)}"></div>
    <div ${attrsCell} style="${styleWithFlex(5)}"></div>
  </div>`
  },
  {
    ...commonBlockProps,
    label: '4/3 block',
    content: `<div ${attrsRow} style="${styleRow}">
    <div ${attrsCell} style="${styleWithFlex(3)}"></div>
    <div ${attrsCell} style="${styleWithFlex(4)}"></div>
  </div>`
  },
  {
    ...commonBlockProps,
    label: '3/4 block',
    content: `<div ${attrsRow} style="${styleRow}">
    <div ${attrsCell} style="${styleWithFlex(4)}"></div>
    <div ${attrsCell} style="${styleWithFlex(3)}"></div>
  </div>`
  },
  {
    ...commonBlockProps,
    label: '2/5 block',
    content: `<div ${attrsRow} style="${styleRow}">
    <div ${attrsCell} style="${styleWithFlex(5)}"></div>
    <div ${attrsCell} style="${styleWithFlex(2)}"></div>
  </div>`
  },
  {
    ...commonBlockProps,
    label: '1/6 block',
    content: `<div ${attrsRow} style="${styleRow}">
    <div ${attrsCell} style="${styleWithFlex(6)}"></div>
    <div ${attrsCell} style="${styleWithFlex(1)}"></div>
  </div>`
  },
  {
    ...commonBlockProps,
    label: 'Full 7',
    content: `<div ${attrsRow} style="${styleRow}">
    <div ${attrsCell} style="${styleWithFlex(1)}"></div>
  </div>`
  }
]

export default blocks
