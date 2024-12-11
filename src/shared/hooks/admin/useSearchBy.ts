import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export const useSearchBy = (
  setSearchTerm: Dispatch<SetStateAction<string>>,
  setEndCursorPostId?: Dispatch<SetStateAction<null | number>>
) => {
  const changeSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setEndCursorPostId && setEndCursorPostId(0)
    setSearchTerm(value)
  }

  return { changeSearchHandler }
}
