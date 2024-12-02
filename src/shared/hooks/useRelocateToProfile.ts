import { Dispatch, SetStateAction, useState } from 'react'

import { PATH, useGetUserIdFromParams } from '@/shared'

export const useRelocateToProfile = (setOpenModal: Dispatch<SetStateAction<boolean>>) => {
  const [isLoadingRelocate, setIsLoadingRelocate] = useState(false)
  const { push, userId } = useGetUserIdFromParams()

  const navigateToProfileHandler = async (id: string) => {
    setIsLoadingRelocate(true)

    try {
      await push(`${PATH.PROFILE.BASEPROFILE}/${id}`)

      setOpenModal(false)
    } finally {
      setIsLoadingRelocate(false)
    }
  }

  return { isLoadingRelocate, navigateToProfileHandler, userId }
}
