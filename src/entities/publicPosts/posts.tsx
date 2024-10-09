import { useState } from 'react'

import { useGetAllPublicPostsQuery } from '@/services/flow/post.service'
import { SortDirection } from '@/services/types/post.types'
import { PATH, SwiperSlider, TimeAgo, useRouterLocaleDefinition } from '@/shared'
import { Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
  const {
    data: allPublicPosts,
    isError,
    isLoading,
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

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div style={{ color: 'red' }}>Something Wrong...</div>
  }
  if (!allPublicPosts) {
    return null
  }

  const formattedUsers = formatNumberWithLeadingZerosArray(allPublicPosts.totalUsers, 6)

  const toggleText = (postId: number) => {
    const postIdString = postId.toString() // Преобразование идентификатора поста в строку

    setExpandedPosts(prev => ({
      ...prev,
      [postIdString]: !prev[postIdString], // Переключение состояния для конкретного поста
    }))
  }
  const handleUserClick = (userId: number) => {
    router.push(`/public-user/${userId}`)
  }

  return (
    <>
      <div className={s.links}>
        <Link href={PATH.AUTH.SIGNIN}>Sign-in</Link>
        <Link href={PATH.AUTH.SIGNUP}>Sign-up</Link>
      </div>
      <div className={s.usersContetnt}>
        <section className={s.section}>
          <Typography variant={'bold-text-16'}>{t.posts.regUsers}</Typography>
          <div className={s.spanContainer}>
            {formattedUsers.map((el, ind) => (
              <div className={s.spanDiv} key={ind}>
                <Typography className={s.span} variant={'bold-text-16'}>
                  {el}
                </Typography>
              </div>
            ))}
          </div>
        </section>

        <div className={s.userPost}>
          {allPublicPosts?.items?.slice(0, 4).map(post => (
            <div className={s.swipperDiv} key={post.id}>
              <div className={expandedPosts[post.id] ? s.expandedImageContainer : s.imageContainer}>
                {post?.images.length > 1 ? (
                  <SwiperSlider
                    customClass={'customSwiperClass'}
                    loop
                    navigation
                    paginationClickable
                    slides={post.images.map(image => ({
                      content: <img alt={`img-${post.id}`} className={s.userImg} src={image.url} />,
                    }))}
                    slidesPerView={1}
                    spaceBetween={20}
                  />
                ) : (
                  <img alt={'img'} className={s.userImg} src={post?.images[0]?.url} />
                )}
              </div>
              <div className={expandedPosts[post.id] ? s.allContentExpanded : s.allContent}>
                <div className={s.avaName} onClick={() => handleUserClick(post.ownerId)}>
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
                      <span className={s.showMoreButton} onClick={() => toggleText(post.id)}>
                        {expandedPosts[post.id] ? 'Hide' : 'Show more'}
                      </span>
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
