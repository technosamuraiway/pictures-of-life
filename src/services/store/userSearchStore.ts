import { User } from '@/services/graphql/codegen/graphql'
import { UserSearch } from '@/services/types/users.types'
import { create } from 'zustand'

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
  setRecentUsers: users => set({ recentUsers: users }),
  setSearchInput: searchInput => set({ searchInput }),
}))
