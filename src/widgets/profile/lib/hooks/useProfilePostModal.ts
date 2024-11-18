import { useMemo, useState } from 'react'

import { PATH } from '@/shared'
import { useRouter } from 'next/router'

export function useProfilePostModal() {
  const [isCloseWithNotify, setCloseWithNotifyNotify] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(false)
  const { push, query } = useRouter()

  const { postId, userId } = query

  const isModalOpen = useMemo(() => !!postId, [postId])

  function close() {
    if (isCloseWithNotify) {
      setConfirmationModal(true)
    } else {
      push({ pathname: `${PATH.PROFILE.BASEPROFILE}/${userId}` })
    }
  }

  return {
    close,
    confirmationModal,
    isModalOpen,
    postId,
    setCloseWithNotifyNotify,
    setConfirmationModal,
  }
}
