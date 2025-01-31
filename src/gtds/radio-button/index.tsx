import clsx from 'clsx'
import React from 'react'

export interface RadioButtonProps {
  backgroundColor: string
  backgroundColorSelected: string
  borderColor: string
  checked: boolean
  id?: string
  name?: string
  onChange: () => void
  selectedCircleColor: string
}

export function RadioButton({
  checked,
  onChange,
  selectedCircleColor,
  backgroundColor,
  backgroundColorSelected,
  borderColor,
  name,
  id,
}: RadioButtonProps) {
  return (
    <label className="cursor-pointer">
      <div
        className={clsx(
          `h-[18px] w-[18px] ${backgroundColor} border border-[${borderColor}] flex items-center justify-center rounded-full`,
          checked && `border-none !${backgroundColorSelected}`
        )}
      >
        {checked && (
          <div className={`h-2 w-2 ${selectedCircleColor} rounded-full`}></div>
        )}
      </div>
      <input
        checked={checked}
        className="sr-only"
        id={id}
        name={name}
        onChange={() => {
          onChange()
        }}
        type="radio"
      />
    </label>
  )
}
