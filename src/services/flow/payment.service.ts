import {
  ICreateSubscriptionArgs,
  ICreateSubscriptionResponse,
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
    createPaypalSubscription: builder.mutation<
      ICreateSubscriptionResponse,
      ICreateSubscriptionArgs
    >({
      invalidatesTags: ['Payment'],
      query: ({ amount, typeSubscription }) => ({
        body: JSON.stringify({
          amount,
          baseUrl: `${baseURL}/profile/settings?tab=account+management&`,
          paymentType: 'PAYPAL',
          typeSubscription,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: `v1/subscriptions`,
      }),
    }),
    createSubscription: builder.mutation<ICreateSubscriptionResponse, ICreateSubscriptionArgs>({
      invalidatesTags: ['Payment'],
      query: ({ amount, typeSubscription }) => ({
        body: JSON.stringify({
          amount,
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
  useCreatePaypalSubscriptionMutation,
  useCreateSubscriptionMutation,
  useGetCurrentSubscriptionQuery,
  useGetSubscriptionQuery,
} = paymentService
