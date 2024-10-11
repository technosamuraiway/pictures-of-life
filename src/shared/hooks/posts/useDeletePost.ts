import { toast } from 'react-toastify'

import { useDeletePostMutation } from '@/services'

import { useRouterLocaleDefinition } from '../useRouterLocaleDefinition'

export function useDeletePost() {
  const t = useRouterLocaleDefinition()
  const [
    deletePost,
    { isError: isErrorDeletePost, isLoading: isLoadingDeletePost, isSuccess: isSuccessDeletePost },
  ] = useDeletePostMutation()

  const handleDeletePost = async (postID: number) => {
    await deletePost(postID).unwrap()
    toast.info(t.posts.successfulDeletePost)
  }

  return { handleDeletePost, isErrorDeletePost, isLoadingDeletePost, isSuccessDeletePost }
}
