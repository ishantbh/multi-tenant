import * as z from 'zod'

export const createOrgSchema = z.object({
  name: z
    .string()
    .min(5, 'Name must be at least 5 characters.')
    .max(32, 'Name must be at most 32 characters.'),
  slug: z
    .string()
    .min(5, 'Slug must be at least 5 characters.')
    .max(32, 'Slug must be at most 32 characters.')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug'),
})

export type CreateOrgInput = z.infer<typeof createOrgSchema>
