import { useState } from 'react'
import { toast } from 'react-toastify'

import { useDeletePostMutation, useLazyGetUserPublicPostsQuery } from '@/services'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { ConfirmationModal } from '@/widgets/profile/components/confirmationModal/confirmationModal'
import { DropdownDotsIcon } from '@public/DropdownDotsIcon'
import { DeleteIcon, EditIcon } from '@public/icons'
import { Dropdown, Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'

import s from '../postModalHeaderDropdownDotsMenu/PostModalHeaderDropdownDotsMenu.module.scss'

export const PostModalHeaderOwnDropdownDotsMenu = () => {
  const t = useRouterLocaleDefinition()
  const { query } = useRouter()
  const { postId, userId } = query
  const [isOpen, setIsOPen] = useState(false)
  const [deletePost, { isLoading }] = useDeletePostMutation()
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)

  const [getPostsTrigger] = useLazyGetUserPublicPostsQuery()

  async function deletePostRequestHandler() {
    const allPostsLength = sessionStorage.getItem('postsNumber')

    try {
      await deletePost(Number(postId))

      if (allPostsLength) {
        await getPostsTrigger({ pageSize: Number(allPostsLength), userId: Number(userId) })
      }

      toast.success(t.profile.modal.headerDropdownOwnDotsMenu.deleteSuccess)
    } catch (error) {
      toast.error(t.profile.modal.headerDropdownOwnDotsMenu.deleteError)
    }
  }

  return (
    <>
      {isLoading && <RequestLineLoader />}
      <Dropdown.Root
        contentCN={s.root}
        onOpenChange={setIsOPen}
        open={isOpen}
        trigger={<DropdownDotsIcon />}
        withArrow={false}
      >
        <Dropdown.Item className={s.item}>
          <EditIcon />
          <Typography variant={'regular-text-14'}>
            {t.profile.modal.headerDropdownOwnDotsMenu.edit}
          </Typography>
        </Dropdown.Item>
        <Dropdown.Item className={s.item} onClick={() => setIsConfirmationModalOpen(true)}>
          <DeleteIcon />
          <Typography variant={'regular-text-14'}>
            {t.profile.modal.headerDropdownOwnDotsMenu.delete}
          </Typography>
        </Dropdown.Item>
      </Dropdown.Root>

      <ConfirmationModal
        cbOnConfirm={deletePostRequestHandler}
        confirmMessage={t.profile.modal.headerDropdownOwnDotsMenu.deleteConfirmation}
        headerTitle={t.profile.modal.headerDropdownOwnDotsMenu.deleteModalTitle}
        onOpenChange={setIsConfirmationModalOpen}
        open={isConfirmationModalOpen}
        overlayClassName={s.confirmationModalOverlay}
      />
    </>
  )
}
