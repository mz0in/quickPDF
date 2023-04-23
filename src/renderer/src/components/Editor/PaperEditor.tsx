import { useEffect, useRef } from 'react'
// @ts-ignore
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import gjsBasicBlock from 'grapesjs-blocks-basic'
import gjsPluginExport from 'grapesjs-plugin-export'
import basicCustomPlugin from './plugins/blocksPlugin'
// @ts-ignore
import grapesjsFontPlugin from './plugins/grapesjsFonts'
// @ts-ignore
import grapesjsPageManagerPlugin from './plugins/pageManger'
import '@renderer/styles/designer.css'
import './plugins/pageManger/css/grapesjs-project-manager.min.css'
import type { htmlObject } from '.'

interface GrapesJSProps {
  id: string
  config?: any
  onSave?: (htmlObjects: htmlObject[]) => void
  canvasSize: {
    height: number
    width: number
  }
}

export function PaperEditor({ id, config, onSave, canvasSize }: GrapesJSProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const editor = grapesjs.init({
      container: `#${id}`,
      ...config,
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
        gjsBasicBlock,
        basicCustomPlugin,
        grapesjsFontPlugin,
        gjsPluginExport,
        grapesjsPageManagerPlugin
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

    editor.Panels.addButton('options', {
      id: 'save',
      className: 'fa fa-floppy-o',
      command: 'save',
      attributes: { title: 'Save' },
      category: 'Custom Category' // add a new category for the custom icon
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
          let htmlStrings: htmlObject[] = allPages.map((page) => {
            const component = page.getMainComponent()
            const html = editor.getHtml({ component })
            const css = editor.getCss({ component })

            return {
              htmlBody: editor.getHtml({ component }),
              css: editor.getCss({ component })
            }
          }) as htmlObject[]

          onSave(htmlStrings)
        }
      })
    }

    // @ts-ignore
    window.editor = editor

    return () => {
      editor.destroy()
    }
  }, [id, config, onSave])

  return <div ref={editorRef} id={id} />
}
