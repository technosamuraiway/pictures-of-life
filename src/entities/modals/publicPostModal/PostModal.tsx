import React, { memo } from 'react'
import { toast } from 'react-toastify'

import { useGetPostCommentsQuery, useGetUserPublicPostsQuery } from '@/services/flow/post.service'
import { IPostUser } from '@/services/types/post.types'
import { RequestLineLoader, SwiperSlider, TimeAgo, useRouterLocaleDefinition } from '@/shared'
import { formatDate } from '@/shared/utils/dateFormatter'
import { ImageNotFound } from '@public/ImageNotFound'
import { CloseIcon } from '@public/icons/CloseIcon'
import { Modal, Scrollbar, Typography } from '@technosamurai/techno-ui-kit'
import Image from 'next/image'
import { v4 as uuid } from 'uuid'

import s from './PostModal.module.scss'

interface PostModalProps {
  isOpen: boolean
  onRequestClose: () => void
  post: IPostUser
  userId: string
}

interface iSlideItem {
  alt: string
  src: string
}

interface iSlideGroup {
  images: { url: string }[]
}

const SlideItem = memo(({ alt, src }: iSlideItem) => {
  return <Image alt={alt} className={s.image} height={100} src={src} width={230} />
})

const SlideGroup = memo(({ images }: iSlideGroup) => {
  const firstImage = images[0]

  const postsGroupWithSwiper = (
    <SwiperSlider
      customClass={s.customSwiperClass}
      navigation
      paginationClickable
      slides={images.map(image => ({
        content: <SlideItem alt={image.url} src={image.url} />,
      }))}
      spaceBetween={20}
    />
  )

  const onlyOnePost = <SlideItem alt={firstImage.url} src={firstImage.url} />

  return <>{images.length > 1 ? postsGroupWithSwiper : onlyOnePost}</>
})

export const PostModal = ({ isOpen, onRequestClose, post, userId }: PostModalProps) => {
  const t = useRouterLocaleDefinition()
  const { data: userPosts, isLoading: isLoadingPosts } = useGetUserPublicPostsQuery({
    userId: Number(userId),
  })
  const {
    data: commentsData,
    isError,
    isLoading: loadingModal,
  } = useGetPostCommentsQuery({
    params: { sortDirection: 'desc' },
    postId: post.id,
  })
  const handleClose = () => {
    onRequestClose()
  }

  if (isError) {
    return toast.success(t.posts.successfulErrorMesseng)
  }

  const likedImages =
    userPosts?.items.find(p => p.id === post.id)?.avatarWhoLikes?.slice(0, 3) || []
  const currentPostLikes = userPosts?.items.find(p => p.id === post.id)?.likesCount || 0

  return (
    <>
      {loadingModal && <RequestLineLoader />}
      <Modal
        contentClassName={s.modal}
        modalSize={'XL'}
        onOpenChange={handleClose}
        open={isOpen}
        showHeader={false}
      >
        <div className={s.modalContent}>
          <div className={s.imageDiv}>
            {post?.images.length > 0 ? (
              <SlideGroup images={post.images} />
            ) : (
              <ImageNotFound className={s.image} />
            )}
          </div>
          <div className={s.textContentDiv}>
            <div className={s.avaName}>
              <div className={s.avaNameDiv}>
                {post.avatarOwner ? (
                  <Image
                    alt={'Avatar'}
                    className={s.avatarImg}
                    height={36}
                    src={post.avatarOwner}
                    width={36}
                  />
                ) : (
                  <div className={s.avatarPlaceholder}>{post.userName.charAt(0).toUpperCase()}</div>
                )}
                <Typography variant={'h3'}>{post.userName}</Typography>
              </div>
              <button className={s.closeBtn} onClick={handleClose} type={'button'}>
                <CloseIcon />
              </button>
            </div>
            {post.description && (
              <div>
                <div className={s.description}>
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
                  <Scrollbar className={s.scrollbar} maxHeight={78}>
                    <Typography className={s.textDescr} variant={'regular-text-14'}>
                      <strong>{post.userName} </strong> {post.description}
                    </Typography>
                  </Scrollbar>
                </div>
                <Typography className={s.created} variant={'small-text'}>
                  {TimeAgo(post.createdAt, t)}
                </Typography>
              </div>
            )}

            <div className={s.descComDiv}>
              <Scrollbar className={s.scrollbarComment} maxHeight={300} maxWidth={490}>
                {commentsData?.items?.map(comment => (
                  <div key={uuid()}>
                    <div className={s.descriptionComments}>
                      {comment.from.avatars?.length > 0 ? (
                        <Image
                          alt={'comment-avatar'}
                          className={s.avatarImg}
                          height={36}
                          src={comment.from.avatars[0].url}
                          width={36}
                        />
                      ) : (
                        <div className={s.avatarPlaceholder}>
                          {comment.from.username.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <Scrollbar className={s.scrollbar} maxHeight={79}>
                        <Typography className={s.textDescr} variant={'regular-text-14'}>
                          <strong>{comment.from.username} </strong> {comment.content}
                        </Typography>
                      </Scrollbar>
                    </div>
                    <Typography className={s.created} variant={'small-text'}>
                      {TimeAgo(comment.createdAt, t)}
                    </Typography>
                    {comment.answerCount > 0 && (
                      <div className={s.answerDivDiv}>
                        <div className={s.answerDiv}></div>
                        <Typography className={s.textAnswer} variant={'small-text'}>
                          View Answers ({comment.answerCount})
                        </Typography>
                      </div>
                    )}
                  </div>
                ))}
              </Scrollbar>
            </div>
            <div className={s.likeImgLike}>
              {likedImages?.length > 0 && (
                <div className={s.likedImagesContainer}>
                  <div className={s.likedImages}>
                    {likedImages.map((image, index: number) => {
                      return (
                        <Image
                          alt={`liked-image-${index}`}
                          className={s.likedImage}
                          height={24}
                          key={uuid()}
                          src={image}
                          width={24}
                        />
                      )
                    })}
                  </div>
                </div>
              )}

              <Typography variant={'regular-text-14'}>
                {currentPostLikes} <strong> &quot;Like&quot; </strong>
              </Typography>
            </div>
            <Typography className={s.createdPost} variant={'small-text'}>
              {formatDate(post.createdAt, t)}
            </Typography>
          </div>
        </div>
      </Modal>
    </>
  )
}
