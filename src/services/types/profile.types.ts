export interface IProfileResponse {
  aboutMe: string
  avatars: AvatarsType[]
  city: string
  country: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  region: string
  userName: string
}

export type AvatarsType = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
