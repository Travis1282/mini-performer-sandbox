export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  autocomplete?: string
  className?: string
  disabled?: boolean
  error?: string
  helperText?: React.ReactNode | string
  hidden?: boolean
  id?: string
  infoIcon?: boolean
  inputAppend?: React.ReactNode
  label?: string
  name: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClickInfoIcon?: () => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  placeholder?: string
  rightContent?: React.ReactNode
  style?: React.CSSProperties
  testid?: string
  type?: string
  value?: string
}
