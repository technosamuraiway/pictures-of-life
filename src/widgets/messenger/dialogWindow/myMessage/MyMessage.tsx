import { DefaultMessage } from '../defaultMessage/DefaultMessage'

interface IProps {
  createdAt: string
  isRead?: boolean
  message: string
}

export const MyMessage = ({ createdAt, isRead, message }: IProps) => {
  return <DefaultMessage createdAt={createdAt} isMine isRead={isRead} message={message} />
}
