import { IPostImage } from './_common.types'

export interface IPostPublicResponse {
  items: IPostUser[]
  pageSize: number
  totalCount: number
  totalUsers: number
}

export type IPostsByNameResponse = {
  page: number
  pagesCount: string
} & Omit<IPostPublicResponse, 'totalCount' | 'totalUsers'>

export type IPostsByNameArgs = { pageNumber?: number; userName: string } & Omit<
  IPostParams,
  'endCursorPostId'
>

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
  totalCount: number
  updatedAt: string
  userName: string
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

export interface IGetUserPublicPostsArgs extends IPostParams {
  userId: number
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
