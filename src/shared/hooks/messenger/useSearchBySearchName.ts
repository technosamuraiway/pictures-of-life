import { Dispatch, SetStateAction, useState } from 'react'

import { useSearchBy } from '../admin/useSearchBy'

export const useSearchBySearchName = (
  setEndCursorPostId?: Dispatch<SetStateAction<null | number>>
) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { changeSearchHandler } = useSearchBy(setSearchTerm, setEndCursorPostId)

  return { changeSearchHandler, searchTerm }
}
