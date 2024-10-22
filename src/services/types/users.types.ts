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
