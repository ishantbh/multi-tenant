'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import { ChevronsUpDownIcon, PlusIcon } from 'lucide-react'
import { toast } from 'sonner'

export function OrganizationSwitcher() {
  const { data: activeOrganization } = authClient.useActiveOrganization()
  const { data: organizations } = authClient.useListOrganizations()

  async function setActiveOrg(orgId: string) {
    try {
      const { error } = await authClient.organization.setActive({
        organizationId: orgId,
      })

      if (error) {
        toast.error(error.message ?? 'Failed to switch organization')
        return
      }

      toast.success('Successfully switched organization')
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Failed to switch organization',
      )
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-medium'>
              {activeOrganization?.name ?? 'Select Workspace'}
            </span>
          </div>
          <ChevronsUpDownIcon className='ml-auto' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className='text-xs text-muted-foreground'>
          Workspaces
        </DropdownMenuLabel>
        {organizations?.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => setActiveOrg(org.id)}
            className='gap-2 p-2'
          >
            {org.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className='gap-2 p-2'>
          <div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
            <PlusIcon className='size-4' />
          </div>
          <div className='font-medium text-muted-foreground'>
            Create workspace
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
