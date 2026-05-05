'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import { getInitials } from '@/lib/utils'
import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function UserAvatar() {
  const { data: session } = authClient.useSession()

  const router = useRouter()

  const initials = getInitials(session?.user.name)

  async function handleLogout() {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.replace('/auth/login')
          },
        },
      })

      toast.success('Successfully logged out')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error logging out')
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='rounded-full'>
          <Avatar>
            <AvatarImage src={session?.user.image ?? undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-32'>
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            {session?.user.name ?? 'Guest'}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant='destructive'
            onClick={handleLogout}
            title='Logout'
          >
            <span>Logout</span>
            <LogOutIcon className='size-4' />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
