import { memo, useMemo } from 'react'

import { useGetPublicUserPostByIdQuery } from '@/services/flow/publicPosts.service'
import { PATH, RequestLineLoader } from '@/shared'
import { Modal } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import { ProfilePost } from './profilePost/ProfilePost'

export const ProfilePostModal = memo(() => {
  const { push, query } = useRouter()

  const { postId, userId } = query

  const isModalOpen = useMemo(() => !!query.postId, [postId])

  function onOpenChange() {
    push({ pathname: `${PATH.PROFILE.BASEPROFILE}/${userId}` })
  }

  const { data, isLoading } = useGetPublicUserPostByIdQuery(postId as string, {
    skip: !isModalOpen,
  })

  return (
    <>
      {isLoading && <RequestLineLoader />}
      <Modal modalSize={'XL'} onOpenChange={onOpenChange} open={isModalOpen} showHeader={false}>
        <ProfilePost images={data?.images ?? []} />
      </Modal>
    </>
  )
})
