'use client'

import { loginAction } from '@/app/auth/actions'
import { Button } from '@/components/ui/button'
import {
  Card,
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
import { type LoginInput, loginSchema } from '@/lib/validation/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export function LoginForm() {
  const [isPending, setIsPending] = useState(false)

  const router = useRouter()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: LoginInput) {
    setIsPending(true)

    const result = await loginAction(data)

    if (result.success) {
      console.log('Successfully logged in')

      router.replace('/')
    } else {
      console.log(result.error)
    }

    setIsPending(false)
  }

  return (
    <Card className='w-full sm:max-w-md'>
      <CardHeader>
        <CardTitle>Welcome Back!</CardTitle>
        <CardDescription>Login to your account to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id='login-form' onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
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
        <Button type='submit' form='login-form' disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className='size-4 animate-spin' />
              <span>Logging in...</span>
            </>
          ) : (
            <span>Login</span>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
