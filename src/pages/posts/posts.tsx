// @flow
import * as React from 'react'

import { useGetAllPublicPostsQuery } from '@/services/flow/post.service'
import { ButtonLink, PATH, useRouterLocaleDefinition } from '@/shared'
import { convertDate } from '@/shared/utils/convertData'

type Props = {}

export default function Posts(props: Props) {
  const t = useRouterLocaleDefinition()
  const { data: allPublicPosts, isError, isLoading } = useGetAllPublicPostsQuery()

  if(isLoading) return <div>Loading...</div>
  if(isError) return <div style={{color: 'red'}}>Something Wrong...</div>


  return (
    <div
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '50px',
        justifyContent: 'space-around',
        margin: '30px auto',
      }}
    >
      <ButtonLink linkHref={PATH.HOME} title={t.error404Page.btnText} variant={'secondary'} />

      <div style={{
        alignItems: 'center',
        display: 'flex',
        // flexDirection: 'column',
        gap: '50px',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin: '30px auto',
      }}>{allPublicPosts?.items?.map(post => (
        <div key={post.id}>
          <p>{post.owner.firstName} {post.owner.lastName}</p>
          <p>{convertDate(post.createdAt)} {post.userName}</p>
            <img width={300} height={300} src={post.images[0].url} alt='img'/>
        </div>
      ))}
      </div>
    </div>
  )
}
