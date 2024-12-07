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
  avatarWhoLikes: []
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

export interface UserProfileResponse {
  aboutMe?: string
  avatars?: {
    createdAt: string
    fileSize: number
    height: number
    url: string
    width: number
  }[]
  id: number
  userMetadata?: {
    followers: number
    following: number
    publications: number
  }
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

export type UpdatePostLikeStatusArgs = {
  likeStatus: 'DISLIKE' | 'LIKE' | 'NONE'
  postId: number
}

export type ChangePostDescriptionArgs = {
  description: string
  postId: number
}

export type Answer = {
  commentId: number
  content: string
  createdAt: string
  from: {
    avatars: IAvatar[]
    id: number
    username: string
  }
  id: number
  isLiked: boolean
  likeCount: number
}

export type GetAnswersResponse = {
  items: Answer[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type GetAnswersArgs = {
  commentId: number
  pageNumber?: number
  pageSize?: number
  postId: number
  sortBy?: string
  sortDirection?: SortDirection
}

export type GetAnswersLikesResponse = {
  items: [
    {
      avatars: IAvatar[]
      createdAt: string
      id: number
      isFollowedBy: boolean
      isFollowing: boolean
      userId: number
      userName: string
    },
  ]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type GetAnswersLikesArgs = {
  answerId: number
  commentId: number
  cursor?: string
  pageNumber?: number
  pageSize?: string
  postId: number
  search?: string
}

export interface IPostLikesArgs {
  cursor?: string
  pageNumber?: number
  pageSize?: string
  postId: number
  search?: string
}

type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

type PostLikesItem = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}

export interface IPostLikesResponse {
  items: PostLikesItem[]
  notReadCount: number
  pageSize: number
  totalCount: number
}
