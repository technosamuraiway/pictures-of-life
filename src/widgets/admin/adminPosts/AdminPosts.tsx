import { useState } from 'react'

import { GET_POSTS_LIST } from '@/services/graphql/queries/posts'
import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { useQuery } from '@apollo/client'
import { TextField } from '@technosamurai/techno-ui-kit'

import s from './AdminPosts.module.scss'

import { AdminPost } from './adminPost/AdminPost'
import { useSearchBy } from './lib/useSearchBy'

export const AdminPosts = () => {
  const t = useRouterLocaleDefinition()
  const [searchTerm, setSearchTerm] = useState('')

  const {
    data: getPostsListData,
    loading: getPostsListDataISLoading,
    refetch,
  } = useQuery(GET_POSTS_LIST, {
    variables: {
      endCursorPostId: 0,
      searchTerm,
    },
  })

  const { changeSearchHandler } = useSearchBy(refetch, setSearchTerm)

  return (
    <>
      {getPostsListDataISLoading && <RequestLineLoader />}
      <div className={s.wrapper}>
        <TextField
          onChange={changeSearchHandler}
          placeholder={t.admin.postsList.searchPlaceholder}
          type={'search'}
          value={searchTerm}
        />
        <div className={s.postWrapper}>
          {getPostsListData?.getPosts?.items?.map(post => {
            return <AdminPost key={post.id} post={post} />
          })}
        </div>
      </div>
    </>
  )
}
