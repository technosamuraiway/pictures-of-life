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

export interface ICommentResponse {
  items: IComment[]
  pageSize: number
  totalCount: number
}

export interface IComment {
  answerCount: number
  content: string
  createdAt: string
  from: ICommentAuthor
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export interface ICommentAuthor {
  avatars: IAvatar[]
  id: number
  username: string
}

export interface IAvatar {
  height: number
  url: string
  width: number
}
