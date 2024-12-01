import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const httpLink = new HttpLink({
  headers: { authorization: 'Basic [YWRtaW5AZ21haWwuY29tOmFkbWlu]' },
  uri: `${process.env.NEXT_PUBLIC_BE_URL}/graphql`,
})

const wsLink = new WebSocketLink(
  new SubscriptionClient(process.env.NEXT_ADMIN_WS_URL || 'ws://inctagram.work/api/v1/graphql', {
    connectionParams: {
      authorization: 'Basic [YWRtaW5AZ21haWwuY29tOmFkbWlu]',
    },
    reconnect: true,
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})
