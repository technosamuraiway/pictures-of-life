import { memo, useMemo, useState } from 'react'

import { PostModal } from '@/entities/modals/publicPostModal/PostModal'
import { useGetUserPublicPostsQuery } from '@/services/flow/post.service'
import { MetaHead, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { getBaseLayout } from '@/widgets'
import { ImageNotFound } from '@public/ImageNotFound'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import s from './[id].module.scss'

interface iSlideItem {
  alt: string
  onClick: () => void
  src: string
}

const SlideItem = memo(({ alt, onClick, src }: iSlideItem) => {
  return (
    <div className={s.postImage}  onClick={onClick}> 
      <Image alt={alt} height={100} layout={"responsive"} src={src} width={230} />
    </div>
  )
})

const PublicPostPage = () => {
  const router = useRouter()
  const { id, userId } = router.query
  const [isModalOpen, setIsModalOpen] = useState(false)

  
  const { data: userPosts, isLoading: isLoadingPosts } = useGetUserPublicPostsQuery({
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

  const t = useRouterLocaleDefinition()

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
              <Typography variant={'regular-text-14'}>{t.profile.info.stats.following}</Typography>
            </div>
            <div>
              <Typography variant={'bold-text-14'}>700</Typography>
              <Typography variant={'regular-text-14'}>{t.profile.info.stats.followers}</Typography>
            </div>
            {totalCount !== undefined && (
          <div>
            <Typography variant={'bold-text-14'}> {totalCount}</Typography>
            <Typography variant={'regular-text-14'}>{t.profile.info.stats.publications}</Typography>
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
                    onClick={() => setIsModalOpen(true)}
                    src={image.url}
                  />
                ))
              ) : (
                <ImageNotFound className={s.imgNF} onClick={() => setIsModalOpen(true)} />
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