import { useMemo } from 'react'

import { PATH, useRouterLocaleDefinition } from '@/shared'
import { Modal } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from '@/widgets/profile/profilePostModal/ProfilePostModal.module.scss'

interface IProps {}

export const EditPostModal = ({}: IProps) => {
  const t = useRouterLocaleDefinition()

  const { push, query } = useRouter()

  const { editPost, postId, userId } = query

  const isModalOpen = useMemo(() => !!editPost, [editPost])

  function close() {
    push({ pathname: `${PATH.PROFILE.BASEPROFILE}/${query.userId}`, query: { postId } })
  }

  // function open() {
  //   push({ pathname: `${PATH.PROFILE.BASEPROFILE}/${query.userId}`, query: { postId, editPost } })
  // }

  return (
    <>
      <Modal
        contentClassName={s.root}
        headerTitle={t.profile.modal.headerDropdownOwnDotsMenu.editDescription.headerTitle}
        modalSize={'XL'}
        onOpenChange={close}
        open={isModalOpen}
      >
        123
      </Modal>
    </>
  )
}
