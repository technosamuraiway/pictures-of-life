export interface ICreateSubscriptionResponse {
  id: string
  status: string
  url: string
}

export interface ICreateSubscriptionArgs {
  amount: number
  typeSubscription: string
}

export interface IMyPaymentsResponse {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: string
  price: number
  subscriptionId: string
  subscriptionType: string
  userId: number
}

export interface IMyCurrentSubscriptionsResponse {
  data: CurrentSubscriptions[]

  hasAutoRenewal: boolean
}

type CurrentSubscriptions = { autoRenewal: boolean } & Omit<
  IMyPaymentsResponse,
  'paymentType' | 'price' | 'subscriptionType'
>
