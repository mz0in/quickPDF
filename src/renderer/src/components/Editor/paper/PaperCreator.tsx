import { useEffect, useRef } from 'react'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import '@renderer/styles/grapesjs.css'
// import gjsBasicBlock from 'grapesjs-blocks-basic'
import basicCustomPlugin from '../plugins/blocksPlugin'
import zoomPlugin from '../plugins/zoomPlugin'
import gjsImageEditorPlugin from 'grapesjs-tui-image-editor'
import parserPostCSS from 'grapesjs-parser-postcss'
// import basicCustomPlugin from './plugins/blocksPlugin'
import customComponents from '../plugins/componentsPlugin'
import customRtePlugin from '../plugins/customRte'
import localBlocks from '../plugins/localBlocks'
// import './plugins/tinymceEditor.js'
import grapesjsFontPlugin from '../plugins/grapesjsFonts'
import grapesjsPageManagerPlugin from '../plugins/pageManger'
import gjsUserBlock from '../plugins/usersBlock'
import '@renderer/styles/designer.css'
import '../plugins/pageManger/css/grapesjs-project-manager.min.css'
import type { htmlObject } from '..'
import { handlePasteForChanakyaConvert } from '@renderer/services/utils'

interface GrapesJSProps {
  id: string
  config?: any
  onSave?: (htmlObjects: htmlObject[], gjsCode: any) => void
  canvasSize: {
    height: number
    width: number
  }
  companyName: string
}

export function PaperCreator({
  id,
  config,
  onSave,
  canvasSize,
  companyName
}: GrapesJSProps): JSX.Element {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const editor = grapesjs.init({
      container: `#${id}`,
      ...config,
      protectedCss: `@page {margin: 15px; size: ${canvasSize?.width}cm ${canvasSize?.height}cm;}body{margin:0px !important;padding:0px;}p{margin: 0px !important; padding-top: 5px !important; padding-bottom: 5px !important;}h1,h2,h3,h4,h5,h6{margin:0px;}`,
      cssComposer: {
        stylePrefix: 'qpdf-',
        rules: "*{font-family: 'chanakya';}h1{font-family: 'roboto';}"
      },
      deviceManager: {
        devices: [
          {
            id: 'paper',
            name: 'paper',
            width: `${canvasSize?.width}cm`,
            height: `${canvasSize?.height}cm`
          }
        ]
      },
      pageManager: {
        pages: [
          {
            name: 'page 1',
            id: '1',
            styles: ``,
            component: ``
          }
        ]
      },
      storageManager: false,
      plugins: [
        // gjsBasicBlock,
        basicCustomPlugin,
        customComponents,
        grapesjsFontPlugin,
        grapesjsPageManagerPlugin,
        gjsImageEditorPlugin,
        zoomPlugin,
        gjsUserBlock,
        customRtePlugin,
        localBlocks,
        parserPostCSS
      ],
      pluginsOpts: {
        [grapesjsPageManagerPlugin]: {
          width: `${canvasSize?.width}in`, // new page width
          height: `${canvasSize?.height}in` // new page height
        },
        [localBlocks]: {
          companyName: companyName
        },
        // @ts-ignore gjsImage plugin is a JS plugin so can't support TS. but its working i checked
        // every thing
        [gjsImageEditorPlugin]: {
          config: {
            includeUI: {
              initMenu: 'filter'
            }
          }
        }
      }
    })

    editor.on('component:selected', () => {
      const openSmBtn = editor.Panels.getButton('views', 'open-sm')
      openSmBtn?.set('active', 1)
    })

    setTimeout(() => {
      try {
        editor.BlockManager.getCategories().each((ctg) => ctg.set('open', false))
      } catch (e) {
        console.log('element list unexpanded')
      }
    }, 3000)

    editor.Panels.addButton('options', {
      id: 'save',
      className: 'fa fa-floppy-o',
      command: 'save',
      attributes: { title: 'Save' },
      category: 'Custom Category' // add a new category for the custom icon
    })

    editor.Panels.addButton('options', {
      id: 'back',
      className: 'fa fa-arrow-left',
      command: 'goBack',
      attributes: { title: 'Back' }
    })

    editor.Panels.addButton('views', {
      id: 'open-pages',
      className: 'fa fa-file-o',
      attributes: {
        title: 'pages'
      },
      command: 'open-pages',
      togglable: false
    })

    if (onSave) {
      editor.Commands.add('save', {
        run: () => {
          // saveing all pages code into array
          const allPages = editor.Pages.getAll()
          // htmlStrings contains html,css of all the pages in array format
          const htmlStrings: htmlObject[] = allPages.map((page) => {
            const component = page.getMainComponent()
            const body = editor.getHtml({ component })
            const css = editor.getCss({ component })

            return {
              htmlBody: body,
              css: css
            }
          }) as htmlObject[]

          const gjsCode = editor.getProjectData()

          onSave(htmlStrings, gjsCode)
        }
      })
    }

    editor.Commands.add('goBack', {
      run: () => {
        history.back()
      }
    })

    editor.StyleManager.addProperty('decorations', {
      name: 'Border Width',
      property: 'border-width',
      type: 'composite',
      properties: [
        {
          name: 'Top',
          type: 'integer',
          default: '0',
          units: ['px', 'em', 'rem']
        },
        {
          name: 'Right',
          type: 'integer',
          default: '0',
          units: ['px', 'em', 'rem']
        },
        {
          name: 'Bottom',
          type: 'integer',
          default: '0',
          units: ['px', 'em', 'rem']
        },
        {
          name: 'left',
          type: 'integer',
          default: '0',
          units: ['px', 'em', 'rem']
        }
      ]
    })

    // block manager open by default
    editor.Panels.getButton('views', 'open-blocks')?.set('active', true)
    const zoom = editor.Canvas.getZoom()
    editor.Canvas.setZoom(`${zoom - 5}`)

    // @ts-ignore settings editor in the window object its only for development purpose
    window.editor = editor

    const style = document.createElement('style')
    style.innerHTML = `
      body, html {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }
    `
    document.head.appendChild(style)
    // Add the event listener for handling converting in chanakya for onPaste
    editor.Canvas.getDocument().addEventListener('paste', (event): void => {
      handlePasteForChanakyaConvert(event, editor.Canvas.getDocument())
    })

    return () => {
      editor.destroy()
      // Cleanup the added style when the component unmounts
      document.head.removeChild(style)
    }
  }, [id, config, onSave])

  return <div ref={editorRef} id={id} />
}
