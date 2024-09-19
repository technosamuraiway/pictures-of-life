import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const inctagramApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_INCTAGRAM_API_URL ?? 'https://inctagram.work/api',
    credentials: 'include',
    prepareHeaders: headers => {
      const token = localStorage.getItem('accessToken')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  tagTypes: [],
})
