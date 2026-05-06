'use server'

import { auth } from '@/lib/auth'
import { CreateOrgInput, createOrgSchema } from '@/lib/validation/orgs'
import { ActionResult } from '@/types'
import { headers } from 'next/headers'

export async function createOrgAction(
  data: CreateOrgInput,
): Promise<ActionResult> {
  const parsed = createOrgSchema.safeParse(data)

  if (!parsed.success) {
    return { success: false, error: parsed.error.message }
  }

  const { name, slug } = parsed.data

  try {
    const reqHeaders = await headers()

    await auth.api.createOrganization({
      body: {
        name,
        slug,
        keepCurrentActiveOrganization: true,
      },
      headers: reqHeaders,
    })

    return { success: true }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Error createing workspace',
    }
  }
}
