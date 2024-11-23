import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: { authorization: 'Basic [YWRtaW5AZ21haWwuY29tOmFkbWlu]' },
  uri: `${process.env.NEXT_PUBLIC_BE_URL}/graphql`,
})
