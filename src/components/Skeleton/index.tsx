import clsx from 'clsx'

export const Skeleton = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-xs bg-gray-200',
        'after:absolute after:inset-0 after:-translate-x-full after:skew-x-[-30deg]',
        'after:bg-linear-to-r after:from-transparent after:via-white/40 after:to-transparent',
        'after:animate-skeleton-loading',
        className
      )}
    >
      {children}
    </div>
  )
}
