import { MessageItem } from '@/services'
import { useRouterLocaleDefinition, useUserIdFromParams } from '@/shared'
import { useMeWithRouter } from '@/shared/hooks/meWithRouter/useMeWithRouter'

export const useIdDeciders = (dialog: MessageItem) => {
  const t = useRouterLocaleDefinition()
  const { userId } = useUserIdFromParams()

  const { meData: meRequestData } = useMeWithRouter()

  const activeDialog = Number(userId) === dialog.ownerId || Number(userId) === dialog.receiverId

  const myMessage = dialog.ownerId === meRequestData?.userId

  const idDecider = dialog.ownerId === meRequestData?.userId ? dialog.receiverId : dialog.ownerId

  return { activeDialog, idDecider, myMessage, t }
}
