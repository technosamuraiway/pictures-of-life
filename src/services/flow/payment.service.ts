import { CreateSubscriptionResponse, IMyPaymentsResponse } from '@/services'
import { inctagramApi } from '@/services/api/inctagram.api'
const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const paymentService = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    createSubscription: builder.mutation<CreateSubscriptionResponse, string>({
      invalidatesTags: ['Payment'],
      query: (typeSubscription: string) => ({
        body: JSON.stringify({
          amount: 1,
          baseUrl: `${baseURL}/profile/settings?tab=account+management&`,
          paymentType: 'STRIPE',
          typeSubscription,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: `v1/subscriptions`,
      }),
    }),
    getSubscription: builder.query<IMyPaymentsResponse[], void>({
      providesTags: ['Payment'],
      query: () => ({
        method: 'GET',
        url: 'v1/subscriptions/my-payments',
      }),
    }),
  }),
})

export const { useCreateSubscriptionMutation, useGetSubscriptionQuery } = paymentService
