import { useState } from 'react'

import { useGetAllPublicPostsQuery } from '@/services/flow/post.service'
import { SortDirection } from '@/services/types/post.types'
import { PATH, TimeAgo, convertDate, useRouterLocaleDefinition } from '@/shared'
import { Button, Typography } from '@technosamurai/techno-ui-kit'
import Link from 'next/link'

import s from './posts.module.scss'

type Props = {}

function formatNumberWithLeadingZerosArray(num: number, totalLength: number): string[] {
  return num.toString().padStart(totalLength, '0').split('')
}

export default function Posts(props: Props) {
  const [sortDirectionVal, setSortDirectionVal] = useState<SortDirection>('asc')
  const t = useRouterLocaleDefinition()
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
              <div
                className={s.spanDiv}
                key={ind}
                style={{
                  borderRight:
                    ind !== formattedUsers.length - 1 ? '1px solid var(--Dark-300)' : 'none',
                }}
              >
                <Typography className={s.span} variant={'bold-text-16'}>
                  {el}
                </Typography>
              </div>
            ))}
          </div>
        </section>

        <div className={s.userPost}>
          {allPublicPosts?.items?.slice(0, 4).map(post => (
            <div key={post.id}>
              <img alt={'img'} className={s.userImg} src={post.images[0].url} />
              <div className={s.allContent}>
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
                    <Typography variant={'regular-text-14'}>{post.description}</Typography>
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
