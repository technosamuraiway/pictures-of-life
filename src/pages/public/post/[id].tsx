import { memo, useMemo, useState } from 'react'

import { PostModal } from '@/entities/modals/publicPostModal/PostModal'
import { useGetUserPublicPostsQuery } from '@/services/flow/post.service'
import { MetaHead, RequestLineLoader } from '@/shared'
import { getBaseLayout } from '@/widgets'
import { ImageNotFound } from '@public/ImageNotFound'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import s from './[id].module.scss'

interface iSlideItem {
  alt: string
  src: string
}

const SlideItem = memo(({ alt, src }: iSlideItem) => {
  return (
    <div className={s.postImage}> 
      <Image alt={alt} height={100} layout={"responsive"} src={src} width={230} />
    </div>
  )
})

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
                    <Image alt={'Avatar'} className={s.avatarImg} height={240} src={post.avatarOwner} width={240} />
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
            {post.images && post.images.length > 0 ? (
                post.images.map((image, index) => (
                  <SlideItem
                    alt={`post-image-${index}`}
                    key={uuid()}
                    src={image.url}
                  />
                ))
              ) : (
                <ImageNotFound className={s.imgNF} />
              )}
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