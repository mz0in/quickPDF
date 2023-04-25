import { PaperEditor } from './PaperEditor'
import { TemplateEditor } from './TemplateEditor'

export interface htmlObject {
  head: string
  htmlBody: string
  css: string
}

export interface PageSize {
  width: number; 
  height: number 
}

export { PaperEditor, TemplateEditor }
