import { useEffect, useMemo } from 'react'

import { useGetLatestMessengersQuery } from '@/services'
import { useDialogListStore, useRouterLocaleDefinition, useSearchBySearchName } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'

const PAGE_SIZE = 50

export const useDialogsData = () => {
  const t = useRouterLocaleDefinition()
  const { changeSearchHandler, searchTerm } = useSearchBySearchName()

  const { meData: meRequestData } = useMeWithRouter()

  const {
    isDialogListRefetching,
    latestMessages,
    setLatestMessages,
    switchDialogListRefetchingFalse,
  } = useDialogListStore()

  const { data: getLatestMessengersData, refetch } = useGetLatestMessengersQuery({
    pageSize: PAGE_SIZE,
    searchName: searchTerm,
  })

  useEffect(() => {
    if (isDialogListRefetching) {
      refetch()
      switchDialogListRefetchingFalse()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDialogListRefetching, refetch, switchDialogListRefetchingFalse])

  useEffect(() => {
    if (getLatestMessengersData && meRequestData) {
      setLatestMessages(getLatestMessengersData, meRequestData.userId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLatestMessengersData, setLatestMessages])

  const sortedDialogs = useMemo(() => {
    if (!latestMessages) {
      return []
    }

    return Object.values(latestMessages.messages).sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    })
  }, [latestMessages])

  return { changeSearchHandler, searchTerm, sortedDialogs, t }
}
