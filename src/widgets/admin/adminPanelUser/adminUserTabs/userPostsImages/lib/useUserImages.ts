import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { GET_USER_POSTS_IMAGES } from '@/services/graphql/queries/user'
import { useImagesStore } from '@/shared'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

interface IUserImages {
  id: number
  url: string
}

export const usePostsImages = () => {
  const { query } = useRouter()
  const userId = query.userId

  const [endCursorId, setEndCursorId] = useState<null | number>(null)
  const { addImages, imagesData } = useImagesStore()
  const { inView, ref } = useInView()

  const { data: getPostsImagesData, loading: getPostsImagesIsLoading } = useQuery(
    GET_USER_POSTS_IMAGES,
    {
      variables: {
        endCursorId,
        userId: Number(userId),
      },
    }
  )

  useEffect(() => {
    const newImages = (getPostsImagesData?.getPostsByUser.items?.map(el => {
      return { id: el.id, url: el.url }
    }) ?? []) as IUserImages[]

    if (getPostsImagesData && getPostsImagesData.getPostsByUser) {
      addImages(newImages)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPostsImagesData, endCursorId])

  useEffect(() => {
    if (
      getPostsImagesData &&
      inView &&
      imagesData.length > 0 &&
      imagesData.length < getPostsImagesData?.getPostsByUser?.totalCount
    ) {
      const lastImageId = imagesData[imagesData.length - 1].id

      if (endCursorId !== lastImageId) {
        setEndCursorId(lastImageId)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endCursorId, inView])

  return { getPostsImagesIsLoading, imagesData, ref }
}
