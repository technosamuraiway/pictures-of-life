import { create } from 'zustand'

export interface IUserImages {
  id: number
  url: string
}

type ImagesStore = {
  addImages: (images: IUserImages[]) => void
  imagesData: IUserImages[]
  resetStore: () => void
}

export const useImagesStore = create<ImagesStore>(set => ({
  addImages: images =>
    set(state => ({
      imagesData: [...state.imagesData, ...images],
    })),
  imagesData: [],
  resetStore: () => set({ imagesData: [] }),
}))
