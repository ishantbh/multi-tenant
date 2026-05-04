import { LogoutButton } from './logout-btn'

export function Header() {
  return (
    <header className='p-4 border-b'>
      <div className='flex gap-2 items-center justify-between'>
        <div>Organization Switcher</div>
        <LogoutButton />
      </div>
    </header>
  )
}
