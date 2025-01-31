import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { CollapseProps } from '.'
import { Collapse } from '.'

jest.useFakeTimers()

describe('Collapse', () => {
  const defaultProps: CollapseProps = {
    activator: <span data-testid="activator">Activator</span>,
    content: <div data-testid="collapse-content">Content</div>,
    open: false,
    onOpen: jest.fn(),
  }

  it('renders the Collapse component with default values', async () => {
    render(<Collapse {...defaultProps} />)

    const activatorElement = screen.getByTestId('activator')
    const contentElement = screen.getByTestId('collapse-content')

    expect(activatorElement).toBeInTheDocument()
    waitFor(() => expect(contentElement).not.toBeVisible())
  })

  it('toggles open state when activator is clicked', async () => {
    render(<Collapse {...defaultProps} />)

    const activatorElement = screen.getByTestId('activator')

    act(() => {
      fireEvent.click(activatorElement)
    })
    await waitFor(
      () => {
        expect(defaultProps.onOpen).toHaveBeenCalledWith(true)
      },
      { timeout: 2000 }
    )

    act(() => {
      fireEvent.click(activatorElement)
    })
    await waitFor(
      () => {
        expect(defaultProps.onOpen).toHaveBeenCalledWith(false)
      },
      { timeout: 2000 }
    )
  })

  it('changes open state when "open" prop changes', () => {
    const customProps: CollapseProps = {
      ...defaultProps,
      open: true,
    }

    render(<Collapse {...customProps} />)

    const contentElement = screen.getByTestId('collapse-content')

    expect(contentElement).toBeVisible()

    render(<Collapse {...customProps} open={false} />)

    waitFor(() => expect(contentElement).not.toBeVisible())
  })

  it('does not change open state when "open" prop is not provided', () => {
    const customProps: CollapseProps = {
      ...defaultProps,
      open: true,
    }

    render(<Collapse {...customProps} />)

    const contentElement = screen.getByTestId('collapse-content')

    expect(contentElement).toBeVisible()

    render(<Collapse {...defaultProps} />)

    expect(contentElement).toBeVisible()
  })
})
