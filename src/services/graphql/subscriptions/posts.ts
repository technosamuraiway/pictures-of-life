import { graphql } from '@/services/graphql/codegen/index'

export const GET_POSTS_LIST_SUBSCRIPTIONS = graphql(`
  subscription GetPostsSubscription {
    postAdded {
      id
      ownerId
      description
      createdAt
      postOwner {
        id
        userName
        avatars {
          url
        }
      }
      images {
        id
        url
      }
    }
  }
`)
