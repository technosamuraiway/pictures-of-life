import { IPostImage } from './_common.types'

type Owner = {
  firstName: string
  lastName: string
}

type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}

export type GetPublicUserPostByIdResponse = {
  avatarOwner: string
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

export type GetPublicUserProfileByIdResponse = {
  aboutMe: string
  avatars: Avatar[]
  id: number
  userName: string
}
