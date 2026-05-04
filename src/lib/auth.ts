import { db } from '@/db'
import * as authSchema from '@/db/schema/auth'
import { betterAuth, generateId } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { organization } from 'better-auth/plugins'
import { and, eq } from 'drizzle-orm'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await createDefaultOrganization(user.id)
        },
      },
    },
    session: {
      create: {
        before: async (session) => {
          const orgId = await getInitialOrganization(session.userId)
          return {
            data: {
              ...session,
              activeOrganizationId: orgId,
            },
          }
        },
      },
    },
  },
  plugins: [
    organization({
      schema: {
        organization: {
          additionalFields: {
            isPersonal: {
              type: 'boolean',
              input: false,
              required: false,
              defaultValue: false,
            },
          },
        },
      },
    }),
    nextCookies(),
  ],
})

async function createDefaultOrganization(userId: string) {
  await db.transaction(async (tx) => {
    const [org] = await tx
      .insert(authSchema.organization)
      .values({
        id: generateId(),
        name: 'Personal Workspace',
        slug: `workspace-${userId}`,
        isPersonal: true,
        createdAt: new Date(),
      })
      .returning()

    await tx.insert(authSchema.member).values({
      id: generateId(),
      organizationId: org.id,
      userId: userId,
      role: 'owner',
      createdAt: new Date(),
    })
  })
}

async function getInitialOrganization(userId: string) {
  const [{ orgId }] = await db
    .select({ orgId: authSchema.organization.id })
    .from(authSchema.organization)
    .innerJoin(
      authSchema.member,
      eq(authSchema.member.organizationId, authSchema.organization.id),
    )
    .where(
      and(
        eq(authSchema.member.userId, userId),
        eq(authSchema.organization.isPersonal, true),
      ),
    )
    .limit(1)

  return orgId
}
