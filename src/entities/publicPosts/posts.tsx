import { memo, useState } from 'react'
import { toast } from 'react-toastify'

import { useGetAllPublicPostsQuery } from '@/services/flow/post.service'
import { IPostUser, SortDirection } from '@/services/types/post.types'
import { PATH, RequestLineLoader, SwiperSlider, TimeAgo, useRouterLocaleDefinition } from '@/shared'
import { ImageNotFound } from '@public/ImageNotFound'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import s from './posts.module.scss'

type Props = {}

interface iSlideItem {
  alt: string
  onClick: () => void
  src: string
}

interface iSlideGroup {
  images: { url: string }[]
  onImageClick: () => void
}

const SlideItem = memo(({ alt, onClick, src }: iSlideItem) => {
  return (
    <Image alt={alt} className={s.userImg} height={100} onClick={onClick} src={src} width={230} />
  )
})

const SlideGroup = memo(({ images, onImageClick }: iSlideGroup) => {
  const firstImage = images[0]

  const postsGroupWithSwiper = (
    <SwiperSlider
      customClass={s.customSwiperClass}
      navigation
      paginationClickable
      slides={images.map(image => ({
        content: <SlideItem alt={image.url} onClick={onImageClick} src={image.url} />,
      }))}
      spaceBetween={20}
    />
  )

  const onlyOnePost = <SlideItem alt={firstImage.url} onClick={onImageClick} src={firstImage.url} />

  return <>{images.length > 1 ? postsGroupWithSwiper : onlyOnePost}</>
})

function formatNumberWithLeadingZerosArray(num: number, totalLength: number): string[] {
  return num.toString().padStart(totalLength, '0').split('')
}

export default function Posts(props: Props) {
  const [sortDirectionVal, setSortDirectionVal] = useState<SortDirection>('desc')

  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({})

  const {
    data: allPublicPosts,
    isError,
    isLoading: postIsLoading,
  } = useGetAllPublicPostsQuery(
    {
      pageSize: 50,
      sortBy: 'userName',
      sortDirection: sortDirectionVal,
    },
    {
      pollingInterval: 60000,
    }
  )

  if (isError) {
    return toast.success(t.posts.successfulPostLoading)
  }
  if (!allPublicPosts) {
    return null
  }

  const formattedUsers = formatNumberWithLeadingZerosArray(allPublicPosts.totalUsers, 6)

  const toggleText = (postId: number) => {
    const postIdString = postId.toString()

    setExpandedPosts(prev => ({
      ...prev,
      [postIdString]: !prev[postIdString],
    }))
  }

  const handleImageClick = (post: IPostUser) => {
    router.push({
      pathname: PATH.PUBLICPOST + `/${post.id}`,
      query: { id: post.id, userId: post.ownerId },
    })
  }

  return (
    <>
      {postIsLoading && <RequestLineLoader />}
      <div className={s.usersContetnt}>
        <div className={s.section}>
          <Typography variant={'bold-text-16'}>{t.posts.regUsers}</Typography>
          <div className={s.spanContainer}>
            {formattedUsers.map((el, ind) => (
              <div className={s.spanDiv} key={uuid()}>
                <Typography className={s.span} variant={'bold-text-16'}>
                  {el}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        <div className={s.userPost}>
          {allPublicPosts?.items?.slice(0, 4).map(post => (
            <div className={s.swipperDiv} key={uuid()}>
              <div className={expandedPosts[post.id] ? s.expandedImageContainer : s.imageContainer}>
                {post?.images && post?.images.length > 0 ? (
                  <SlideGroup images={post.images} onImageClick={() => handleImageClick(post)} />
                ) : (
                  <ImageNotFound className={s.imgNF} onClick={() => handleImageClick(post)} />
                )}
              </div>
              <div className={expandedPosts[post.id] ? s.allContentExpanded : s.allContent}>
                <div className={s.avaName}>
                  {post.avatarOwner ? (
                    <Image
                      alt={'Avatar'}
                      className={s.avatarImg}
                      height={36}
                      src={post.avatarOwner}
                      width={36}
                    />
                  ) : (
                    <div className={s.avatarPlaceholder}>
                      {post.userName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <Typography variant={'h3'}>{post.userName}</Typography>
                </div>
                <div className={s.dateDesc}>
                  <Typography className={s.created} variant={'small-text'}>
                    {TimeAgo(post.createdAt, t)}
                  </Typography>
                  <div className={s.description}>
                    <Typography
                      className={expandedPosts[post.id] ? s.fullText : s.descText}
                      variant={'regular-text-14'}
                    >
                      {post.description}
                    </Typography>
                    {post.description.length > 100 && (
                      <Typography
                        className={s.showMoreButton}
                        onClick={() => toggleText(post.id)}
                        variant={'small-text'}
                      >
                        {expandedPosts[post.id] ? t.postText.hide : t.postText.show}
                      </Typography>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
