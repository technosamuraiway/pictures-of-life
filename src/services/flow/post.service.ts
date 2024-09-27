import { inctagramApi } from '../api/inctagram.api'
import { IPostParams, IPostPublicResponse } from '../types/post.types'

export const postService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      getAllPublicPosts: builder.query<IPostPublicResponse, IPostParams | void>({
        query: arg => {
          return {
            params: arg ?? undefined,
            url: `v1/public-posts/all`,
          }
        },
      }),
    }
  },
})

export const { useGetAllPublicPostsQuery } = postService
