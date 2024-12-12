import { IAvatar } from '@/services'

export type UserProfile = {
  aboutMe?: string
  avatars: IAvatar[]
  city?: string
  country?: string
  dateOfBirth?: string
  firstName: string
  followersCount: number
  followingCount: number
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  lastName: string
  publicationsCount: number
  region?: string
  userName: string
}
export type GetUserSearchRequest = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  search?: string
}
export type UserSearchResponse = {
  items: UserSearch[]
  nextCursor: number
  page: number
  pageSize: number
  pagesCount: number
  prevCursor: number
  totalCount: number
}
export type UserSearch = {
  avatars: [
    {
      createdAt: string
      fileSize: number
      height: number
      url: string
      width: number
    },
  ]
  createdAt: string
  firstName: string
  id: number
  lastName: string
  userName: string
}
