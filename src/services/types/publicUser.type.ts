type Avatars = {
  createdAt: Date
  fileSize: number
  height: number
  url: string
  width: number
}

export type GetPublicUserProfileByIdResponse = {
  aboutMe: string
  avatars: Avatars[]
  id: number
  userName: string
}
