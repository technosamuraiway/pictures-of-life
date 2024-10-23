import { IPostImage } from '@/services'

export type PostWithId = {
  id: number
  images: IPostImage[]
}
