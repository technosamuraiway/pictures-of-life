import { memo } from 'react'

import { useRouterLocaleDefinition } from '@/shared'
import { PostsAssociativeArray } from '@/widgets'
import { ConfirmationModal } from '@/widgets/profile/components/confirmationModal/confirmationModal'
import { PostsItem } from '@/widgets/profile/components/postsItem/PostsItem'
import { EditProfileModal } from '@/widgets/profile/profilePostModal/editProfileModal/EditProfileModal'
import { CloseIcon } from '@public/icons'
import { Modal } from '@technosamurai/techno-ui-kit'

import s from './ProfilePostModal.module.scss'

import { useProfilePostModal } from '../lib/hooks/useProfilePostModal'
import { useEditProfileModalStore } from './editProfileModal/useEditProfileModalStore'
import { PostComments } from './postComments/PostComments'

interface IProps {
  postsImagesAssociativeArray: PostsAssociativeArray
}

export const ProfilePostModal = memo(({ postsImagesAssociativeArray }: IProps) => {
  const t = useRouterLocaleDefinition()

  const { isOpen } = useEditProfileModalStore()

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
          images={postsImagesAssociativeArray[postId as string]}
          imgHeight={562}
          imgWidth={490}
          postId={Number(postId)}
          rootCN={s.postsItem}
        />

        <PostComments className={s.postComments} onCommentChange={setCloseWithNotifyNotify} />

        {!isOpen && <CloseIcon className={s.closeIcon} onClick={close} />}
      </Modal>

      {/* close confirmation */}
      <ConfirmationModal
        confirmMessage={t.profile.modal.confirmation.message}
        headerTitle={t.profile.modal.confirmation.modalHeaderTitle}
        onOpenChange={setConfirmationModal}
        open={confirmationModal}
        overlayClassName={s.confirmationModalOverlay}
      />

      {/* open editPost modal */}
      <EditProfileModal
        images={postsImagesAssociativeArray[postId as string]}
        postId={postId as string}
      />
    </>
  )
})
