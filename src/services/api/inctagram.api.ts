import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const token = 'ghj'

export const inctagramApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_INCTAGRAM_API_URL ?? 'https://inctagram.work/api',
    prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${token}`)

      return headers
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  tagTypes: [],
})
