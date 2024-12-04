import { inctagramApi } from '@/services'

import { UserProfile } from './../types/users.types'

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
    }
  },
})

export const { useGetUserByUserNameQuery } = usersService
