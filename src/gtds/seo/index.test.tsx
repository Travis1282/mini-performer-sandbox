import React from 'react'
import { render } from '@testing-library/react'
import { Seo } from './index'

const mock =
  "<h2>Second City Mainstage Revue Tickets: Get Ready for a Night of Laughter</h2>\n<p>Are you ready to laugh until your sides hurt? Well, you're in luck because Second City Mainstage Revue is coming to town! Whether you're a fan of {{name}} or just looking for a fun night out, Second City Mainstage Revue is sure to deliver a hilarious performance that will have you rolling in the aisles.</p>"

describe('Seo', () => {
  it('renders Seo conponent', () => {
    const { getByText } = render(<Seo content={mock} />)
    expect(
      getByText(
        'Second City Mainstage Revue Tickets: Get Ready for a Night of Laughter'
      )
    ).toBeInTheDocument()
  })

  it('renders Seo conponent search and replace {{name}} by REPLACED_NAME', () => {
    const { getByText } = render(
      <Seo content={mock} replace={{ '{{name}}': 'REPLACED_NAME' }} />
    )
    expect(getByText(/REPLACED_NAME/)).toBeInTheDocument()
  })
})
