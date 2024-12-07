import { inctagramApi } from '@/services'

import { GetUserSearchRequest, UserProfile, UserSearchResponse } from './../types/users.types'

export const usersService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      getUserByUserName: builder.query<UserProfile, string>({
        providesTags: ['Followers'],
        query: userName => {
          return {
            method: 'GET',
            url: `/v1/users/${userName}`,
          }
        },
      }),
      getUserSearch: builder.query<UserSearchResponse, GetUserSearchRequest>({
        providesTags: ['Followers'],
        query: args => {
          const { ...params } = args

          return {
            method: 'GET',
            params: params,
            url: `v1/users`,
          }
        },
      }),
    }
  },
})

export const { useGetUserByUserNameQuery, useGetUserSearchQuery } = usersService
