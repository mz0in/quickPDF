import { useEffect, useRef } from 'react'
import grapesjs, { Plugin } from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import '@renderer/styles/grapesjs.css'
import basicCustomPlugin from './plugins/blocksPlugin'
import zoomPlugin from './plugins/zoomPlugin'
import gjsImageEditorPlugin from 'grapesjs-tui-image-editor'
import parserPostCSS from 'grapesjs-parser-postcss'
import customComponents from './plugins/componentsPlugin'
import customRtePlugin from './plugins/customRte'
import localBlocks from './plugins/localBlocks'
import grapesjsFontPlugin from './plugins/grapesjsFonts'
import grapesjsPageManagerPlugin from './plugins/pageManger'
import gjsUserBlock from './plugins/usersBlock'
import '@renderer/styles/designer.css'
import './plugins/pageManger/css/grapesjs-project-manager.min.css'
import type { HtmlObject } from '.'
import { handlePasteForChanakyaConvert } from '@renderer/services/utils'

interface GrapesJSProps {
  /** Unique ID of the editor container. */
  id: string
  /** Additional configuration options for GrapesJS. */
  config?: any
  /**
   * Callback function triggered when the editor content is saved.
   *
   * @param htmlObjects - An array of HTML objects representing each page's content and CSS.
   * @param gjsCode - The full GrapesJS project data, including components and styles.
   */
  onSave?: (htmlObjects: HtmlObject[], gjsCode: any) => void
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
  /** Company name used for local blocks. */
  companyName: string

  /** using for Editor? customize the behavior of GrapesJS for paper editors */
  isEditor?: boolean

  /**
   * page manager config for GrapesJS editor
   * default: false for templateEditors
   * empty {} for paperEditors
   * leave empty for paperCreators
   */
  pageManager?:
    | {
        pages: any[] // {name: string, id: string, styles: string, component: string}
      }
    | boolean

  /** array of plugins that are going to use in different editors */
  customPlugins?: Plugin[]

  /**plugin options for customPlugins
   * default {}
   */
  customPluginOpts?: any
}

/**
 * GrapesJS Paper Creator Component.
 * This component allows users to create and edit papers using the GrapesJS editor.
 * It provides options to customize the paper size, content, and more.
 */
export function CoreEditor({
  id,
  config,
  onSave,
  canvasSize,
  companyName,
  isEditor,
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
  customPluginOpts = {}
}: GrapesJSProps): JSX.Element {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize GrapesJS editor with provided configuration
    const editor = grapesjs.init({
      container: `#${id}`,
      ...config,
      protectedCss: isEditor
        ? ''
        : `@page {margin: 15px; size: ${canvasSize?.width}cm ${canvasSize?.height}cm;}body{margin:0px !important;padding:0px;}p{margin: 0px !important; padding-top: 5px !important; padding-bottom: 5px !important;}h1,h2,h3,h4,h5,h6{margin:0px;}`,

      cssComposer: {
        stylePrefix: 'qpdf-',
        rules: isEditor ? '' : "*{font-family: 'chanakya';}h1{font-family: 'roboto';}"
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
        localBlocks,
        parserPostCSS,
        ...customPlugins
      ],
      pluginsOpts: {
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
        },
        ...customPluginOpts
      }
    })

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
    if (onSave) {
      editor.Commands.add('save', {
        run: () => {
          // saveing all pages code into array
          const allPages = editor.Pages.getAll()
          // htmlStrings contains html,css of all the pages in array format
          const htmlStrings: HtmlObject[] = allPages.map((page) => {
            const component = page.getMainComponent()
            const body = editor.getHtml({ component })
            const css = editor.getCss({ component })

            return {
              htmlBody: body,
              css: css
            }
          }) as HtmlObject[]

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
