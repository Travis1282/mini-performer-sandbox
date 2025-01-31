import React from 'react'
import { render, screen } from '@testing-library/react'
import { HurryStick } from './HurryStick'

describe('AdGroup/HurryStick', () => {
  it('renders HurryStick and text should be in the document', () => {
    render(<HurryStick />)

    expect(screen.getByText('Hurry!')).toBeInTheDocument()
    expect(
      screen.getByText(
        'This is a high demand event and tickets are selling quickly, get yours before they’re gone.'
      )
    ).toBeInTheDocument()
  })
})
