'use client'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { createOrgAction } from '@/lib/actions/orgs'
import { authClient } from '@/lib/auth-client'
import { CreateOrgInput, createOrgSchema } from '@/lib/validation/orgs'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

type Props = {
  close: () => void
}

export function CreateOrganizationForm({ close }: Props) {
  const { refetch } = authClient.useListOrganizations()

  const form = useForm<CreateOrgInput>({
    resolver: zodResolver(createOrgSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: CreateOrgInput) {
    const result = await createOrgAction(data)

    if (result.success) {
      toast.success('Successfully created workspace')

      await refetch()

      close()
    } else {
      toast.error(result.error)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name='name'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='name'>Name</FieldLabel>
              <Input
                {...field}
                id='name'
                aria-invalid={fieldState.invalid}
                placeholder='My Awesome Workspace'
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name='slug'
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor='slug'>Slug</FieldLabel>
              <Input
                {...field}
                id='slug'
                aria-invalid={fieldState.invalid}
                placeholder='my-awesome-workspace'
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className='size-4 animate-spin' />
                <span>Creating...</span>
              </>
            ) : (
              <span>Create</span>
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
