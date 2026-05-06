import { UserAvatar } from './user-avatar'
import { OrganizationSwitcher } from './organization-switcher'
import { ThemeToggle } from '@/components/ui/theme/theme-toggle'

export async function Header() {
  return (
    <header className='p-4 border-b'>
      <div className='flex gap-2 items-center justify-between'>
        <OrganizationSwitcher />
        <div className='flex items-center gap-2'>
          <UserAvatar />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
