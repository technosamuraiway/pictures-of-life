import { UserSearch } from '@/services/types/users.types'
import { create } from 'zustand'

// Ограничиваем 10 пользователями
const RECENT_USER_LENGTH = 10

type userSearchState = {
  recentUsers: UserSearch[]
  reset: () => void
  searchInput: string
  setRecentUsers: (users: UserSearch[]) => void
  setSearchInput: (searchInput: string) => void
}

export const useUserSearchStore = create<userSearchState>(set => ({
  recentUsers: [],
  reset: () => set({ recentUsers: [], searchInput: '' }),
  searchInput: '',
  setRecentUsers: users =>
    set(state => {
      const combinedUsers = users.concat(state.recentUsers)
      const uniqueUsers = Array.from(
        new Map(combinedUsers.map(user => [JSON.stringify(user), user])).values()
      )

      return { recentUsers: uniqueUsers.slice(0, RECENT_USER_LENGTH) }
    }),
  setSearchInput: searchInput => set({ searchInput }),
}))
