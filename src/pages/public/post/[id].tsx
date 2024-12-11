import { memo, useEffect, useMemo, useState } from 'react'

import { PostModal } from '@/entities/modals/publicPostModal/PostModal'
import { IPostUser } from '@/services'
import { useGetUserProfileQuery } from '@/services/flow/post.service'
import { MetaHead, RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { getBaseLayout } from '@/widgets'
import { useUserPostsScroll } from '@/widgets/publikUserPosts/lib/useUserPostsScroll'
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
    <div className={s.postImage} onClick={onClick}>
      <Image alt={alt} height={100} src={src} style={{ height: 'auto', width: '100%' }} width={230} />
    </div>
  )
})



const PublicPostPage = () => {
  const router = useRouter() 


  const { id, userId } = router.query
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<IPostUser | null>(null)

  const t = useRouterLocaleDefinition()
  const userIdNumber = Number(userId)
  const userIdString = Array.isArray(userId) ? userId[0] : userId || ''

  const { isLoadingUserPosts, ref, totalCount, userPosts } = useUserPostsScroll(userIdNumber)

  const { data: userProfile } = useGetUserProfileQuery(userIdNumber)

  const post = useMemo(() => {
    return userPosts.find(p => p.id === Number(id))
  }, [userPosts, id])

  useEffect(() => {
    if (post) {
      setSelectedPost(post)
      setIsModalOpen(true)
    }
  }, [post])

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedPost(null)
  }
  const handlePostClick = (post: IPostUser) => {
    setSelectedPost(post)
    setIsModalOpen(true)
  }

  return (
    <div>
      {isLoadingUserPosts && <RequestLineLoader />}
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
                <Typography className={s.username} variant={'h1'}>
                  {post.userName}
                </Typography>
                <div className={s.follPublic}>
                  <div>
                    <Typography variant={'bold-text-14'}>
                      {userProfile?.userMetadata?.following || 0}
                    </Typography>
                    <Typography variant={'regular-text-14'}>
                      {t.profile.info.stats.following.title}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant={'bold-text-14'}>
                      {userProfile?.userMetadata?.followers || 0}
                    </Typography>
                    <Typography variant={'regular-text-14'}>
                      {t.profile.info.stats.followers.title}
                    </Typography>
                  </div>
                  <div>
                    <Typography variant={'bold-text-14'}>{totalCount}</Typography>
                    <Typography variant={'regular-text-14'}>
                      {t.profile.info.stats.publications}
                    </Typography>
                  </div>
                </div>
                {userProfile?.aboutMe && (
                  <Typography className={s.description} variant={'regular-text-14'}>
                    {userProfile?.aboutMe}
                  </Typography>
                )}
              </div>
            </div>
            <div className={s.imageContainer}>
              {userPosts.map((post, index) =>
                post.images?.length > 0 ? (
                  <SlideItem
                    alt={`post-image-${index}`}
                    key={uuid()}
                    onClick={() => handlePostClick(post)}
                    src={post.images[0].url}
                  />
                ) : (
                  <ImageNotFound className={s.imgNF} key={uuid()} />
                )
              )}
            </div>
            <div ref={ref} style={{ height: '30px', width: '100%' }} />
          </div>
        )}

        {selectedPost &&  (
          <PostModal
            isOpen={isModalOpen}
            onRequestClose={handleModalClose}
            post={selectedPost}
            userId={userIdString}
          />
        )}
      </div>
    </div>
  );
};


PublicPostPage.getLayout = getBaseLayout
export default PublicPostPage