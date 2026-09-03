import { ICmsPage } from '../../../redux/api/returnTypes'

export class ContentPageParser {
  data: ICmsPage

  constructor(data: ICmsPage) {
    this.data = data
  }

  getTitle(): string {
    return this.data.data.attributes.title
  }

  getBody(): string {
    const body = this.data.data.attributes.body
    // Handle if body is an object with value property (Drupal text format)
    if (typeof body === 'object' && body !== null && 'value' in body) {
      return body.value
    }
    // Handle if body is already a string
    if (typeof body === 'string') {
      return body
    }
    return ''
  }
}

export default ContentPageParser
