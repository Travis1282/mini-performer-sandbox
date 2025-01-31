import { fireEvent, render } from '@testing-library/react'
import { Toggle } from '.'

const setChecked = jest.fn()

describe('Toggle', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should be render without errors', () => {
    const { getByTestId } = render(<Toggle checked setChecked={setChecked} />)

    expect(getByTestId('check-input')).toBeInTheDocument()
  })

  it('should be render with label', () => {
    const { getByText, getByTestId } = render(
      <Toggle checked label="my-label" setChecked={setChecked} />
    )
    const labelWrapper = getByTestId('check-label-wrapper')

    expect(getByText('my-label')).toBeInTheDocument()
    expect(labelWrapper.className.includes('opacity-100')).toBeTruthy()
    expect(labelWrapper.className.includes('opacity-50')).toBeFalsy()
  })

  it('should be render with disabled component', () => {
    const { getByTestId } = render(
      <Toggle checked disabled label="my-label" setChecked={setChecked} />
    )

    const input = getByTestId('check-input')
    const labelWrapper = getByTestId('check-label-wrapper')

    const isDisabled = input.hasAttribute('disabled')

    expect(isDisabled).toBeTruthy()
    expect(labelWrapper.className.includes('opacity-50')).toBeTruthy()
    expect(labelWrapper.className.includes('opacity-100')).toBeFalsy()
  })

  it('should be able to Toggle', () => {
    const { getByTestId } = render(
      <Toggle
        checked={false}
        label="my-label"
        onCheck={setChecked}
        setChecked={setChecked}
      />
    )

    const input = getByTestId('check-input')
    fireEvent.click(input)

    expect(setChecked).toHaveBeenCalledWith(true)
  })
})
