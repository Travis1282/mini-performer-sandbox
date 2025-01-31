import React from 'react'
import { render, screen } from '@testing-library/react'
import { AdGroupBuyerGuarantee, SafeAndSecureBuyerGuarantee } from './Alerts'

describe('AdGroup/Alerts', () => {
  it('renders AdGroupBuyerGuarantee and text should be in the document', () => {
    render(<AdGroupBuyerGuarantee />)

    expect(screen.getAllByText('100% Buyer Guarantee')[0]).toBeInTheDocument()
    expect(
      screen.getByText(
        'Every ticket listed on GoTickets is authentic and verified from trusted sellers'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Purchase protection and a commitment to on-time delivery'
      )
    ).toBeInTheDocument()
  })

  it('renders SafeAndSecureBuyerGuarantee and text should be in the document', () => {
    render(<SafeAndSecureBuyerGuarantee />)

    expect(screen.getAllByText('Safe & Secure Checkout')[0]).toBeInTheDocument()
    expect(
      screen.getByText(
        'Our site uses SSL encryption to ensure the transmission of your order information for processing'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'All transactions are secure and backed by 100% purchase protection'
      )
    ).toBeInTheDocument()
  })
})
