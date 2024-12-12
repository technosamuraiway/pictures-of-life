import { inctagramApi } from '@/services'
import { GetNotifications, MarkAsReadArgs } from '@/services/types/notifications.type'

const notifications = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    deleteNotification: builder.mutation<void, number>({
      invalidatesTags: () => ['Notification'],
      query: id => ({
        method: 'DELETE',
        url: `v1/notifications/${id}`,
      }),
    }),

    getNotifications: builder.query<GetNotifications, void>({
      providesTags: () => ['Notification'],
      query: () => ({
        url: 'v1/notifications',
      }),
    }),

    markAsRead: builder.mutation<void, MarkAsReadArgs>({
      invalidatesTags: () => ['Notification'],
      query: args => ({
        body: args,
        method: 'PUT',
        url: 'v1/notifications/mark-as-read',
      }),
    }),
  }),
})

export const { useDeleteNotificationMutation, useGetNotificationsQuery, useMarkAsReadMutation } =
  notifications
