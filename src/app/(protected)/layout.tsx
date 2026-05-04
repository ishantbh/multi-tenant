import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Header } from './_components/header'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/auth/login')
  }

  return (
    <div className='flex-1 flex flex-col'>
      <Header />
      <main className='flex-1 flex flex-col p-4'>{children}</main>
    </div>
  )
}
