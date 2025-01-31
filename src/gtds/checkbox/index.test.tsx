import { fireEvent, render, screen } from '@testing-library/react'
import type { CheckboxProps } from '.'
import { Checkbox } from '.'

describe('Checkbox', () => {
  const defaultProps: CheckboxProps = {
    checked: false,
    setChecked: jest.fn(),
    onCheck: jest.fn(),
    label: 'Checkbox Label',
    htmlFor: 'checkboxId',
    name: 'checkboxName',
  }

  it('renders the Checkbox component with default values', () => {
    render(<Checkbox {...defaultProps} />)

    const checkboxElement = screen.getByTestId('checkboxId')
    const labelElement = screen.getByText('Checkbox Label')

    expect(checkboxElement).toBeInTheDocument()
    expect(checkboxElement).not.toBeChecked()
    expect(labelElement).toBeInTheDocument()
  })

  it('renders the Checkbox component as checked', () => {
    const customProps: CheckboxProps = {
      ...defaultProps,
      checked: true,
    }

    render(<Checkbox {...customProps} />)

    const checkboxElement = screen.getByTestId('checkboxId')

    expect(checkboxElement).toBeInTheDocument()
    expect(checkboxElement).toBeChecked()
  })

  it('calls setChecked and onCheck when checkbox is clicked', () => {
    render(<Checkbox {...defaultProps} />)

    const checkboxElement = screen.getByTestId('checkboxId')

    fireEvent.click(checkboxElement)

    expect(defaultProps.setChecked).toHaveBeenCalledWith(true)
    expect(defaultProps.onCheck).toHaveBeenCalledTimes(1)
  })

  it('does not call onCheck when onCheck is not provided', () => {
    const customProps: CheckboxProps = {
      ...defaultProps,
      onCheck: undefined,
    }

    render(<Checkbox {...customProps} />)

    const checkboxElement = screen.getByTestId('checkboxId')

    fireEvent.click(checkboxElement)

    expect(defaultProps.setChecked).toHaveBeenCalledWith(true)
    expect(defaultProps.onCheck).not.toHaveBeenCalled()
  })

  it('renders the Checkbox component without a label', () => {
    const customProps: CheckboxProps = {
      ...defaultProps,
      label: undefined,
    }

    render(<Checkbox {...customProps} />)

    const checkboxElement = screen.getByTestId('checkboxId')

    expect(checkboxElement).toBeInTheDocument()
    expect(screen.queryByText('Checkbox Label')).toBeNull()
  })
})
