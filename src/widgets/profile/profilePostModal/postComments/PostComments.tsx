import { memo } from 'react'

import clsx from 'clsx'

import s from './PostComments.module.scss'

import { PostCommentsHeader } from './postCommentsHeader/PostCommentsHeader'

interface iProps {
  rootCN?: string
}

export const PostComments = memo(({ rootCN }: iProps) => {
  return (
    <div className={clsx(s.root, rootCN)}>
      <PostCommentsHeader />
    </div>
  )
})
