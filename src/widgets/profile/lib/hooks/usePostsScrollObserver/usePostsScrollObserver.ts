import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { IGetUserPublicPostsArgs, IPostPublicResponse } from '@/services'
import { Undefinedable } from '@/shared'
import { useUserIdStore } from '@/widgets/profile/lib/store/useUserIdStore'

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
      pageSize: isAuthorized ? 12 : 8,
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
    if (postsData && postsData.items.length > 0) {
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
