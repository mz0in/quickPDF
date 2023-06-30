import { useEffect, useRef } from 'react'
// @ts-ignore
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import '@renderer/styles/grapesjs.css'
// import gjsBasicBlock from 'grapesjs-blocks-basic'
import basicCustomPlugin from '../plugins/blocksPlugin'
import zoomPlugin from '../plugins/zoomPlugin'
import gjsImageEditorPlugin from 'grapesjs-tui-image-editor'
// import basicCustomPlugin from './plugins/blocksPlugin'
import customComponents from '../plugins/componentsPlugin'
import customRtePlugin from '../plugins/customRte'
// import './plugins/tinymceEditor.js'
// @ts-ignore
import grapesjsFontPlugin from '../plugins/grapesjsFonts'
// @ts-ignore
import grapesjsPageManagerPlugin from '../plugins/pageManger'
import gjsUserBlock from '../plugins/usersBlock'
import '@renderer/styles/designer.css'
import '../plugins/pageManger/css/grapesjs-project-manager.min.css'
import type { htmlObject } from '..'

interface GrapesJSProps {
  id: string
  config?: any
  onSave?: (htmlObjects: htmlObject[], pageHead: string) => void
  canvasSize: {
    height: number
    width: number
  }
}

export function PaperCreator({ id, config, onSave, canvasSize }: GrapesJSProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const editor = grapesjs.init({
      container: `#${id}`,
      ...config,
      // protectedCss: "@page {margin: 0;}body{margin:0px !important;padding:0px;}p{margin: 0px !important; padding-top: 5px !important; padding-bottom: 5px !important;}",
      deviceManager: {
        devices: [
          {
            id: 'paper',
            name: 'paper',
            width: `${canvasSize?.width}in`,
            height: `${canvasSize?.height}in`
          }
        ]
      },
      pageManager: {
        pages: [
          {
            name: 'page 1',
            id: '1',
            styles: ``,
            component: '' // or a JSON of components
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
        customRtePlugin
      ],
      pluginsOpts: {
        [grapesjsFontPlugin]: {
          // api_key: "AIzaSyBIbeXm8jJu47tuBj2ubDzjLlLgAmtD07s"
          api_key: 'AIzaSyAdJTYSLPlKz4w5Iqyy-JAF2o8uQKd1FKc'
        },
        [grapesjsPageManagerPlugin]: {
          width: `${canvasSize?.width}in`, // new page width
          height: `${canvasSize?.height}in` // new page height
        }
      }
    })

    setTimeout(() => {
      // @ts-ignore
      try {
        editor.BlockManager.getCategories().each((ctg) => ctg.set('open', false))
      } catch (e) {
        console.log("element list unexpanded")
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
          let allPages = editor.Pages.getAll()
          // htmlStrings contains html,css of all the pages in array format
          let htmlStrings: htmlObject[] = allPages.map((page) => {
            const component = page.getMainComponent()
            const body = editor.getHtml({ component })
            const css = editor.getCss({ component })

            return {
              htmlBody: body,
              css: css
            }
          }) as htmlObject[]

          /**
           * fontPropertyOfHead contains innerHTML of canvas head
           * that contains html code for linking of fonts
           * defined at: /plugins/grapesjsFonts/fonts.js#L348-L349
           */
          // @ts-ignore
          let pageHead = editor.Canvas.getDocument().head.innerHTML

          onSave(htmlStrings, pageHead)
        }
      })
    }

    editor.Commands.add('goBack', {
      run: () => {
        history.back();
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
    editor.Panels.getButton('views', 'open-blocks').set('active', true)

    // @ts-ignore
    window.editor = editor

    document.head.insertAdjacentHTML(
      'beforeend',
      '<style>body,html {height: 100%;margin: 0;padding: 0;overflow: hidden;}</style>'
    )

    return () => {
      editor.destroy()
    }
  }, [id, config, onSave])

  return <div ref={editorRef} id={id} />
}
