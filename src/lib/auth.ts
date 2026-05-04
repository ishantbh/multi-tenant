import { db } from '@/db'
import * as authSchema from '@/db/schema/auth'
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { nextCookies } from 'better-auth/next-js'
import { organization } from 'better-auth/plugins'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
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
