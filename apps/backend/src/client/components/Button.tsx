import Link from 'next/link'
import {isNil} from 'rambda'
import classNames from 'classnames'
import type {ButtonHTMLAttributes, PropsWithChildren} from 'react'

type Variant = 'primary' | 'secondary' | 'transparent' | 'danger'

type Size = 'normal' | 'small' | 'large'

interface Props {
  disabled?: boolean
  variant?: Variant
  size?: Size
  loading?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  to?: string // TODO type using route config
}

// bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800
// text-xs
const defaulButtonClass =
  'inline-block px-6 py-2.5 font-medium leading-tight uppercase rounded shadow-md hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out'

export const Button = ({
  size = 'small',
  to,
  type = 'button',
  variant = 'primary',
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const className = classNames(
    defaulButtonClass,
    {
      'mb-2': !isNil(size),
      'text-xs': size === 'small',
      'text-base': size === 'normal',
      'text-lg': size === 'large',
    },
    {
      'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800':
        variant === 'primary',
    }
  )

  if (!isNil(to)) {
    return (
      <Link href={to} className={className} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  )
}
