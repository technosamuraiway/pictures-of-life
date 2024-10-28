import { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { IGetUserPublicPostsArgs, useLazyGetUserPublicPostsQuery } from '@/services'
import { useGetPublicUserProfileByIdQuery } from '@/services/flow/publicUser.service'
import { useGetUserByUserNameQuery } from '@/services/flow/users.service'
import { Undefinedable } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'

import { useUserIdStore } from '../store/useUserIdStore'

export function useGetProfilePageData(userId: string) {
  /*
  inView - булево значение, которое показывает, находится ли отслеживаемый элемент в области видимости (true) или нет (false).
  ref -  функция для отслеживания.
  * */
  const { inView, ref } = useInView()

  const { setUserIdStore, userIdStore } = useUserIdStore()
  const [lastPostIdState, setLastPostIdState] = useState<Undefinedable<number>>(undefined)

  const { isOwnProfile, meData: meRequestData } = useMeWithRouter()

  const { data: profileData, isLoading: isProfileLoading } =
    useGetPublicUserProfileByIdQuery(userId)

  const isAuthorizedWithProfileData = !profileData || !meRequestData

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByUserNameQuery(
    profileData?.userName ?? '',
    { skip: isAuthorizedWithProfileData }
  )

  const [fetchPosts, { data: postsData, isLoading: isPostsLoading }] =
    useLazyGetUserPublicPostsQuery()

  useEffect(() => {
    const getPostsArgs: IGetUserPublicPostsArgs = {
      endCursorPostId: undefined,
      userId: Number(userId),
    }

    if (userIdStore !== userId) {
      // запрос для другого профиля
      setUserIdStore(userId)
      fetchPosts(getPostsArgs)
    } else {
      if (!postsData) {
        fetchPosts(getPostsArgs)
      }
    }
  }, [userId, postsData])

  const loadMorePosts = useCallback(() => {
    if (postsData && postsData.items.length > 0) {
      const lastPostId = postsData.items[postsData.items.length - 1].id

      if (lastPostId !== lastPostIdState) {
        fetchPosts({
          endCursorPostId: lastPostId,
          pageSize: 8,
          userId: Number(userIdStore),
        })
        setLastPostIdState(lastPostId)
      }
    }
  }, [postsData])

  useEffect(() => {
    if (inView && !isPostsLoading) {
      loadMorePosts()
    }
  }, [inView, isPostsLoading])

  return {
    isOwnProfile,
    isPostsLoading,
    isProfileLoading,
    isUserDataLoading,
    loadMorePosts,
    postsData,
    profileData,
    ref,
    userData,
  }
}
