import clsx from 'clsx'

interface DividerProps {
  className?: string
  variant?: 'default' | 'light'
}

export const Divider = ({ className, variant = 'default' }: DividerProps) => (
  <hr
    className={clsx('h-[1px] w-full border-none', className, {
      'bg-[rgb(240,244,249)]': variant === 'light',
      'bg-[#B3B8BE]': variant === 'default',
    })}
  />
)
