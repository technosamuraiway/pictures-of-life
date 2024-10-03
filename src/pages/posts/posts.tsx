// @flow
import { ChangeEvent, useState } from 'react'

import { useGetAllPublicPostsQuery } from '@/services/flow/post.service'
import { SortDirection } from '@/services/types/post.types'
import { ButtonLink, PATH, SwiperSlider, convertDate, useRouterLocaleDefinition } from '@/shared'

type Props = {}

export default function Posts(props: Props) {
  const [sortDirectionVal, setSortDirectionVal] = useState<SortDirection>('asc')
  const t = useRouterLocaleDefinition()
  const {
    data: allPublicPosts,
    isError,
    isLoading,
  } = useGetAllPublicPostsQuery({
    pageSize: 50,
    sortBy: 'userName',
    sortDirection: sortDirectionVal,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div style={{ color: 'red' }}>Something Wrong...</div>
  }
  if (!allPublicPosts) {
    return null
  }

  function onHandleSort(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as SortDirection

    setSortDirectionVal(value)
  }

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

      <section>
        <div>Registered Users: {allPublicPosts.totalUsers}</div>
      </section>
      <select
        disabled={isLoading}
        onChange={onHandleSort}
        style={{ color: 'blue' }}
        value={sortDirectionVal}
      >
        <option value={'asc'}>asc</option>
        <option value={'desc'}>desc</option>
      </select>

      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '50px',
          justifyContent: 'space-around',
          margin: '30px auto',
        }}
      >
        {allPublicPosts?.items?.map(post => (
          <div key={post.id} style={{ maxWidth: '300px' }}>
            <p>
              {post.owner.firstName} {post.owner.lastName}
            </p>
            <p>
              {convertDate(post.createdAt)} {post.userName}
            </p>

            {/* Проверяем, есть ли изображения и их количество */}
            {post?.images.length > 1 ? (
              // Если изображений несколько, показываем их в слайдере
              <SwiperSlider
                customClass={'customSwiperClass'}
                loop
                navigation
                paginationClickable
                slides={post.images.map(image => ({
                  content: <img alt={`img-${post.id}`} height={300} src={image.url} width={300} />,
                }))}
                slidesPerView={1} // Можно настроить как нужно
                spaceBetween={20}
              />
            ) : (
              // Если изображение одно, просто выводим его
              <img alt={'img'} height={300} src={post?.images[0]?.url} width={300} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
