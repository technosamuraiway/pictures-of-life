import { uniqBy } from 'lodash'

export const getUniqueItemsById = (items: any[]) => {
  return uniqBy(items, 'id')
}
