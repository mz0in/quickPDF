import { useEffect, useRef } from 'react'
import grapesjs, { Editor, Plugin } from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import '@renderer/styles/grapesjs.css'
import basicCustomPlugin from './plugins/blocksPlugin'
import zoomPlugin from './plugins/zoomPlugin'
import gjsImageEditorPlugin from 'grapesjs-tui-image-editor'
import parserPostCSS from 'grapesjs-parser-postcss'
import customComponents from './plugins/componentsPlugin'
import customRtePlugin from './plugins/customRte'
import grapesjsFontPlugin from './plugins/grapesjsFonts'
import gjsUserBlock from './plugins/usersBlock'
import '@renderer/styles/designer.css'
import './plugins/pageManger/css/grapesjs-project-manager.min.css'
import { handlePasteForChanakyaConvert } from '@renderer/services/utils'

/**
 * Props for the GrapesJS CoreEditor component.
 */
interface GrapesJSProps {
  /** Unique ID of the editor container. */
  id: string
  /** Additional configuration options for GrapesJS. */
  config?: any
  /**
   * Function to save the editor data. Process the data from the editor and pass it to the `onSave` callback.
   * @param editor GrapesJS editor instance.
   */
  onSaveFunction: (editor: Editor) => void
  /**
   * Dimensions of the canvas in centimeters.
   * Used to set the size of the paper in GrapesJS.
   */
  canvasSize: {
    /** Height of the canvas in centimeters. */
    height: number
    /** Width of the canvas in centimeters. */
    width: number
  }

  /** Flag to indicate if the editor is used for the Template Editor. there are two types of PDF and template. template are reusable component creator. if yes then you must have to set `pageManager` to `false`.
   * and if the component going to behave like a template editor you must have to provide pageManager
   * like `{pages: [{name: 'page 1',id: '1',styles:paperCode.css,component: paperCode.htmlBody}]}`
   * here paperCode is the raw code of the template to  edit
   */

  isTemplateEditor?: boolean

  /**
   * Page manager config for GrapesJS editor.
   * Default: `false` for template editors, empty object `{}` for paper editors, and leave empty for paper creators.
   */
  pageManager?:
    | {
        pages: Array<{ name: string; id: string; styles: string; component: string }>
      }
    | boolean

  /** Array of plugins to use in the editor. */
  customPlugins?: Plugin[]

  /** Plugin options for customPlugins. Default: `{}`. */
  customPluginOpts?: Record<string, any>
  /** GrapesJS project data to load in the editor. */
  gjsCode?: any
}

/**
 * GrapesJS Paper Core Component.
 * This component allows users to create and edit papers using the GrapesJS editor.
 * It provides options to customize the paper size, content, and more.
 */
export function CoreEditor({
  id,
  config,
  onSaveFunction,
  canvasSize,
  isTemplateEditor,
  pageManager = {
    pages: [
      {
        name: 'page 1',
        id: '1',
        styles: ``,
        component: ``
      }
    ]
  },
  customPlugins = [],
  customPluginOpts = {},
  gjsCode
}: GrapesJSProps): JSX.Element {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize GrapesJS editor with provided configuration
    const editor = grapesjs.init({
      container: `#${id}`,
      ...config,
      protectedCss: isTemplateEditor
        ? ''
        : `@page {margin: 15px; size: ${canvasSize?.width}cm ${canvasSize?.height}cm;}body{margin:0px !important;padding:0px;}p{margin: 0px !important; padding-top: 5px !important; padding-bottom: 5px !important;}h1,h2,h3,h4,h5,h6{margin:0px;}`,

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
      pageManager: pageManager,
      storageManager: false,
      plugins: [
        basicCustomPlugin,
        customComponents,
        grapesjsFontPlugin,
        gjsImageEditorPlugin,
        zoomPlugin,
        gjsUserBlock,
        customRtePlugin,
        parserPostCSS,
        ...customPlugins
      ],
      pluginsOpts: {
        // @ts-ignore gjsImage plugin is a JS plugin so can't support TS. but its working i checked
        // every thing
        [gjsImageEditorPlugin]: {
          config: {
            includeUI: {
              initMenu: 'filter'
            }
          }
        },
        ...customPluginOpts
      }
    })

    // load gjsCode if there any passed to editor
    if (gjsCode) {
      console.log('find gjsCode', gjsCode)
      editor.loadProjectData(gjsCode)
    }

    // set block manager default open
    editor.on('component:selected', () => {
      const openSmBtn = editor.Panels.getButton('views', 'open-sm')
      openSmBtn?.set('active', 1)
    })

    // expanding list after 3 seconds of init
    setTimeout(() => {
      try {
        editor.BlockManager.getCategories().each((ctg) => ctg.set('open', false))
      } catch (e) {
        console.log('element list unexpanded')
      }
    }, 3000)

    // save button
    editor.Panels.addButton('options', {
      id: 'save',
      className: 'fa fa-floppy-o',
      command: 'save',
      attributes: { title: 'Save' },
      category: 'Custom Category' // add a new category for the custom icon
    })

    // back button
    editor.Panels.addButton('options', {
      id: 'back',
      className: 'fa fa-arrow-left',
      command: 'goBack',
      attributes: { title: 'Back' }
    })

    if (pageManager) {
      // page manager button
      editor.Panels.addButton('views', {
        id: 'open-pages',
        className: 'fa fa-file-o',
        attributes: {
          title: 'pages'
        },
        command: 'open-pages',
        togglable: false
      })
    }

    // onsave functionality
    if (onSaveFunction) {
      editor.Commands.add('save', {
        run: (editor) => onSaveFunction(editor)
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
  }, [id, config, onSaveFunction])

  return <div ref={editorRef} id={id} />
}
