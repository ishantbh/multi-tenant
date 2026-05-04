'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { registerAction } from '@/lib/actions/auth'
import { type RegisterInput, registerSchema } from '@/lib/validation/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function RegisterForm() {
  const [isPending, setIsPending] = useState(false)

  const router = useRouter()

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: RegisterInput) {
    setIsPending(true)

    const result = await registerAction(data)

    if (result.success) {
      toast.success(
        'Successfully created account!\nPlease login with your credentials',
      )

      router.replace('/auth/login')
    } else {
      toast.error(result.error)
    }

    setIsPending(false)
  }

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle>Welcome!</CardTitle>
        <CardDescription>Create a new account to continue.</CardDescription>
        <CardAction>
          <Button variant='outline' asChild>
            <Link href='/auth/login'>Login</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id='register-form' onSubmit={form.handleSubmit(onSubmit)}>
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
                    type='text'
                    aria-invalid={fieldState.invalid}
                    placeholder='John Doe'
                    required
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='email'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='email'>Email</FieldLabel>
                  <Input
                    {...field}
                    id='email'
                    type='email'
                    aria-invalid={fieldState.invalid}
                    placeholder='m@example.com'
                    required
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='password'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='password'>Password</FieldLabel>
                  <Input
                    {...field}
                    id='password'
                    type='password'
                    aria-invalid={fieldState.invalid}
                    placeholder='••••••••'
                    required
                    minLength={8}
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name='confirmPassword'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='confirm-password'>
                    Confirm Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id='confirm-password'
                    type='password'
                    aria-invalid={fieldState.invalid}
                    placeholder='••••••••'
                    required
                    disabled={isPending}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type='submit' form='register-form' disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className='size-4 animate-spin' />
                <span>Registering...</span>
              </>
            ) : (
              <span>Register</span>
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
