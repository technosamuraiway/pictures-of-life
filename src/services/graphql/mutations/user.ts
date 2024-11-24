import { graphql } from '@/services/graphql/codegen/index'

export const LOGIN_ADMIN = graphql(`
  mutation LoginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      logged
    }
  }
`)
export const REMOVE_USER = graphql(`
  mutation RemoveUser($userId: Int!) {
    removeUser(userId: $userId)
  }
`)
