import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react'

export const useSearchBy = (
  refetch: () => void,
  setSearchTerm: Dispatch<SetStateAction<string>>
) => {
  // eslint-disable-next-line no-undef
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)

  const changeSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    setSearchTerm(value)

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current)
    }

    debounceTimeout.current = setTimeout(() => {
      refetch()
    }, 1000)
  }

  return { changeSearchHandler }
}
