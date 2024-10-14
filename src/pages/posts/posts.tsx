// @flow
import { ChangeEvent, useEffect, useState } from 'react'

import { DeletePostModal } from '@/entities'
import { useGetAllPublicPostsQuery } from '@/services/flow/post.service'
import { SortDirection } from '@/services/types/post.types'
import { ButtonLink, PATH, SwiperSlider, convertDate, useRouterLocaleDefinition } from '@/shared'
import { useDeletePost } from '@/shared/hooks/posts/useDeletePost'
import { checkIfImagesExistInDB, getImagesFromDB } from '@/shared/utils/saveImagesToDB'
import { getLayoutWithNav } from '@/widgets'
import { Button } from '@technosamurai/techno-ui-kit'

import s from './posts.module.scss'

type Props = {}

function Posts(props: Props) {
  const t = useRouterLocaleDefinition()
  const [sortDirectionVal, setSortDirectionVal] = useState<SortDirection>('desc')
  const { handleDeletePost } = useDeletePost()
  const [isModal, setIsModal] = useState(false)
  const [currentPostId, setCurrentPostId] = useState<number>(0)
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

  async function onPositiveButtonClick() {
    await handleDeletePost(currentPostId)
    setIsModal(false)
  }

  function onHandleOpenModal(postId: number) {
    setIsModal(true)
    if (postId) {
      setCurrentPostId(postId)
    }
  }

  function onHandleCloseModal() {
    setIsModal(false)
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
        <option value={'desc'}>desc</option>
        <option value={'asc'}>asc</option>
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
              <>
                <SwiperSlider
                  customClass={'customSwiperClass'}
                  loop
                  navigation
                  paginationClickable
                  slides={post.images.map(image => ({
                    content: (
                      <img alt={`img-${post.id}`} height={300} src={image.url} width={300} />
                    ),
                  }))}
                  slidesPerView={1} // Можно настроить как нужно
                  spaceBetween={20}
                />
                <Button onClick={() => onHandleOpenModal(post.id)} type={'danger'}>
                  Delete
                </Button>
              </>
            ) : (
              // Если изображение одно, просто выводим его
              <>
                <img alt={'img'} height={300} src={post?.images[0]?.url} width={300} />
                <Button onClick={() => onHandleOpenModal(post?.id)} type={'danger'}>
                  Delete
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
      <DeletePostModal
        headerTitle={t.posts.qustionAboutDelete}
        isOpenModal={isModal}
        modalTextChildren={t.posts.qustionAboutDelete}
        negativeButtonChildren={t.logOut.buttonNo}
        onClickNegativeButton={onHandleCloseModal}
        onClickPositiveButton={onPositiveButtonClick}
        positiveButtonChildren={t.logOut.buttonYes}
        setIsOpenModal={setIsModal}
      />
    </div>
  )
}

Posts.getLayout = getLayoutWithNav
export default Posts
