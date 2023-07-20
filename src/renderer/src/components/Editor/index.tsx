import { PaperEditor } from './paper/PaperEditor'
import { PaperCreator } from './paper/PaperCreator'
import { TemplateCreator } from './template/TemplateCreator'
import { TemplateEditor } from './template/TemplateEditor'

/**
 * Represents the HTML content and CSS styling of a page.
 */
export interface HtmlObject {
  /** The HTML content of the page. */
  htmlBody: string
  /** The CSS styling for the HTML content. */
  css: string
}

/**
 * Components for GrapesJS Editor and Creator.
 * @module GrapesJS
 */
export { PaperEditor, TemplateCreator, PaperCreator, TemplateEditor }
