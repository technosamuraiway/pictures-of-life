import { inctagramApi } from '../api/inctagram.api'
import { GetPublicUserProfileByIdResponse } from '../types/publicUser.type'

const publicUserService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      getPublicUserProfileById: builder.query<GetPublicUserProfileByIdResponse, string>({
        query: id => {
          return {
            method: 'GET',
            url: `/v1/public-user/profile/${id}`,
          }
        },
      }),
    }
  },
})

export const { useGetPublicUserProfileByIdQuery } = publicUserService
