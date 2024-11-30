import { useState } from 'react'
import { toast } from 'react-toastify'

import { IAdminPost, PATH, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { useRouter } from 'next/router'

import s from './AdminPost.module.scss'

import { SliderAdminPost } from './sliderAdminPost/SliderAdminPost'

interface IProps {
  post: IAdminPost
}

export const AdminPost = ({ post }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { push } = useRouter()
  const [isRedirectLoading, setIsRedirectLoading] = useState(false)

  const redirectToPublicPost = async () => {
    setIsRedirectLoading(true)

    try {
      await push({
        pathname: `${PATH.PROFILE.BASEPROFILEWITHQUERY}/`,
        query: { postId: 3032, userId: 1480 },
      })
    } catch (err) {
      toast.error(t.admin.postsList.noUserOrPost)
    } finally {
      setIsRedirectLoading(false)
    }
  }

  return (
    <>
      {isRedirectLoading && <RequestLineLoader />}
      <div className={s.wrapper}>
        <SliderAdminPost images={post.images || []} onImageClick={redirectToPublicPost} />
      </div>
    </>
  )
}
