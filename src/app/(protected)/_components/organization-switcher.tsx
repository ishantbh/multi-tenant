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
import { ChevronsUpDownIcon } from 'lucide-react'
import { toast } from 'sonner'
import { CreateOrganization } from './create-organization'

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
      <DropdownMenuContent className='w-50'>
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
        <DropdownMenuItem asChild>
          <CreateOrganization />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
