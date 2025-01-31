'use client'

import type { FocusTrapProps } from 'focus-trap-react'
import type { CSSProperties } from 'react'
import { useOutsideClick } from '@/hooks/useClickOutside'
import { resolveImagePath } from '@/utils/helpers'
import { usePreventScroll } from '@react-aria/overlays'
import clsx from 'clsx'
import { FocusTrap } from 'focus-trap-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export interface ModalProps {
  children: React.ReactNode
  className?: string
  classNameBody?: string
  classNameHeader?: string
  classNameOverlay?: string
  classNameTitle?: string
  closeButtonId?: string
  'data-testid'?: string
  disableOverlayClick?: boolean
  disableScroll?: boolean
  focusTrapOptions?: FocusTrapProps['focusTrapOptions']
  keepMounted?: boolean
  open: boolean
  persist?: boolean
  setOpen?: (open: boolean) => void
  showCloseButton?: boolean
  showDefaultHeader?: boolean
  slots?: {
    actions?: React.ReactNode
  }
  styleOverlay?: CSSProperties | undefined
  title?: string
  titleId?: string
  trapFocus?: boolean
}

export function Modal({
  children,
  className = '',
  classNameBody = '',
  classNameHeader = '',
  classNameOverlay = '',
  classNameTitle = '',
  closeButtonId = '',
  disableOverlayClick = false,
  keepMounted = false,
  open,
  persist = false,
  setOpen,
  showCloseButton = true,
  showDefaultHeader = true,
  styleOverlay,
  slots,
  title,
  titleId = '',
  disableScroll = true,
  trapFocus = false,
  focusTrapOptions,
  ...rest
}: ModalProps) {
  const [mounted, setMounted] = useState(false)
  const bodyWrapperRef = useOutsideClick(() => {
    if (persist || !open || disableOverlayClick) {
      return
    }
    if (setOpen) {
      setOpen(false)
    }
  })

  const shoudlDisableScroll = open && disableScroll

  usePreventScroll({
    isDisabled: !shoudlDisableScroll,
  })

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const defaultFocusTrapOptions: FocusTrapProps['focusTrapOptions'] = {
    initialFocus: false,
    clickOutsideDeactivates: true,
    allowOutsideClick: true,
  }

  if (process.env.NODE_ENV === 'test') {
    defaultFocusTrapOptions.tabbableOptions = {
      displayCheck: 'none',
    }
  }

  const shouldRenderContent = keepMounted || open
  if (mounted) {
    let modalPortal = document.querySelector('#modalPortal')
    if (!modalPortal) {
      modalPortal = document.createElement('div')
      modalPortal.setAttribute('id', 'modalPortal')
      document.body.appendChild(modalPortal)
    }
    if (modalPortal) {
      return createPortal(
        <div
          className={clsx(
            'modal-overlay z-150 bg-dark fixed left-0 top-0 bg-opacity-40',
            open
              ? 'h-full-screen flex w-full items-end lg:items-center lg:justify-center'
              : 'hidden',
            classNameOverlay
          )}
          onClick={(e) => {
            e.stopPropagation()
          }}
          style={styleOverlay}
        >
          <FocusTrap
            active={
              process.env.NODE_ENV !== 'test' &&
              shouldRenderContent &&
              trapFocus
            }
            focusTrapOptions={{
              ...defaultFocusTrapOptions,
              ...focusTrapOptions,
              checkCanFocusTrap: (trapContainers) => {
                const results = trapContainers.map((trapContainer) => {
                  return new Promise((resolve) => {
                    const interval = setInterval(() => {
                      if (
                        getComputedStyle(trapContainer).visibility !== 'hidden'
                      ) {
                        resolve(undefined)
                        clearInterval(interval)
                      }
                    }, 5)
                  })
                })
                // Return a promise that resolves when all the trap containers are able to receive focus
                return Promise.all(results) as unknown as Promise<void>
              },
            }}
          >
            <div
              aria-modal="true"
              className={clsx(
                'modal-container z-150 grid w-screen grid-rows-[min-content,1fr] bg-white pb-6 opacity-100 lg:w-[500px] lg:rounded-xl lg:px-6',
                className
              )}
              data-cy="modal"
              ref={bodyWrapperRef}
              role="dialog"
            >
              {shouldRenderContent ? (
                <>
                  {showDefaultHeader && (
                    <div
                      className={clsx(
                        'modal-container__header text-dark flex flex-row justify-between px-4 py-6 lg:px-0',
                        classNameHeader
                      )}
                    >
                      {title ? (
                        <h2
                          className={clsx('h3-lg', classNameTitle)}
                          data-testid={`${rest['data-testid']}-modal-title`}
                          id={titleId}
                        >
                          {title}
                        </h2>
                      ) : null}

                      {showCloseButton && (
                        <button
                          data-testid={`${rest['data-testid']}-modal-close`}
                          id={closeButtonId}
                          onClick={(e) => {
                            e.stopPropagation()
                            if (setOpen) {
                              setOpen(false)
                            }
                          }}
                        >
                          <Image
                            alt="reset icon"
                            aria-label="close"
                            className="cursor-pointer"
                            height={15}
                            src={resolveImagePath('/img/icons/fi-br-cross.svg')}
                            unoptimized
                            width={15}
                          />
                        </button>
                      )}
                    </div>
                  )}
                  <div
                    className={clsx(
                      'modal-container__body flex flex-col overflow-hidden',
                      classNameBody
                    )}
                    data-cy="mobileSorting"
                  >
                    {children}
                  </div>
                  {slots?.actions ? <>{slots.actions}</> : null}
                </>
              ) : null}
            </div>
          </FocusTrap>
        </div>,
        modalPortal
      )
    }
  }
  return null
}
