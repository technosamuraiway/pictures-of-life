import { memo, useMemo } from 'react'

import { PATH } from '@/shared'
import { PostsAssociativeArray } from '@/widgets'
import { Modal } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import { PostComments } from './postComments/PostComments'
import { PostImageItem } from './postImageItem/PostImageItem'

interface iProps {
  postsAssociativeArray: PostsAssociativeArray
}

export const ProfilePostModal = memo(({ postsAssociativeArray }: iProps) => {
  const { push, query } = useRouter()

  const { postId, userId } = query

  const isModalOpen = useMemo(() => !!postId, [postId])

  function onOpenChange() {
    push({ pathname: `${PATH.PROFILE.BASEPROFILE}/${userId}` })
  }

  // const { data, isLoading } = useGetPublicUserPostByIdQuery(postId as string, {
  //   skip: !isModalOpen,
  // })

  return (
    <>
      {/*{isLoading && <RequestLineLoader />}*/}
      <Modal modalSize={'XL'} onOpenChange={onOpenChange} open={isModalOpen} showHeader={false}>
        <PostImageItem images={postsAssociativeArray[postId as string]} />
        <PostComments />
      </Modal>
    </>
  )
})
