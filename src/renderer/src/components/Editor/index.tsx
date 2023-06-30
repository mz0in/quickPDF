import { PaperEditor } from './paper/PaperEditor'
import { PaperCreator } from './paper/PaperCreator'
import { TemplateCreator } from './template/TemplateCreator'
import { TemplateEditor } from './template/TemplateEditor'

/**
 * head, body and css of html page
 */
export interface htmlObject {
  head: string
  htmlBody: string
  css: string
}

export { PaperEditor, TemplateCreator, PaperCreator, TemplateEditor }
