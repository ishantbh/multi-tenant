import { ThemeProvider } from '@/components/ui/theme/theme-provider'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Geist_Mono, Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Multi Tenant App',
  description:
    'A full-stack Next.js multi-tenant app built with Better-Auth, Drizzle ORM, and shadcn/ui',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={cn(
        'h-full antialiased font-sans',
        geistMono.variable,
        inter.variable,
      )}
    >
      <body className='min-h-full flex flex-col'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster richColors closeButton />
      </body>
    </html>
  )
}
