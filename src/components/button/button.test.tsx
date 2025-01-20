import { describe, expect, it } from 'vitest'
import { render, screen } from '../../../src/services/testing/test-utils'
import { Button } from './button'

describe('Button', () => {
  it.only('renders correctly', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
  })

  it('displays the children prop', () => {
    const buttonText = 'Test Button'
    render(<Button>{buttonText}</Button>)
    expect(screen.getByText(buttonText)).toBeInTheDocument()
  })

  it('has the correct styling classes', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass(
      'inline-flex',
      'items-center',
      'justify-center',
      'whitespace-nowrap',
      'rounded-md',
      'bg-blue-600',
      'px-4',
      'py-3',
      'font-semibold',
      'text-white',
      'transition-colors',
      'hover:bg-blue-700',
      'active:bg-blue-800'
    )
  })
})
