import { drizzle } from 'drizzle-orm/postgres-js'

const globalForDb = globalThis as unknown as {
  db: ReturnType<typeof drizzle> | undefined
}

export const db = globalForDb.db ?? drizzle(process.env.DATABASE_URL!)

if (process.env.NODE_ENV !== 'production') {
  globalForDb.db = db
}
