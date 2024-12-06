import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './inctagram.fetch-base-query'

export const inctagramApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  tagTypes: [
    'Profile',
    'Sessions',
    'Posts',
    'Payment',
    'Comments',
    'Followers',
    'Answers',
    'Notification',
  ],
})
