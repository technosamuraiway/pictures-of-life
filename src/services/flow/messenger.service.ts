import {
  IGetLatestMessengersArgs,
  IGetLatestMessengersResponse,
  IGetUserMessagesByUserIdArgs,
  IGetUserMessagesByUserIdResponse,
} from '@/services'

import { inctagramApi } from '../api/inctagram.api'

const messengerService = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    getLatestMessengers: builder.query<IGetLatestMessengersResponse, IGetLatestMessengersArgs>({
      providesTags: ['Messages'],

      query: args => {
        return {
          method: 'GET',
          params: args,
          url: `/v1/messanger`,
        }
      },
    }),
    getUserMessagesByUserID: builder.query<
      IGetUserMessagesByUserIdResponse,
      IGetUserMessagesByUserIdArgs
    >({
      providesTags: ['Messages'],

      query: args => {
        const { dialoguePartnerId, ...params } = args

        return {
          method: 'GET',
          params: params,
          url: `/v1/messanger/${dialoguePartnerId}`,
        }
      },
    }),
  }),
})

export const { useGetLatestMessengersQuery, useGetUserMessagesByUserIDQuery } = messengerService
