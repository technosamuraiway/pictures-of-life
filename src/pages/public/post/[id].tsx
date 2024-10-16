import { useMemo, useState } from 'react'

import PostModal from '@/entities/modals/publicPostModal/PostModal'
import { useGetUserPublicPostsQuery } from '@/services/flow/post.service'
import { MetaHead, PATH } from '@/shared'
import { getBaseLayout } from '@/widgets'
import { useRouter } from 'next/router'

import s from './[id].module.scss'

const PublicPostPage = () => {
  const router = useRouter()
  const { id, userId } = router.query
  const [isModalOpen, setIsModalOpen] = useState(false)

  
  
  const { data: userPosts, isLoading } = useGetUserPublicPostsQuery({
    params: {},
    userId: Number(userId),
  })

  const post = useMemo(() => {
    const isPost = userPosts?.items.find(p => p.id === Number(id))

    setIsModalOpen(true)

    return isPost
  },[userPosts, id])
  const handleModalClose = () => {
    setIsModalOpen(false)
    
  }

  if (isLoading) {
    return <div>Loading post...</div>
  }

  return (
    <div>
    <MetaHead title={'Public User Page'} />
    <div className={s.container}>
      {post && (
        <div className={s.postContent}>
          <h2 className={s.username}>{post.userName}</h2>

          <div className={s.imageContainer}>
            {post.images.map((image, index) => (
              <img
                alt={`post-image-${index}`}
                className={s.postImage}
                key={index}
                src={image.url}
              />
            ))}
          </div>

          <p className={s.description}>{post.description}</p>
        </div>
      )}

      {post && (
        <PostModal isOpen={isModalOpen} onRequestClose={handleModalClose} post={post} />
      )}
    </div>
  </div>
  )
}

PublicPostPage.getLayout = getBaseLayout
export default PublicPostPage
