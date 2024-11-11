import { memo } from 'react'

import { PostsAssociativeArray } from '@/widgets'
import { PostsItem } from '@/widgets/profile/components/postsItem/PostsItem'
import { CloseIcon } from '@public/icons'
import { Modal } from '@technosamurai/techno-ui-kit'

import s from './ProfilePostModal.module.scss'

import { useProfilePostModal } from '../lib/hooks/useProfilePostModal'
import { PostComments } from './postComments/PostComments'
import { PostModalCloseWithConfirmation } from './postModalCloseWithConfirmation/PostModalCloseWithConfirmation'

interface IProps {
  postsAssociativeArray: PostsAssociativeArray
}

export const ProfilePostModal = memo(({ postsAssociativeArray }: IProps) => {
  const {
    close,
    confirmationModal,
    isModalOpen,
    postId,
    setCloseWithNotifyNotify,
    setConfirmationModal,
  } = useProfilePostModal()

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
        <PostComments className={s.postComments} onCommentChange={setCloseWithNotifyNotify} />
        <CloseIcon className={s.closeIcon} onClick={close} />
      </Modal>
      <PostModalCloseWithConfirmation
        onOpenChange={setConfirmationModal}
        open={confirmationModal}
        overlayClassName={s.confirmationModalOverlay}
      />
    </>
  )
})
