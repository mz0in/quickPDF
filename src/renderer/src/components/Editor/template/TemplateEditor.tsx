import { useEffect, useRef } from 'react'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import '@renderer/styles/grapesjs.css'
import basicCustomPlugin from '../plugins/blocksPlugin'
import zoomPlugin from '../plugins/zoomPlugin'
import gjsImageEditorPlugin from 'grapesjs-tui-image-editor'
import customComponents from '../plugins/componentsPlugin'
import customRtePlugin from '../plugins/customRte'
import grapesjsFontPlugin from '../plugins/grapesjsFonts'
import gjsUserBlock from '../plugins/usersBlock'
import '@renderer/styles/designer.css'
import '../plugins/pageManger/css/grapesjs-project-manager.min.css'
import type { htmlObject } from '..'

interface GrapesJSProps {
  id: string
  config?: any
  onSave?: (htmlObjects: htmlObject[]) => void
  canvasSize: {
    height: number
    width: number
  }
  paperCode: htmlObject
}

export function TemplateEditor({
  id,
  config,
  onSave,
  canvasSize,
  paperCode
}: GrapesJSProps): JSX.Element {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const editor = grapesjs.init({
      container: `#${id}`,
      ...config,
      protectedCss: '',
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
            name: `page 1`,
            id: `1`,
            styles: paperCode.css,
            component: paperCode.htmlBody
          }
        ]
      },
      storageManager: false,
      plugins: [
        // gjsBasicBlock,
        basicCustomPlugin,
        customComponents,
        grapesjsFontPlugin,
        gjsImageEditorPlugin,
        zoomPlugin,
        gjsUserBlock,
        customRtePlugin
      ],
      pluginsOpts: {
        // @ts-ignore it's a JS plugin can't support TS
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

          onSave(htmlStrings)
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

    // @ts-ignore setting editor in window only for development
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

    return () => {
      editor.destroy()
      // Cleanup the added style when the component unmounts
      document.head.removeChild(style)
    }
  }, [id, config, onSave])

  return <div ref={editorRef} id={id} />
}
