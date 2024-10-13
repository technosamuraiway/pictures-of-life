import { toast } from 'react-toastify'

import { useDeletePostMutation } from '@/services'

import { useRouterLocaleDefinition } from '../useRouterLocaleDefinition'

type serverError = {
  data: {
    error: string
    messages: { field: string; message: string }[]
  }
  status: number
}

export function useDeletePost() {
  const t = useRouterLocaleDefinition()
  const [
    deletePost,
    { isError: isErrorDeletePost, isLoading: isLoadingDeletePost, isSuccess: isSuccessDeletePost },
  ] = useDeletePostMutation({
    fixedCacheKey: 'deletePostKey',
  })

  const handleDeletePost = async (postID: number) => {
    try {
      await deletePost(postID).unwrap()
      toast.info(t.posts.successfulDeletePost)
    } catch (e: unknown) {
      const serverError = e as serverError

      if (serverError.status === 403 && serverError.data.messages.length > 0) {
        toast.error(t.posts.failToDeletePost)
      }
    }
  }

  return { handleDeletePost, isErrorDeletePost, isLoadingDeletePost, isSuccessDeletePost }
}
