export interface ICreateFollowingArgs {
  selectedUserId: number
}

export interface IUnFollowByUserIdArgs {
  userId: number
}

export interface IGetUserFollowersArgs {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
  userName: string
}

type UserFollowAvatars = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type UserFollowItems = {
  avatars: UserFollowAvatars[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export interface IGetUserFollowersResponse {
  items: UserFollowItems[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
