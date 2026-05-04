import * as z from 'zod'

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string(),
})

export type LoginInput = z.infer<typeof loginSchema>

export const registerSchema = z
  .object({
    name: z.string('Name is required'),
    email: z.email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterInput = z.infer<typeof registerSchema>
