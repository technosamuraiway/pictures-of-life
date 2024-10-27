import { inctagramApi } from '@/services/api/inctagram.api'

interface CreateSubscriptionResponse {
  id: string
  status: string
  url: string
}

const paymentService = inctagramApi.injectEndpoints({
  endpoints: builder => ({
    createSubscription: builder.mutation<CreateSubscriptionResponse, string>({
      invalidatesTags: ['Payment'],
      query: (typeSubscription: string) => ({
        body: JSON.stringify({
          amount: 1,
          baseUrl: 'https://pictures-of-life.online/profile/settings?tab=account+management&',
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
  }),
})

export const { useCreateSubscriptionMutation } = paymentService
