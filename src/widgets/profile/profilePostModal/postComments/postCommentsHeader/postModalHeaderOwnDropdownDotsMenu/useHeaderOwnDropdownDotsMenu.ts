import { useState } from 'react'
import { toast } from 'react-toastify'

import { useDeletePostMutation, useLazyGetUserPublicPostsQuery } from '@/services'
import { useRouterLocaleDefinition } from '@/shared'
import { useRouter } from 'next/router'

export function useHeaderOwnDropdownDotsMenu() {
  const t = useRouterLocaleDefinition()
  const { push, query } = useRouter()
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

  return {
    deletePostRequestHandler,
    isConfirmationModalOpen,
    isLoading,
    isOpen,
    setIsConfirmationModalOpen,
    setIsOPen,
    t,
  }
}
