import { useRouter } from 'next/router'

export const useSuperPagination = (initialItemsPerPage: number[]) => {
  const router = useRouter()

  const optionsItemsPerPage = initialItemsPerPage

  const getValue = (key: string, defaultValue: string): string => {
    return (router.query[key] as string) ?? sessionStorage.getItem(key) ?? defaultValue
  }

  const saveToSessionStorage = (currentPage: string, itemsPerPage: string) => {
    sessionStorage.setItem('currentPage', currentPage)
    sessionStorage.setItem('itemsPerPage', itemsPerPage)
  }

  const currentPage = getValue('currentPage', '1')
  const itemsPerPage = getValue('itemsPerPage', `${optionsItemsPerPage[0]}`)

  saveToSessionStorage(currentPage, itemsPerPage)

  function currentPageHandler(value: number) {
    const newValue = value.toString()

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, currentPage: newValue },
      },
      undefined,
      { shallow: true }
    )
    saveToSessionStorage(newValue, itemsPerPage)
  }

  function perPageHandler(value: number) {
    const newValue = value.toString()

    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, currentPage: '1', itemsPerPage: newValue },
      },
      undefined,
      { shallow: true }
    )
    saveToSessionStorage('1', newValue)
  }

  return {
    currentPage,
    currentPageHandler,
    itemsPerPage,
    optionsItemsPerPage,
    perPageHandler,
  }
}
