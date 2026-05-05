'use server'

import { auth } from '@/lib/auth'
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from '@/lib/validation/auth'
import { headers } from 'next/headers'

export type ActionResult = { success: true } | { success: false; error: string }

export async function loginAction(data: LoginInput): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(data)

  if (!parsed.success) {
    return { success: false, error: parsed.error.message }
  }

  const { email, password } = parsed.data

  try {
    const reqHeaders = await headers()

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
      headers: reqHeaders,
    })

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error logging in',
    }
  }
}

export async function registerAction(
  data: RegisterInput,
): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(data)

  if (!parsed.success) {
    return { success: false, error: parsed.error.message }
  }

  const { name, email, password } = parsed.data

  try {
    const reqHeaders = await headers()

    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
      headers: reqHeaders,
    })

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error signing up',
    }
  }
}
