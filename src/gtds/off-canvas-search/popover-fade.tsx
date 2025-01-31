import { OffcanvasActivator } from '@/components/Shared/Offcanvas/Activator'
import clsx from 'clsx'
import { useEffect } from 'react'

export const PopoverFade = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  children?: React.ReactNode
}) => {
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        document.documentElement.scrollTop = 0
      }, 50)
    }
  }, [isOpen])

  return (
    <div
      className={clsx(
        isOpen
          ? 'relative left-0 top-0 z-50 flex min-h-[79px] w-full max-w-[1024px] shrink flex-col items-center justify-between bg-white px-6 h-full-screen'
          : ''
      )}
    >
      <div
        className={clsx(
          'duration-600 transition-colors',
          isOpen
            ? 'fixed left-0 top-0 flex w-full flex-col bg-white opacity-100 h-full-screen'
            : 'absolute bg-transparent'
        )}
      >
        {isOpen ? (
          <OffcanvasActivator
            label="Search"
            onClick={() => setIsOpen(false)}
            open={isOpen}
          />
        ) : null}
        {children}
      </div>
    </div>
  )
}
