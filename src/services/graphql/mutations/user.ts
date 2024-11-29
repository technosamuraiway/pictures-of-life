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
export const BAN_USER = graphql(`
  mutation BanUser($userId: Int!, $banReason: String!) {
    banUser(userId: $userId, banReason: $banReason)
  }
`)
export const UNBAN_USER = graphql(`
  mutation UnbanUser($userId: Int!) {
    unbanUser(userId: $userId)
  }
`)
