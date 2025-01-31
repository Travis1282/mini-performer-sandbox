import type { HTMLInputTypeAttribute, Ref } from 'react'
import { resolveImagePath } from '@/utils/helpers'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  autocomplete?: string
  className?: string
  'data-testid'?: string
  disabled?: boolean
  error?: string
  helperText?: React.ReactNode | string
  hidden?: boolean
  id?: string
  infoIcon?: boolean
  inputAppend?: React.ReactNode
  inputClassName?: string
  inputRef?: Ref<HTMLInputElement>
  label?: string
  name: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClickInfoIcon?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  rightContent?: React.ReactNode
  style?: React.CSSProperties
  type?: HTMLInputTypeAttribute
  value?: string
}

export default function Input({
  autocomplete,
  autoComplete,
  className,
  defaultValue,
  disabled = false,
  error,
  helperText,
  id,
  infoIcon,
  inputAppend,
  inputClassName,
  inputRef,
  label,
  name,
  onBlur,
  onChange,
  onClickInfoIcon,
  placeholder,
  rightContent,
  style = {},
  type = 'text',
  value,
  ...rest
}: InputProps) {
  const autoCompleteValue = autoComplete || autocomplete

  const defaultTestId =
    rest['data-testid'] || id || name
      ? `${rest['data-testid'] || id || name}`
      : undefined

  return (
    <div
      className={clsx(className, 'relative flex w-full flex-col')}
      data-testid={`${defaultTestId}Div`}
      id={id || name ? `${id || name}Div` : undefined}
    >
      {label && (
        <div className="mb-2 flex flex-row items-center gap-2" id={label}>
          <label
            className="text-dark opacity-60 text-large"
            htmlFor={id ?? name}
          >
            {label}
          </label>

          {infoIcon && (
            <button
              className="flex"
              id={`${name} pop up`}
              onClick={onClickInfoIcon}
              type="button"
            >
              <Image
                alt="tooltip icon"
                height={14}
                src={resolveImagePath(
                  '/img/icons/fi-rr-comment-info-accent.svg'
                )}
                unoptimized
                width={14}
              />
            </button>
          )}
          {rightContent && <div className="ml-auto">{rightContent}</div>}
        </div>
      )}
      <div className="relative w-full">
        <input
          autoComplete={autoCompleteValue}
          className={clsx(
            'w-full rounded border border-[#B3B8BE] p-[9px] text-dark',
            error ? 'border-error' : 'border-[#B3B8BE]',
            inputAppend && 'pr-12',
            inputClassName ?? ''
          )}
          data-testid={defaultTestId}
          defaultValue={defaultValue}
          disabled={disabled}
          id={id ?? name}
          name={name}
          onBlur={onBlur && onBlur}
          onChange={onChange && onChange}
          placeholder={placeholder}
          ref={inputRef}
          size={1}
          style={style}
          type={type}
          value={value ?? ''}
        />
        {inputAppend}
      </div>

      {error ? (
        <span className="mt-1 text-[12px]">
          <span
            className="text-small font-medium text-error"
            data-testid={`${defaultTestId}-error`}
          >
            {error}
          </span>
        </span>
      ) : null}
      {helperText && !error ? (
        <span className="mt-1 text-[12px]">
          {typeof helperText === 'string' ? (
            <span className="text-small font-medium">{helperText}</span>
          ) : (
            <>{helperText}</>
          )}
        </span>
      ) : null}
    </div>
  )
}
