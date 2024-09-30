import { toast } from 'react-toastify'

import { useDeletePostMutation } from '@/services'
import { useRouter } from 'next/router'

import { PATH } from '../../utils'
import { useRouterLocaleDefinition } from '../useRouterLocaleDefinition'

export function useDeletePost() {
  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const [
    deletePost,
    { isError: isErrorDeletePost, isLoading: isLoadingDeletePost, isSuccess: isSuccessDeletePost },
  ] = useDeletePostMutation()

  const handleLogout = async () => {
    const qustionAboutDelete = prompt(t.posts.qustionAboutDelete);
    if(!qustionAboutDelete) return;
    await deletePost().unwrap()

    // router.replace(PATH) // here will be a path of router after deleting of post

    toast.info(t.posts.successfulDeletePost)
  }

  return { handleLogout, isErrorDeletePost, isLoadingDeletePost, isSuccessDeletePost }
}
