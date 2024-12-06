import { User } from '@/services/graphql/codegen/graphql'
import { create } from 'zustand'

type userSearchState = {
  recentUsers: User[]
  reset: () => void
  searchInput: string
  setRecentUsers: (users: User[]) => void
  setSearchInput: (searchInput: string) => void
}

export const useUserSearchStore = create<userSearchState>(set => ({
  recentUsers: [],
  reset: () => set({ recentUsers: [], searchInput: '' }),
  searchInput: '',
  setRecentUsers: users => set({ recentUsers: users }),
  setSearchInput: searchInput => set({ searchInput }),
}))
