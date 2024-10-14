export interface IPostPublicResponse {
  items: IPostUser[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type IPostsByName = Omit<IPostPublicResponse, 'totalUsers'>

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

export type SortDirection = 'asc' | 'desc'

export interface IPostParams {
  endCursorPostId?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: SortDirection
}

export type IUploadPostImagesArgs = {
  files: File[]
}

export type IUploadPostImagesResponse = {
  images: IPostImage[]
}

export type ICreatePostArgs = {
  description: string
  uploadIds: string[]
}
