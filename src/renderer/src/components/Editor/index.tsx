import { PaperEditor } from './PaperEditor'
import { TemplateEditor } from './TemplateEditor'
import { PaperCreator } from './PaperCreator'

export interface htmlObject {
  head: string
  htmlBody: string
  css: string
}

export { PaperEditor, TemplateEditor, PaperCreator }
