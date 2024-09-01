import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const token = 'ghj'

export const inctagramApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://inctagram.work/api',
    prepareHeaders: headers => {
      headers.set('Authorization', `Bearer ${token}`)

      return headers
    },
  }),
  endpoints: () => ({}),
  reducerPath: 'inctagramApi',
  tagTypes: [],
})
