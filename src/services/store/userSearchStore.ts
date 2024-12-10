import { UserSearch } from '@/services/types/users.types'
import { getUniqueItemsById } from '@/shared/utils/search'
import { create } from 'zustand'

// Ограничиваем 5 пользователями
const RECENT_USER_LENGTH = 5

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
    set({ recentUsers: getUniqueItemsById(users).slice(0, RECENT_USER_LENGTH) }),
  setSearchInput: searchInput => set({ searchInput }),
}))
