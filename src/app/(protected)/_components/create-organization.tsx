'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { CreateOrganizationForm } from './create-organization-form'

export function CreateOrganization() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='ghost' size='lg' className='w-full justify-start'>
          <div className='flex size-6 items-center justify-center rounded-md border bg-transparent'>
            <PlusIcon className='size-4' />
          </div>
          <span>Create workspace</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace, invite members, and start collaborating.
          </DialogDescription>
        </DialogHeader>
        <CreateOrganizationForm close={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
