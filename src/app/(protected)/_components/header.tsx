import { LogoutButton } from './logout-btn'
import { OrganizationSwitcher } from './organization-switcher'

export async function Header() {
  return (
    <header className='p-4 border-b'>
      <div className='flex gap-2 items-center justify-between'>
        <OrganizationSwitcher />
        <div className='flex items-center gap-2'>
          <div>Avatar</div>
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}
