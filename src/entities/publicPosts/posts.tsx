import { memo, useState } from 'react'
import { toast } from 'react-toastify'

import { useGetAllPublicPostsQuery } from '@/services/flow/post.service'
import { IPostUser, SortDirection } from '@/services/types/post.types'
import { PATH, RequestLineLoader, SwiperSlider, TimeAgo, useRouterLocaleDefinition } from '@/shared'
import { ImageNotFound } from '@public/ImageNotFound'
import { Typography } from '@technosamurai/techno-ui-kit'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'
import { v4 as uuid } from 'uuid'

import s from './posts.module.scss'

type Props = {}

function formatNumberWithLeadingZerosArray(num: number, totalLength: number): string[] {
  return num.toString().padStart(totalLength, '0').split('')
}

export default function Posts(props: Props) {
  const [sortDirectionVal, setSortDirectionVal] = useState<SortDirection>('desc')

  const t = useRouterLocaleDefinition()
  const router = useRouter()
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({})
  const [imageErrors, setImageErrors] = useState<Record<number, Record<number, boolean>>>({})

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

  const handleImageError = (postId: number, imageIndex: number) => {
    setImageErrors(prevErrors => ({
      ...prevErrors,
      [postId]: {
        ...prevErrors[postId],
        [imageIndex]: true,
      },
    }))
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
                {post?.images && post?.images.length > 1 ? (
                  <SwiperSlider
                    customClass={'customSwiperClass'}
                    loop
                    navigation
                    paginationClickable
                    slides={post.images.map((image, index) => ({
                      content: (
                        <>
                          {imageErrors[post.id]?.[index] ? (
                            <ImageNotFound className={s.imgNF} />
                          ) : (
                            <img
                              alt={`img-${post.id}-${index}`}
                              className={s.userImg}
                              onClick={() => handleImageClick(post)}
                              onError={() => handleImageError(post.id, index)}
                              src={image.url}
                            />
                          )}
                        </>
                      ),
                    }))}
                    slidesPerView={1}
                    spaceBetween={20}
                  />
                ) : (
                  <>
                    {imageErrors[post.id]?.[0] ? (
                      <ImageNotFound className={s.imgNF} />
                    ) : (
                      <img
                        alt={'img'}
                        className={s.userImg}
                        onClick={() => handleImageClick(post)}
                        onError={() => {
                          handleImageError(post.id, 0)
                        }}
                        src={`${post?.images[0]?.url}`}
                      />
                    )}
                  </>
                )}
              </div>
              <div className={expandedPosts[post.id] ? s.allContentExpanded : s.allContent}>
                <div className={s.avaName}>
                  {post.avatarOwner ? (
                    <img alt={'Avatar'} className={s.avatarImg} src={post.avatarOwner} />
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
                        {expandedPosts[post.id] ? 'Hide' : 'Show more'}
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
