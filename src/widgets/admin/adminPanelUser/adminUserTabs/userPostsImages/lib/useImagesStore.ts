import { create } from 'zustand'

export interface IUserImages {
  id: number
  url: string
}

type ImagesStore = {
  addImage: (image: IUserImages) => void
  images: IUserImages[]
  resetStore: () => void
}

export const useImagesStore = create<ImagesStore>(set => ({
  addImage: image => set(state => ({ images: [...state.images, image] })),
  images: [],
  resetStore: () => set(() => ({ images: [] })),
}))
