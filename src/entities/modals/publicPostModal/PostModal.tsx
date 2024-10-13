import React, { useState } from 'react'

import { useGetPostCommentsQuery } from '@/services/flow/post.service'
import { IPostUser, SortDirection } from '@/services/types/post.types'
import { SwiperSlider, TimeAgo, useRouterLocaleDefinition } from '@/shared'
import { formatDate } from '@/shared/utils/dateFormatter'
import { CloseIcon } from '@public/CloseIcon'
import { Modal, Scrollbar, Typography } from '@technosamurai/techno-ui-kit'

import s from './PostModal.module.scss'

interface PostModalProps {
  isOpen: boolean
  onRequestClose: () => void
  post: IPostUser
}

const PostModal: React.FC<PostModalProps> = ({ isOpen, onRequestClose, post }) => {
  const [sortDirectionVal, setSortDirectionVal] = useState<SortDirection>('desc')
  const {
    data: commentsData,
    isError,
    isLoading,
  } = useGetPostCommentsQuery({
    params: { sortDirection: sortDirectionVal },
    postId: post.id,
  })
  const t = useRouterLocaleDefinition()

  const handleClose = () => {
    onRequestClose()
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Failed to load comments</div>
  }

  const likedImages = post.images.slice(0, 3)
  const totalLikes = commentsData?.items?.reduce((total, comment) => total + comment.likeCount, 0)

  return (
    <Modal
      contentClassName={s.modal}
      modalSize={'XL'}
      onOpenChange={handleClose}
      open={isOpen}
      showHeader={false}
    >
      <div className={s.modalContent}>
        <div className={s.imageDiv}>
          {post?.images.length > 1 ? (
            <SwiperSlider
              customClass={s.customSwiperClass}
              loop
              navigation
              paginationClickable
              slides={post.images.map(image => ({
                content: <img alt={`img-${post.id}`} className={s.image} src={image.url} />,
              }))}
              slidesPerView={1}
              spaceBetween={20}
            />
          ) : (
            <img alt={'post-image'} className={s.image} src={post?.images[0].url} />
          )}
        </div>
        <div className={s.textContentDiv}>
          <div className={s.avaName}>
            <div className={s.avaNameDiv}>
              {post.avatarOwner ? (
                <img alt={'Avatar'} className={s.avatarImg} src={post.avatarOwner} />
              ) : (
                <div className={s.avatarPlaceholder}>{post.userName.charAt(0).toUpperCase()}</div>
              )}
              <Typography variant={'h3'}>{post.userName}</Typography>
            </div>
            <button className={s.closeBtn} onClick={handleClose} type={'button'}>
              <CloseIcon />
            </button>
          </div>
          <div>
            <div className={s.description}>
              {post.avatarOwner ? (
                <img alt={'Avatar'} className={s.avatarImg} src={post.avatarOwner} />
              ) : (
                <div className={s.avatarPlaceholder}>{post.userName.charAt(0).toUpperCase()}</div>
              )}
              <Scrollbar className={s.scrollbar} maxHeight={79}>
                <Typography className={s.textDescr} variant={'regular-text-14'}>
                  <strong>{post.userName} </strong> {post.description}
                </Typography>
              </Scrollbar>
            </div>
            <Typography className={s.created} variant={'small-text'}>
              {TimeAgo(post.createdAt, t)}
            </Typography>
          </div>

          <div className={s.descComDiv}>
            <Scrollbar className={s.scrollbarComment} maxHeight={300} maxWidth={490}>
              {commentsData?.items?.map(comment => (
                <div key={comment.id}>
                  <div className={s.descriptionComments}>
                    {comment.from.avatars?.length > 0 ? (
                      <img
                        alt={'comment-avatar'}
                        className={s.avatarImg}
                        src={comment.from.avatars[0].url}
                      />
                    ) : (
                      <div className={s.avatarPlaceholder}>
                        {comment.from.username.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <Scrollbar className={s.scrollbar} maxHeight={80}>
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
            {likedImages.length > 0 && (
              <div className={s.likedImagesContainer}>
                <div className={s.likedImages}>
                  {likedImages.map((image, index: number) => (
                    <img
                      alt={`liked-image-${index}`}
                      className={s.likedImage}
                      key={index}
                      src={image.url}
                    />
                  ))}
                </div>
              </div>
            )}

            <Typography variant={'regular-text-14'}>
              {totalLikes} <strong> &quot;Like&quot; </strong>
            </Typography>
          </div>
          <Typography className={s.createdPost} variant={'small-text'}>
            {formatDate(post.createdAt, t)}
          </Typography>
        </div>
      </div>
    </Modal>
  )
}

export default PostModal
