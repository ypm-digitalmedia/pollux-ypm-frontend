import { OverlayKey } from '../../config/cms'
import { useGetDescriptiveTextQuery } from '../../redux/api/cmsApi'

/**
 * Retrieves and returns text used for results page descriptions.
 * @param {OverlayKey} value the name of the page used for retrieving the CMS data
 * @returns {string | null}
 */
const EntityResultsDescription = (value: OverlayKey): string | null => {
  const { isSuccess, data } = useGetDescriptiveTextQuery({
    overlay: value,
  })

  if (isSuccess && data) {
    if (data.data.hasOwnProperty('attributes')) {
      const body = data.data.attributes.body
      // Handle if body is an object with value property (Drupal text format)
      if (typeof body === 'object' && body !== null && 'value' in body) {
        return body.value
      }
      // Handle if body is already a string
      if (typeof body === 'string') {
        return body
      }
    }
    return null
  }

  return null
}

export default EntityResultsDescription
