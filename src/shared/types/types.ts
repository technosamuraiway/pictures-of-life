export type PostImage = {
  __typename?: 'ImagePost'
  id?: null | number
  url?: null | string
}

export type PostOwner = {
  __typename?: 'PostOwnerModel'
  avatars?: PostOwnerAvatar[] | null
  id?: null | number
  userName?: null | string
}

export type PostOwnerAvatar = {
  __typename?: 'Avatar'
  url?: null | string
}

export interface IAdminPost {
  __typename?: 'Post'
  createdAt: null | string
  description: null | string
  id: null | number
  images?: PostImage[] | null
  postOwner: PostOwner
}
