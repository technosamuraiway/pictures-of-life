import { z } from 'zod'

export const editProfileModalValidation = z.object({
  description: z.string().trim().max(500),
})

export type EditProfileModalValidation = z.infer<typeof editProfileModalValidation>
