import { inctagramApi } from '@/services'

import {
  CreateNewAnswerArgs,
  CreateNewAnswerResponse,
  CreateNewCommentArgs,
  CreateNewCommentResponse,
  UpdateLikeStatusOfCommentArgs,
} from '../types/commentsAnswers.types'

const commentsAnswersService = inctagramApi.injectEndpoints({
  endpoints: builder => {
    return {
      createNewAnswer: builder.mutation<CreateNewAnswerResponse, CreateNewAnswerArgs>({
        invalidatesTags: ['Answers'],
        query: args => {
          const { commentId, content, postId } = args

          return {
            body: { content },
            method: 'POST',
            url: `/v1/posts/${postId}/comments/${commentId}/answers`,
          }
        },
      }),

      createNewComment: builder.mutation<CreateNewCommentResponse, CreateNewCommentArgs>({
        invalidatesTags: ['Comments'],
        query: args => {
          const { content, postId } = args

          return {
            body: { content },
            method: 'POST',
            url: `/v1/posts/${postId}/comments`,
          }
        },
      }),

      updateLikeStatusOfComment: builder.mutation<void, UpdateLikeStatusOfCommentArgs>({
        invalidatesTags: ['Comments'],
        query: args => {
          const { commentId, likeStatus, postId } = args

          return {
            body: { likeStatus },
            method: 'PUT',
            url: `/v1/posts/${postId}/comments/${commentId}/like-status`,
          }
        },
      }),
    }
  },
})

export const {
  useCreateNewAnswerMutation,
  useCreateNewCommentMutation,
  useUpdateLikeStatusOfCommentMutation,
} = commentsAnswersService
