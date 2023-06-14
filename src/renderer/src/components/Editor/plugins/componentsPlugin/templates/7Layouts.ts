import { styleWithFlex } from "../helper"
const category = '7 Blocks'
const stylePrefix = 'qpdf7-'
const rowHeight = 75

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
  class: clsRow,
  'data-gjs-droppable': `.${clsCell}`,
  'data-gjs-resizable': resizerBtm,
  'data-gjs-name': 'Row'
}

const colAttr: Record<string, any> = {
  // class: clsCell,
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
      <div ${attrsCell} style="${styleClm}"></div>
      <div ${attrsCell} style="${styleClm}"></div>
      <div ${attrsCell} style="${styleClm}"></div>
      <div ${attrsCell} style="${styleClm}"></div>
      <div ${attrsCell} style="${styleClm}"></div>
      <div ${attrsCell} style="${styleClm}"></div>
      <div ${attrsCell} style="${styleClm}"></div>
    </div>
    <style>
        ${styleRow}
      </style>`
  },
  {
    ...commonBlockProps,
    label: '5/2 block',
    content: `<div ${attrsRow}>
    <div ${attrsCell} style="${styleWithFlex(71)}"></div>
    <div ${attrsCell} style="${styleWithFlex(29)}"></div>
  </div>
  <style>
      ${styleRow}
    </style>`
  },
  {
    ...commonBlockProps,
    label: '4/3 block',
    content: `<div ${attrsRow}>
    <div ${attrsCell} style="${styleWithFlex(58)}"></div>
    <div ${attrsCell} style="${styleWithFlex(42)}"></div>
  </div>
  <style>
      ${styleRow}
    </style>`
  },
  {
    ...commonBlockProps,
    label: '3/4 block',
    content: `<div ${attrsRow}>
    <div ${attrsCell} style="${styleWithFlex(42)}"></div>
    <div ${attrsCell} style="${styleWithFlex(58)}"></div>
  </div>
  <style>
      ${styleRow}
    </style>`
  },
  {
    ...commonBlockProps,
    label: '2/5 block',
    content: `<div ${attrsRow}>
    <div ${attrsCell} style="${styleWithFlex(29)}"></div>
    <div ${attrsCell} style="${styleWithFlex(71)}"></div>
  </div>
  <style>
      ${styleRow}
    </style>`
  },
  {
    ...commonBlockProps,
    label: 'Full 7',
    content: `<div ${attrsRow}>
    <div ${attrsCell} style="${styleWithFlex(100)}"></div>
  </div>
  <style>
      ${styleRow}
    </style>`
  }
]

export default blocks