import { inctagramApi } from '../api/inctagram.api'
import { IAvatarArgs, IAvatarResponse, IProfileResponse } from '../types/profile.types'

export const profileService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      changeAvatar: builder.mutation<IAvatarResponse, IAvatarArgs>({
        invalidatesTags: ['Profile'],
        query: ({ file }) => {
          const formData = new FormData()

          formData.append('avatarFile', file)

          return {
            body: formData,
            method: 'POST',
            url: `v1/users/profile/avatar`,
          }
        },
      }),
      deleteAvatar: builder.mutation<void, void>({
        invalidatesTags: ['Profile'],
        query: () => ({
          method: 'DELETE',
          url: `v1/users/profile/avatar`,
        }),
      }),
      getProfile: builder.query<IProfileResponse, void>({
        providesTags: ['Profile'],
        query: () => ({
          method: 'GET',
          url: `v1/users/profile`,
        }),
      }),
    }
  },
})

export const { useChangeAvatarMutation, useDeleteAvatarMutation, useGetProfileQuery } =
  profileService
