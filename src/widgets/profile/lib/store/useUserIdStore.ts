import { Undefinedable } from '@/shared'
import { create } from 'zustand/react'

type UserIdStore = {
  setUserIdStore: (userIdStore: Undefinedable<string>) => void
  userIdStore: Undefinedable<string>
}

export const useUserIdStore = create<UserIdStore>(set => ({
  setUserIdStore: (userIdStore: Undefinedable<string>) =>
    set(() => {
      return { userIdStore }
    }),

  userIdStore: undefined,
}))
