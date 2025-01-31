import { render, screen } from '@testing-library/react'
import type { ArrowProps } from '.'
import { Arrow } from '.'

describe('Arrow', () => {
  const defaultProps: ArrowProps = {
    width: 14,
    height: 8,
  }

  it('renders the Arrow component with default values', () => {
    render(<Arrow {...defaultProps} />)

    const arrowElement = screen.getByTestId('arrow-component')

    expect(arrowElement).toBeInTheDocument()
    expect(arrowElement).toHaveAttribute('stroke', 'black')
    expect(arrowElement).toHaveAttribute('viewBox', '0 0 14 8')
  })

  it('renders the Arrow component with specified side and color', () => {
    const customProps: ArrowProps = {
      ...defaultProps,
      side: 'left',
      color: 'red',
    }

    render(<Arrow {...customProps} />)

    const arrowElement = screen.getByTestId('arrow-component')

    expect(arrowElement).toBeInTheDocument()
    expect(arrowElement).toHaveClass('rotate-90')
    expect(arrowElement).toHaveAttribute('stroke', 'red')
  })

  it('renders the Arrow component with currentColor and custom strokeWidth', () => {
    const customProps: ArrowProps = {
      ...defaultProps,
      currentColor: true,
      strokeWidth: 2.5,
    }

    render(<Arrow {...customProps} />)

    const arrowElement = screen
      .getByTestId('arrow-component')
      .getElementsByTagName('path')[0]

    expect(arrowElement).toBeInTheDocument()
    expect(arrowElement).toHaveAttribute('stroke', 'currentColor')
    expect(arrowElement).toHaveAttribute('stroke-width', '2.5')
  })
})
