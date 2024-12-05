type PostId = { postId: number }

type From = {
  avatars: {}[]
  id: number
  username: string
}

export type CreateNewCommentArgs = { content: string } & PostId

export type CreateNewCommentResponse = {
  answerCount: number
  content: string
  createdAt: Date
  from: From
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export type UpdateLikeStatusOfCommentArgs = {
  commentId: number
  likeStatus: 'DISLIKE' | 'LIKE' | 'NONE'
} & PostId

export type CreateNewAnswerArgs = {
  commentId: number
} & CreateNewCommentArgs

export type CreateNewAnswerResponse = {
  commentId: number
  content: string
  createdAt: Date
  from: From
  id: number
  isLiked: boolean
  likeCount: number
}
