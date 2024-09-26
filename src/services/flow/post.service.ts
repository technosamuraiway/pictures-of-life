import { inctagramApi } from '../api/inctagram.api'
import { IPostParams, IPostPublicResponse } from '../types/post.types'

export const postService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      getAllPublicPosts: builder.query<IPostPublicResponse, IPostParams | void>({
        query: (arg) => {
          return {
            url: `v1/public-posts/all`,
            params: arg ?? undefined,
          }
        },
      }),
    }
  },
})

export const { useGetAllPublicPostsQuery } = postService
