import { useState } from 'react'
import { toast } from 'react-toastify'

import { IAdminPost, PATH, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { useRouter } from 'next/router'

import s from './AdminPost.module.scss'

import { AdminDescriptionPost } from './adminDescriptionPost/AdminDescriptionPost'
import { AdminOwnerPost } from './adminOwnerPost/AdminOwnerPost'
import { SliderAdminPost } from './sliderAdminPost/SliderAdminPost'

interface IProps {
  post: IAdminPost
}

export const AdminPost = ({ post }: IProps) => {
  const t = useRouterLocaleDefinition()
  const { push } = useRouter()
  const [isRedirectLoading, setIsRedirectLoading] = useState(false)
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({})

  const redirectToPublicPost = async () => {
    setIsRedirectLoading(true)

    try {
      await push({
        pathname: `${PATH.PROFILE.BASEPROFILEWITHQUERY}/`,
        query: { postId: post.id, userId: post.postOwner.id },
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
        <SliderAdminPost
          expandedPosts={expandedPosts}
          id={post.id}
          images={post.images || []}
          onImageClick={redirectToPublicPost}
        />
        <AdminOwnerPost postOwner={post.postOwner} />
        <AdminDescriptionPost
          createdAt={post.createdAt}
          description={post.description}
          expandedPosts={expandedPosts}
          id={post.id}
          setExpandedPosts={setExpandedPosts}
        />
      </div>
    </>
  )
}
