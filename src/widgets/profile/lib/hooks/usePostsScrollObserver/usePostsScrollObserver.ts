import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { IGetUserPublicPostsArgs, IPostPublicResponse } from '@/services'
import { Undefinedable } from '@/shared'

import { useUserIdStore } from '../../store/useUserIdStore'

const initialPostsCountInRequest = 12
const witchScrollPostsCountInRequest = 8

export const usePostsScrollObserver = (
  userId: string,
  postsData: Undefinedable<IPostPublicResponse>,
  getPostsTrigger: (args: IGetUserPublicPostsArgs) => void,
  isPostsLoading: boolean,
  isAuthorized: boolean
) => {
  /* inView - булево значение, которое показывает, находится ли отслеживаемый элемент в области видимости (true) или нет (false).
     ref -  функция для отслеживания. */
  const { inView, ref } = useInView()

  const { setUserIdStore, userIdStore } = useUserIdStore()
  const [lastPostIdState, setLastPostIdState] = useState<Undefinedable<number>>(undefined)

  useEffect(() => {
    const getPostsArgs: IGetUserPublicPostsArgs = {
      pageSize: isAuthorized ? initialPostsCountInRequest : witchScrollPostsCountInRequest,
      userId: Number(userId),
    }

    if (userIdStore !== userId) {
      // запрос для другого профиля
      setUserIdStore(userId)
      getPostsTrigger(getPostsArgs)
    } else {
      // запрос для своего профиля, так как при переходе на любую другую страницу измениться userId
      if (!postsData) {
        getPostsTrigger(getPostsArgs)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, postsData])

  function loadMorePosts() {
    const fetchedPostsLength = postsData?.items.length ?? 0

    if (postsData && fetchedPostsLength > 0) {
      /* условие - что если пользователь получил изначальных постов меньше 12,
         значит у него нет больше постов на свервере, и не нужно больше тригерить заспросы  */
      if (fetchedPostsLength < initialPostsCountInRequest) {
        return
      }

      /* условие - если получили уже все посты */
      if (postsData.totalCount === fetchedPostsLength) {
        return
      }

      const lastPostId = postsData.items[postsData.items.length - 1].id

      // для избежания запросов, если уже получили все посты с сервера
      if (lastPostId !== lastPostIdState) {
        getPostsTrigger({
          endCursorPostId: lastPostId,
          userId: Number(userIdStore),
        })
        setLastPostIdState(lastPostId)
      }
    }
  }

  useEffect(() => {
    if (inView && !isPostsLoading && isAuthorized) {
      loadMorePosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, isPostsLoading])

  return {
    ref,
  }
}
