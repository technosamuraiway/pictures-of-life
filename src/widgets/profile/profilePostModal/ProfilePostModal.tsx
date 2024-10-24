import { memo, useMemo } from 'react'

import { PATH } from '@/shared'
import { Modal } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

export const ProfilePostModal = memo(() => {
  const { push, query } = useRouter()

  const isModalOpen = useMemo(() => !!query.postId, [query.postId])

  function onOpenChange() {
    push({ pathname: `${PATH.PROFILE.BASEPROFILE}/${query.userId}` })
  }

  return (
    <Modal modalSize={'XL'} onOpenChange={onOpenChange} open={isModalOpen} showHeader={false}>
      {query.postId}
    </Modal>
  )
})
