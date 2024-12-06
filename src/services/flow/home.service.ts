import { IHomePostResponse, IHomePostsArgs } from '@/services'

import { inctagramApi } from '../api/inctagram.api'

const homeService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      getPostForHome: builder.query<IHomePostResponse, IHomePostsArgs>({
        providesTags: ['Posts', 'Followers'],
        query: args => {
          return {
            method: 'GET',
            params: args,
            url: `/v1/home/publications-followers`,
          }
        },
      }),
    }
  },
})

export const { useGetPostForHomeQuery } = homeService
