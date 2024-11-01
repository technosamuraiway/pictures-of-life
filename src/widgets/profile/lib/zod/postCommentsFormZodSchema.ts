import { z } from 'zod'

export const postCommentFormZodSchema = z.object({
  comment: z.string().max(500),
})

export type PostCommentFormZodSchema = z.infer<typeof postCommentFormZodSchema>
