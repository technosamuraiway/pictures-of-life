import { create } from 'zustand/index'

type DialogListStore = {
  isDialogListRefetching: boolean
  switchDialogListRefetchingFalse: () => void
  switchDialogListRefetchingTrue: () => void
}

export const useDialogListStore = create<DialogListStore>(set => ({
  isDialogListRefetching: false,

  switchDialogListRefetchingFalse: () => set({ isDialogListRefetching: false }),
  switchDialogListRefetchingTrue: () => set({ isDialogListRefetching: true }),
}))
