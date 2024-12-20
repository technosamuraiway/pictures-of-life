import { inctagramApi } from '../api/inctagram.api'
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

      updateLikeStatusOfAnswer: builder.mutation<
        void,
        { answerId: number } & UpdateLikeStatusOfCommentArgs
      >({
        invalidatesTags: ['Answers'],
        query: args => {
          const { answerId, commentId, likeStatus, postId } = args

          return {
            body: { likeStatus },
            method: 'PUT',
            url: `/v1/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
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
  useUpdateLikeStatusOfAnswerMutation,
  useUpdateLikeStatusOfCommentMutation,
} = commentsAnswersService
