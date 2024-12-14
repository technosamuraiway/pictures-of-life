import { MESSAGE_STATUS, MESSAGE_TYPE } from '@/shared'

export interface IGetLatestMessengersArgs {
  cursor?: number
  pageSize?: number
  searchName?: string
}

export interface IGetUserMessagesByUserIdArgs extends IGetLatestMessengersArgs {
  dialoguePartnerId: number
}

export type MessageItem = {
  avatars: Avatars[]
  createdAt: string
  id: number
  messageText: string
  messageType: MESSAGE_TYPE
  ownerId: number
  receiverId: number
  status: MESSAGE_STATUS
  updatedAt: string
  userName: string
}

export interface IGetLatestMessengersResponse extends BaseResponse {
  items: MessageItem[]
}

export type MessagesByIdItem = {
  createdAt: string
  id: number
  messageText: string
  messageType: MESSAGE_TYPE
  ownerId: number
  receiverId: number
  status: MESSAGE_STATUS
  updatedAt: string
}

export interface IGetUserMessagesByUserIdResponse extends BaseResponse {
  items: MessagesByIdItem[]
}

type BaseResponse = {
  notReadCount: number
  pageSize: number
  totalCount: number
}

type Avatars = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
