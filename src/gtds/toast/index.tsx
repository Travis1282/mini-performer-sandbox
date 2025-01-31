import { useToastContext } from '@/contexts/ToastProvider'
import { resolveImagePath } from '@/utils/helpers'
import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function Toast({ id }: { id?: string }) {
  const { open, type, message, close } = useToastContext()
  const [openToast, setOpenToast] = useState(false)

  const [hideTag, setHideTag] = useState(true)

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setHideTag(true)
      }, 100)
      setOpenToast(false)
    }

    if (open) {
      setHideTag(false)
      setTimeout(() => {
        setOpenToast(true)
      }, 100)
    }
  }, [open])

  if (hideTag) {
    return null
  }

  return (
    <div
      aria-hidden={!openToast}
      className={clsx(
        'shadow-dropdown-button-box-shadow fixed top-20 z-[999] w-[300px] border-t bg-white transition-all duration-300 ease-in-out lg:top-28 lg:w-[400px] lg:border-l lg:border-t-0',
        openToast ? 'right-5 opacity-100' : '-right-5 opacity-0',
        type === 'success' && 'lg:border-l-success',
        type === 'warning' && 'lg:border-l-[#FF9C00]',
        type === 'error' && 'lg:border-l-orange'
      )}
      data-testid={id}
      id={id}
    >
      <div className="relative flex items-center justify-between gap-5 px-4 py-2 lg:px-[18px] lg:py-3">
        <div
          className={clsx(
            'absolute left-0 right-0 top-0 z-0 h-full w-full transition-all duration-300 lg:w-[160px]',
            type === 'success' &&
              'bg-[linear-gradient(180deg,rgba(49,167,116,.08),5%,rgba(49,167,116,0)_100%)] lg:bg-[linear-gradient(90deg,rgba(49,167,116,.08),5%,rgba(49,167,116,0)_100%)]',
            type === 'warning' &&
              'bg-[linear-gradient(180deg,rgba(255,156,0,.08),5%,rgba(255,156,0,0)_100%)] lg:bg-[linear-gradient(90deg,rgba(255,156,0,.08),5%,rgba(255,156,0,0)_100%)]',
            type === 'error' &&
              'bg-[linear-gradient(180deg,rgba(254,92,54,.08),5%,rgba(254,92,54,0)_100%)] lg:bg-[linear-gradient(90deg,rgba(254,92,54,.08),5%,rgba(254,92,54,0)_100%)]'
          )}
        />

        <div className="z-10 flex shrink flex-row items-center gap-6">
          <Image
            alt={`${type} icon`}
            className="h-[15px] w-[15px] lg:h-5 lg:w-5"
            height={24}
            src={resolveImagePath(`/img/${icons[type]}`)}
            unoptimized
            width={24}
          />
          <span className="text-dark h6-sm lg:text-large">{message}</span>
        </div>

        <button
          className="z-10 h-3 min-w-3"
          data-testid={id ? `${id}Close` : undefined}
          id={id ? `${id}Close` : undefined}
          onClick={() => {
            setOpenToast(false)
            close()
          }}
          type="button"
        >
          <Image
            alt="close icon"
            className="h-3 min-w-3"
            height={24}
            src={resolveImagePath('/img/close-gray.svg')}
            unoptimized
            width={24}
          />
        </button>
      </div>
    </div>
  )
}

const icons = {
  success: 'check-green.svg',
  warning: 'alert-yellow.svg',
  error: 'alert-orange.svg',
}
