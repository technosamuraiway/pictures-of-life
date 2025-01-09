import { IGetLatestMessengersResponse, MessageItem } from '@/services'
import { MESSAGE_STATUS } from '@/shared'
import { create } from 'zustand/index'

type AssociativeArray = {
  messages: { [interlocutorId: number]: MessageItem }
}

type DialogListStore = {
  isDialogListRefetching: boolean
  latestMessages: AssociativeArray | null
  setLatestMessages: (response: IGetLatestMessengersResponse, currentUserId: number) => void
  switchDialogListRefetchingFalse: () => void
  switchDialogListRefetchingTrue: () => void
  updateMessage: (interlocutorId: number, messageText: string, status: MESSAGE_STATUS) => void
}

export const useDialogListStore = create<DialogListStore>(set => ({
  isDialogListRefetching: false,

  latestMessages: null,

  setLatestMessages: (response: IGetLatestMessengersResponse, currentUserId: number) =>
    set(state => {
      const associativeArray: AssociativeArray = {
        messages: {},
      }

      for (const item of response.items) {
        const interlocutorId = item.ownerId === currentUserId ? item.receiverId : item.ownerId

        associativeArray.messages[interlocutorId] = item
      }

      return { latestMessages: associativeArray }
    }),

  switchDialogListRefetchingFalse: () => set({ isDialogListRefetching: false }),
  switchDialogListRefetchingTrue: () => set({ isDialogListRefetching: true }),

  updateMessage: (interlocutorId: number, messageText: string, status: MESSAGE_STATUS) =>
    set(state => {
      if (!state.latestMessages || !state.latestMessages.messages[interlocutorId]) {
        return state
      }

      const updatedMessages = {
        ...state.latestMessages,
        messages: {
          ...state.latestMessages.messages,
          [interlocutorId]: {
            ...state.latestMessages.messages[interlocutorId],
            messageText,
            status,
          },
        },
      }

      return { latestMessages: updatedMessages }
    }),
}))
