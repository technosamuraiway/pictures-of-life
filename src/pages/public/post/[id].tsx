import { useMemo, useState } from 'react'

import { PostModal } from '@/entities/modals/publicPostModal/PostModal'
import { useGetUserPublicPostsQuery } from '@/services/flow/post.service'
import { MetaHead, RequestLineLoader } from '@/shared'
import { getBaseLayout } from '@/widgets'
import { Typography } from '@technosamurai/techno-ui-kit'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import s from './[id].module.scss'

const PublicPostPage = () => {
  const router = useRouter()
  const { id, userId } = router.query
  const [isModalOpen, setIsModalOpen] = useState(false)

  
  const { data: userPosts, isLoading: isLoadingPosts } = useGetUserPublicPostsQuery({
    params: {},
    userId: Number(userId),
  })

  const totalCount = userPosts?.totalCount

  
  const post = useMemo(() => {
    const isPost = userPosts?.items.find(p => p.id === Number(id))

    setIsModalOpen(true)

    return isPost
  }, [userPosts, id])

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

 

  return (
    <div>
      {isLoadingPosts && <RequestLineLoader />}
      <MetaHead title={'Public User Page'} />
      <div className={s.container}>
        
        {post && (
          <div className={s.postContent}>
            <div className={s.avaDescr}>
            <div className={s.avatarImgDiv}>
            {post.avatarOwner ? (
                    <img alt={'Avatar'} className={s.avatarImg} src={post.avatarOwner} />
                  ) : (
                    <div className={s.avatarPlaceholderPost}>
                      {post.userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  </div>
                 <div> 
            <Typography className={s.username} variant={'h1'}>{post.userName}</Typography>
            <div className={s.follPublic}>
            <div>
              <Typography variant={'bold-text-14'}>500</Typography>
              <Typography variant={'regular-text-14'}>Following</Typography>
            </div>
            <div>
              <Typography variant={'bold-text-14'}>700</Typography>
              <Typography variant={'regular-text-14'}>Followers</Typography>
            </div>
            {totalCount !== undefined && (
          <div>
            <Typography variant={'bold-text-14'}> {totalCount}</Typography>
            <Typography variant={'regular-text-14'}>Publications</Typography>
          </div>
        )} 
        </div>
         <Typography className={s.description} variant={'regular-text-14'}>{post.description}</Typography>
         </div>
         </div>
            <div className={s.imageContainer}>
              {post.images.map((image, index) => (
                <img
                  alt={`post-image-${index}`}
                  className={s.postImage}
                  key={uuid()}
                  src={image.url}
                />
              ))}
            </div>

           
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