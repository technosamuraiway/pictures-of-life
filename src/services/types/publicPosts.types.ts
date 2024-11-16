import { IPostImage } from './_common.types'

type Owner = {
  firstName: string
  lastName: string
}

export type GetPublicUserPostByIdResponse = {
  avatarOwner: string
  avatarWhoLikes: string[]
  createdAt: string
  description: string
  id: number
  images: IPostImage[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: Owner
  ownerId: number
  updatedAt: string
  userName: string
}

type SortDirections = 'asc' | 'desc'

export type GetPublicPostCommentsByIdRequest = {
  PageNumber?: number
  pageSize?: number
  postId: number
  sortBy?: string
  sortDirection?: SortDirections
}
