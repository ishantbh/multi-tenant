import { UserAvatar } from './user-avatar'
import { OrganizationSwitcher } from './organization-switcher'

export async function Header() {
  return (
    <header className='p-4 border-b'>
      <div className='flex gap-2 items-center justify-between'>
        <OrganizationSwitcher />
        <UserAvatar />
      </div>
    </header>
  )
}
