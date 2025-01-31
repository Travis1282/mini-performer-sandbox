import type { Dispatch, SetStateAction } from 'react'
import clsx from 'clsx'

export interface ToggleProps {
  checked: boolean
  disabled?: boolean
  htmlFor?: string
  label?: string
  onCheck?: (checked: boolean) => void
  setChecked: ((checked: boolean) => void) | Dispatch<SetStateAction<boolean>>
  size?: 'md' | 'sm'
}

export function Toggle({
  checked,
  setChecked,
  label,
  htmlFor = 'autosearch',
  onCheck,
  size = 'md',
  disabled,
}: ToggleProps) {
  return (
    <>
      <label
        className={clsx(
          'flex cursor-pointer select-none items-center',
          disabled ? 'opacity-50' : 'opacity-100'
        )}
        data-testid="check-label-wrapper"
      >
        <div className="relative">
          <input
            checked={checked}
            className="sr-only"
            data-testid="check-input"
            disabled={disabled}
            id={htmlFor}
            onChange={(e) => {
              setChecked(!checked)
              if (onCheck) {
                onCheck(e.target.checked)
              }
            }}
            type="checkbox"
          />
          <div
            className={`box block rounded-full ${
              checked ? 'bg-accent' : 'border-accent border'
            } ${size === 'md' ? 'h-6 w-10' : 'h-[15px] w-[29px]'}`}
          ></div>
          <div
            className={`absolute flex items-center justify-center rounded-full transition ${
              checked ? 'translate-x-full bg-white' : 'bg-accent'
            } ${
              size === 'md'
                ? 'left-1 top-1 h-4 w-4'
                : 'left-[4px] top-[2px] h-[11px] w-[11px]'
            }`}
          ></div>
        </div>
      </label>
      {label && (
        <label className="ml-4 text-sm font-semibold" htmlFor={htmlFor}>
          {label}
        </label>
      )}
    </>
  )
}
