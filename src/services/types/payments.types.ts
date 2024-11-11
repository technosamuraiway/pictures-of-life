export interface CreateSubscriptionResponse {
  id: string
  status: string
  url: string
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
