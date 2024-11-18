import {
  CreateSubscriptionResponse,
  IMyCurrentSubscriptionsResponse,
  IMyPaymentsResponse,
} from '@/services'
import { inctagramApi } from '@/services/api/inctagram.api'
const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const paymentService = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    cancelAutoRenewal: builder.mutation<void, void>({
      invalidatesTags: ['Payment'],
      query: () => ({
        method: 'POST',
        url: `v1/subscriptions/canceled-auto-renewal`,
      }),
    }),
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
    getCurrentSubscription: builder.query<IMyCurrentSubscriptionsResponse, void>({
      providesTags: ['Payment'],
      query: () => ({
        method: 'GET',
        url: 'v1/subscriptions/current-payment-subscriptions',
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

export const {
  useCancelAutoRenewalMutation,
  useCreateSubscriptionMutation,
  useGetCurrentSubscriptionQuery,
  useGetSubscriptionQuery,
} = paymentService
