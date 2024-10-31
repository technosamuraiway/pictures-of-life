import { memo } from 'react'

import { useGetPublicUserProfileByIdQuery } from '@/services/flow/publicUser.service'
import { InitLoader } from '@/shared'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import s from './PostComments.module.scss'

import { PostCommentsHeader } from './postCommentsHeader/PostCommentsHeader'

interface iProps {
  rootCN?: string
}

export const PostComments = memo(({ rootCN }: iProps) => {
  const {
    query: { userId },
  } = useRouter()

  const { data: profileData } = useGetPublicUserProfileByIdQuery(userId as string)

  return (
    <div className={clsx(s.root, rootCN)}>
      <PostCommentsHeader
        avatar={profileData?.avatars[0].url || ''}
        userName={profileData?.userName || 'no info'}
      />
    </div>
  )
})
