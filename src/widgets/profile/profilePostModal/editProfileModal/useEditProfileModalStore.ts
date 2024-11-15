import { create } from 'zustand/react'

type EditProfileModalStore = {
  isOpen: boolean
  onChange: (isOpen: boolean) => void
}

export const useEditProfileModalStore = create<EditProfileModalStore>(set => ({
  isOpen: false,
  onChange: (isOpen: boolean) =>
    set(() => {
      return { isOpen }
    }),
}))
