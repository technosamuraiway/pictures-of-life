export interface IPostPublicResponse {
  totalCount: number
  pageSize: number
  items: IPostUser[]
  totalUsers: number
}

export interface IPostUser{
  id: number
  userName: string
  description: string
  location: any
  images: IPostImage[]
  createdAt: string
  updatedAt: string
  avatarOwner: string
  ownerId: number
  owner: IPostOwner
  likesCount: number
  isLiked: boolean
}

export interface IPostImage {
  url: string
  width: number
  height: number
  fileSize: number
  createdAt: string
  uploadId: string
}

export interface IPostOwner {
  firstName?: string
  lastName?: string
}

type SortDirection = 'asc' | 'desc'

export interface IPostParams {
  pageSize?: number;
  sortBy?: string;
  sortDirection?: SortDirection;
}