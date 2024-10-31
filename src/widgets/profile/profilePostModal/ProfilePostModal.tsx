import { memo, useMemo } from 'react'

import { PostsAssociativeArray } from '@/widgets'
import { PostsItem } from '@/widgets/profile/components/postsItem/PostsItem'
import { Modal } from '@technosamurai/techno-ui-kit'

import s from './ProfilePostModal.module.scss'

import { useCloseProfilePostModalWithRouter } from '../lib/hooks/useCloseProfilePostModalWithRouter'
import { PostComments } from './postComments/PostComments'

interface IProps {
  postsAssociativeArray: PostsAssociativeArray
}

export const ProfilePostModal = memo(({ postsAssociativeArray }: IProps) => {
  const { close, query } = useCloseProfilePostModalWithRouter()

  const { postId } = query

  const isModalOpen = useMemo(() => !!postId, [postId])

  if (!postId) {
    return null
  }

  return (
    <>
      <Modal
        contentClassName={s.root}
        modalSize={'XL'}
        onOpenChange={close}
        open={isModalOpen}
        showHeader={false}
      >
        <PostsItem
          images={postsAssociativeArray[postId as string]}
          imgHeight={562}
          imgWidth={490}
          postId={Number(postId)}
          rootCN={s.postsItem}
        />
        <PostComments rootCN={s.postComments} />
      </Modal>
    </>
  )
})
