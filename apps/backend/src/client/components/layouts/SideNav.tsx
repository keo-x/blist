import Link from 'next/link'
import classNames from 'classnames'
import type {ReactNode} from 'react'
import {CalendarIcon, UsersIcon} from '@heroicons/react/24/outline'

type DashboardLink = {
  name: string
  to: string
  icon: ReactNode
}

const routeLinks: DashboardLink[] = [
  {
    name: 'Events',
    to: '/',
    icon: <CalendarIcon className="h-5 w-5 opacity-75" />,
  },
  {
    name: 'Users',
    to: '/users',
    icon: <UsersIcon className="h-5 w-5 opacity-75" />,
  },
]

const navItemClass =
  'flex items-center px-4 py-2 bg-white shrink-0 hover:bg-gray-100 cursor-pointer'

const buttomNavItemClass =
  'flex items-center p-4 bg-white shrink-0 hover:bg-gray-50 cursor-pointer'

export const SideNav = () => {
  return (
    <div
      className={classNames(
        'flex h-screen flex-col justify-between border-r bg-white w-fit'
      )}
    >
      <div className="px-4 py-6">
        <nav className="flex flex-col mt-6 space-y-1">
          {routeLinks.map(({to, name, icon}, index) => (
            <Link
              href={to}
              key={`${index}-{name}`}
              className={classNames(navItemClass, 'rounded-lg', {})}
            >
              <span>{icon}</span>
              <span className="ml-2">{name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="sticky border-t border-gray-100 inline-flex">
        <div className={classNames(buttomNavItemClass, 'space-x-1')}>
          <div className="w-10 h-10 bg-gray-400 rounded-full">
            <img
              alt="profile"
              src=""
              className="object-cover w-10 h-10 rounded-full hidden"
            />
          </div>
          <div>
            <p className="text-xs">
              <strong className="block font-medium">Jhon Doe</strong>
              <span> j@doe.com </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
