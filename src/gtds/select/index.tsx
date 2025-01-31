import { resolveImagePath } from '@/utils/helpers'
import clsx from 'clsx'
import Image from 'next/image'

export interface SelectProps {
  autocomplete?: string
  className?: string
  'data-testid'?: string
  disabled?: boolean
  error?: string
  handleSelectValue: (value: string | undefined) => void
  id?: string
  infoIcon?: boolean
  inputRef?: React.Ref<HTMLSelectElement>
  label?: string
  name?: string
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void
  onClickInfoIcon?: () => void
  placeholder?: string
  selectedValue: string | undefined
  selectOptions: { value: number | string; label: string }[] | string[]
  style?: object
}
export const Select = ({
  autocomplete,
  className,
  disabled,
  error,
  handleSelectValue,
  id,
  infoIcon,
  inputRef,
  label,
  name,
  onBlur,
  onClickInfoIcon,
  placeholder,
  selectedValue,
  selectOptions,
  style = {},
  ...rest
}: SelectProps) => {
  const defaultTestId = rest['data-testid'] || id || name || label

  return (
    <div
      className="flex w-full flex-col"
      data-testid={defaultTestId ? `${defaultTestId}Div` : undefined}
      id={id || name || label ? `${id || name || label}Div` : undefined}
    >
      {label && (
        <div className="mb-2 flex flex-row items-center justify-between">
          <label
            className="text-dark text-large opacity-60"
            htmlFor={id ?? name ?? label}
          >
            {label}
          </label>

          {infoIcon && (
            <button className="flex" onClick={onClickInfoIcon} type="button">
              <Image
                alt="tooltip icon"
                className="opacity-60"
                height={14}
                src={resolveImagePath('/img/icons/fi-rr-comment-info.svg')}
                unoptimized
                width={14}
              />
            </button>
          )}
        </div>
      )}
      <select
        autoComplete={autocomplete}
        className={clsx(
          'w-full cursor-pointer select-none appearance-none rounded',
          error ? 'border-error' : '',
          className
        )}
        data-testid={defaultTestId ? defaultTestId : undefined}
        disabled={disabled}
        id={id ?? name ?? label}
        name={name}
        onBlur={onBlur && onBlur}
        onChange={(evt) => {
          handleSelectValue(evt.target.value)
        }}
        ref={inputRef}
        style={style}
        value={selectedValue || ''}
      >
        {placeholder && (
          <option disabled value="">
            {placeholder}
          </option>
        )}
        {selectOptions.map((option) => {
          if (typeof option === 'string') {
            return (
              <option key={option} value={option}>
                {option}
              </option>
            )
          } else {
            const { value, label } = option
            return (
              <option key={label} value={value}>
                {label}
              </option>
            )
          }
        })}
      </select>
      {error && (
        <span
          className="mt-1 text-[12px]"
          data-testid={defaultTestId ? `${defaultTestId}-error` : undefined}
        >
          <span className="text-small text-error font-medium">{error}</span>
        </span>
      )}
    </div>
  )
}
