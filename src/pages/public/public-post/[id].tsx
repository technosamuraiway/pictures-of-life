import { useEffect, useState } from 'react'

import PostModal from '@/entities/modals/publicPostModal/PostModal'
import { useGetUserPublicPostsQuery } from '@/services/flow/post.service'
import { IPostUser } from '@/services/types/post.types'
import { MetaHead, PATH } from '@/shared'
import { getBaseLayout } from '@/widgets'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './[id].module.scss'

const PublicPostPage = () => {
  const router = useRouter()
  const { id, userId } = router.query
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [selectedPost, setSelectedPost] = useState<IPostUser | null>(null)
  
  const { data: userPosts, isLoading } = useGetUserPublicPostsQuery({
    params: {},
    userId: Number(userId),
  })

  useEffect(() => {
    if (id && userPosts) {
      const post = userPosts.items.find(p => p.id === Number(id))

      if (post) {
        setSelectedPost(post)
        setIsModalOpen(true) 
      }
    }
  }, [id, userPosts])

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
        

        {selectedPost && (
          <div className={s.postContent}>
            <h2 className={s.username}>{selectedPost.userName}</h2>

            <div className={s.imageContainer}>
              {selectedPost.images.map((image, index) => (
                <img
                  alt={`post-image-${index}`}
                  className={s.postImage}
                  key={index}
                  src={image.url}
                />
              ))}
            </div>

            <p className={s.description}>{selectedPost.description}</p>
          </div>
        )}

        {selectedPost && (
          <PostModal isOpen={isModalOpen} onRequestClose={handleModalClose} post={selectedPost} />
        )}
      </div>
    </div>
  )
}

PublicPostPage.getLayout = getBaseLayout
export default PublicPostPage
