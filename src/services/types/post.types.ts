export interface IPostPublicResponse {
  items: IPostUser[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export interface IPostUser {
  avatarOwner: string
  createdAt: string
  description: string
  id: number
  images: IPostImage[]
  isLiked: boolean
  likesCount: number
  location: any
  owner: IPostOwner
  ownerId: number
  updatedAt: string
  userName: string
}

export interface IPostImage {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export interface IPostOwner {
  firstName?: string
  lastName?: string
}

type SortDirection = 'asc' | 'desc'

export interface IPostParams {
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
}
