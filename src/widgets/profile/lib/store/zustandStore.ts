import { create } from 'zustand/react'

type LastPostId = number | undefined

type ProfilePage = {
  lastPostId: LastPostId
  setLastPostId: (lastPostId: LastPostId) => void
}

export const useProfilePageStore = create<ProfilePage>(set => ({
  lastPostId: undefined,

  setLastPostId: (lastPostId: LastPostId) =>
    set(() => {
      return { lastPostId }
    }),
}))
