import { RequestLineLoader, useRouterLocaleDefinition } from '@/shared'
import { TextField } from '@technosamurai/techno-ui-kit'

import s from './AdminPosts.module.scss'

import { AdminPost } from './adminPost/AdminPost'
import { useGetPosts } from './lib/useGetPosts'
import { useSearchBy } from './lib/useSearchBy'

export const AdminPosts = () => {
  const t = useRouterLocaleDefinition()
  const { getPostsListDataISLoading, postsData, ref, refetch, searchTerm, setSearchTerm } =
    useGetPosts()

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
          {postsData?.map(post => {
            return <AdminPost key={post.id} post={post} />
          })}
        </div>
      </div>
      <div ref={ref} style={{ height: '10px', width: '100%' }} />
    </>
  )
}
