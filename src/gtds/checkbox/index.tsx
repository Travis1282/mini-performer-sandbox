'use client'
export interface CheckboxProps {
  checked: boolean
  'data-testid'?: string
  hidden?: boolean
  htmlFor?: string
  inputRef?: React.Ref<HTMLInputElement>
  label?: string
  name?: string
  onCheck?: () => void
  setChecked: (checked: boolean) => void
  type?: string
}

export function Checkbox({
  checked,
  hidden,
  htmlFor,
  inputRef,
  label,
  name,
  onCheck,
  setChecked,
  type,
  ...rest
}: CheckboxProps) {
  return (
    <>
      <input
        checked={checked}
        className="rounded text-accent focus:ring-accent"
        data-testid={rest['data-testid'] ?? htmlFor}
        hidden={hidden}
        id={htmlFor}
        name={name}
        onChange={() => {
          setChecked(!checked)
          if (onCheck) {
            onCheck()
          }
        }}
        ref={inputRef}
        type={type || 'checkbox'}
      />
      {label && <label htmlFor={htmlFor}>{label}</label>}
    </>
  )
}
