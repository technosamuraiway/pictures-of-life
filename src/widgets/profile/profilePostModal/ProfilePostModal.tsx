import { memo, useMemo } from 'react'

import { PATH } from '@/shared'
import { PostsAssociativeArray } from '@/widgets'
import { PostsItem } from '@/widgets/profile/components/postsItem/PostsItem'
import { Modal } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from './ProfilePostModal.module.scss'

import { PostComments } from './postComments/PostComments'

interface IProps {
  postsAssociativeArray: PostsAssociativeArray
}

export const ProfilePostModal = memo(({ postsAssociativeArray }: IProps) => {
  const { push, query } = useRouter()

  const { postId, userId } = query

  const isModalOpen = useMemo(() => !!postId, [postId])

  function onOpenChange() {
    push({ pathname: `${PATH.PROFILE.BASEPROFILE}/${userId}` })
  }

  if (!postId) {
    return null
  }

  return (
    <>
      <Modal
        contentClassName={s.root}
        modalSize={'XL'}
        onOpenChange={onOpenChange}
        open={isModalOpen}
        showHeader={false}
      >
        123
        {/*<PostImageItem images={postsAssociativeArray[postId as string]} />*/}
        {/*<PostsItem*/}
        {/*  images={postsAssociativeArray[postId as string]}*/}
        {/*  imgHeight={563}*/}
        {/*  imgWidth={490}*/}
        {/*  postId={Number(postId)}*/}
        {/*  rootCN={s.postsItem}*/}
        {/*/>*/}
        {/*<PostComments />*/}
      </Modal>
    </>
  )
})
