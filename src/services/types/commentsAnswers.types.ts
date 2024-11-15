type PostId = { postId: number }

export type CreateNewCommentArgs = { content: string } & PostId

export type CreateNewCommentResponse = {
  answerCount: number
  content: string
  createdAt: Date
  from: {
    avatars: {}[]
    id: number
    username: string
  }
  id: number
  isLiked: boolean
  likeCount: number
  postId: number
}

export type UpdateLikeStatusOfCommentArgs = {
  commentId: number
  likeStatus: 'DISLIKE' | 'LIKE' | 'NONE'
} & PostId
