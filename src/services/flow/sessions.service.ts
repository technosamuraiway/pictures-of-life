import { ISessionList } from '@/services'
import { inctagramApi } from '@/services/api/inctagram.api'

const sessionsService = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    deleteSession: builder.mutation<void, number>({
      invalidatesTags: ['Sessions'],
      query: deviceId => ({
        method: 'DELETE',
        url: `v1/sessions/${deviceId}`,
      }),
    }),
    deleteSessionsGroup: builder.mutation<void, void>({
      invalidatesTags: ['Sessions'],
      query: () => ({
        method: 'DELETE',
        url: `v1/sessions/terminate-all`,
      }),
    }),
    retrieveSessions: builder.query<ISessionList, void>({
      providesTags: ['Sessions'],
      query: () => ({
        method: 'GET',
        url: 'v1/sessions',
      }),
    }),
  }),
})

export const {
  useDeleteSessionMutation,
  useDeleteSessionsGroupMutation,
  useRetrieveSessionsQuery,
} = sessionsService
