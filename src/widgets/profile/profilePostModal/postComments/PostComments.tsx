import { memo } from 'react'

import { useGetPublicUserProfileByIdQuery } from '@/services/flow/publicUser.service'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'
import clsx from 'clsx'

import s from './PostComments.module.scss'

import { PostCommentsHeader } from './postCommentsHeader/PostCommentsHeader'

interface iProps {
  rootCN?: string
}

export const PostComments = memo(({ rootCN }: iProps) => {
  const { isOwnProfile, meData, router } = useMeWithRouter()

  const { userId } = router.query

  const isAuthorized = !!meData

  const { data: profileData } = useGetPublicUserProfileByIdQuery(userId as string)

  return (
    <div className={clsx(s.root, rootCN)}>
      <PostCommentsHeader
        avatar={profileData?.avatars[0].url || ''}
        isOwnProfile={isOwnProfile}
        userName={profileData?.userName || 'no info'}
      />
    </div>
  )
})
