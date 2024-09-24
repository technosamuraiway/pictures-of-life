import { inctagramApi } from '../api/inctagram.api'

export const postService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      getAllPublicPosts: builder.query<void, void>({
        query: () => {
          return { url: `v1/public-posts/all` }
        },
      }),
    }
  },
})

export const { useGetAllPublicPostsQuery } = postService
