import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export const useSearchBy = (setSearchTerm: Dispatch<SetStateAction<string>>) => {
  const changeSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearchTerm(value)
  }

  return { changeSearchHandler }
}
