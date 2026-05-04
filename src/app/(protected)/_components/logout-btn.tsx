'use client'

import { Button } from '@/components/ui/button'
import { logoutAction } from '@/lib/actions/auth'
import { Loader2, LogOutIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function LogoutButton() {
  const [isPending, setIsPending] = useState(false)

  async function handleLogout() {
    setIsPending(true)

    const result = await logoutAction()

    if (!result.success) {
      toast.error(result.error)
    }

    setIsPending(false)
  }
  return (
    <Button onClick={handleLogout} disabled={isPending} title='Logout'>
      {isPending ? <Loader2 className='size-4 animate-spin' /> : <LogOutIcon />}
      <span className='sr-only'>Logout</span>
    </Button>
  )
}
