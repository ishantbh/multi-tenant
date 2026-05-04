'use server'

import { auth } from '@/lib/auth'
import { loginSchema, type LoginInput } from '@/lib/validation/auth'
import { headers } from 'next/headers'

type ActionResult = { success: true } | { success: false; error: string }

export async function loginAction(data: LoginInput): Promise<ActionResult> {
  await new Promise((resolve) => setTimeout(resolve, 3000))

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
