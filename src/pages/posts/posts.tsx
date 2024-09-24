// @flow
import * as React from 'react'

import { useGetAllPublicPostsQuery } from '@/services/flow/post.service'
import { ButtonLink, PATH, useRouterLocaleDefinition } from '@/shared'

type Props = {}

export default function Posts(props: Props) {
  const t = useRouterLocaleDefinition()
  const { data: allPosts } = useGetAllPublicPostsQuery()

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
      <div>Posts</div>
    </div>
  )
}
