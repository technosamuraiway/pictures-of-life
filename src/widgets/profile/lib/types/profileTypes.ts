import { IPostImage } from '@/services/types/_common.types'

export type PostWithId = {
  id: number
  images: IPostImage[]
}

export type PostsAssociativeArray = Record<string, IPostImage[]>
