import { fireEvent, render, screen } from '@testing-library/react'
import type { ButtonProps } from '.'
import { Button } from '.'

describe('Button', () => {
  const defaultProps: ButtonProps = {
    label: 'Button',
    variant: 'primary',
    size: 'sm',
    disabled: false,
    onClick: jest.fn(),
  }

  it('renders the Button component with default values', () => {
    render(<Button {...defaultProps} />)

    const buttonElement = screen.getByTestId('button-component')

    expect(buttonElement).toBeInTheDocument()

    expect(buttonElement).toHaveClass('transition-colors')
    expect(buttonElement).toHaveClass('bg-accent')
    expect(buttonElement).toHaveClass('text-white')
    expect(buttonElement).toHaveClass('text-sm')
    expect(buttonElement).not.toHaveClass('opacity-50')
  })

  it('renders the Button component with specified props', () => {
    const customProps: ButtonProps = {
      ...defaultProps,
      variant: 'secondary',
      size: 'lg',
      disabled: true,
      contentClass: 'custom-content',
      prefix: <span>Prefix</span>,
      suffix: <span>Suffix</span>,
    }

    render(<Button {...customProps} />)

    const buttonElement = screen.getByTestId('button-component')

    expect(buttonElement).toBeInTheDocument()

    expect(buttonElement).toHaveClass('border')
    expect(buttonElement).toHaveClass('text-accent')
    expect(buttonElement).toHaveClass('text-large')
    expect(buttonElement).toHaveClass('opacity-50')

    expect(screen.getByText('Prefix')).toBeInTheDocument()
    expect(screen.getByText('Suffix')).toBeInTheDocument()
  })

  it('calls the onClick function when the button is clicked', () => {
    const customProps: ButtonProps = {
      ...defaultProps,
      onClick: jest.fn(),
    }

    render(<Button {...customProps} />)

    const buttonElement = screen.getByTestId('button-component')

    fireEvent.click(buttonElement)

    expect(customProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('renders the Button component with an arrow', () => {
    const customProps: ButtonProps = {
      ...defaultProps,
      arrow: 'right',
      arrowSize: { width: 10, height: 5 },
      arrowColor: 'blue',
      arrowStrokeWidth: 2,
      arrowClassName: 'custom-arrow',
      id: 'custom-id',
    }

    render(<Button {...customProps} />)

    const buttonElement = screen.getByTestId('button-component')
    const arrowElement = screen.getByTestId('arrow-component')

    expect(buttonElement).toBeInTheDocument()

    expect(arrowElement).toBeInTheDocument()

    expect(arrowElement).toHaveClass('rotate-[270deg]')
    expect(arrowElement).toHaveClass('custom-arrow')
    expect(arrowElement).toHaveAttribute('width', '10')
    expect(arrowElement).toHaveAttribute('height', '5')
    expect(arrowElement).toHaveAttribute('stroke', 'blue')
    expect(arrowElement.getElementsByTagName('path')[0]).toHaveAttribute(
      'stroke-width',
      '2'
    )
  })

  it('renders the Arrow component with numeric arrowSize value', () => {
    const customProps: ButtonProps = {
      ...defaultProps,
      arrow: 'right',
      arrowSize: 16,
      arrowColor: 'blue',
      arrowStrokeWidth: 2,
      arrowClassName: 'custom-arrow',
    }

    render(<Button {...customProps} />)

    const arrowElement = screen.getByTestId('arrow-component')

    expect(arrowElement).toBeInTheDocument()

    expect(arrowElement).toHaveAttribute('width', '16')
    expect(arrowElement).toHaveAttribute('height', '16')
  })
})
