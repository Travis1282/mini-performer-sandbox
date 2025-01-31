import React from 'react'
import { act, render, rest, screen, server } from '@/testing'
import { EventListNoEvents } from '.'
import { apiUrl } from '@/utils/config'

jest.mock('@next/third-parties/google', () => ({
  sendGTMEvent: jest.fn(),
}))

describe('EventListNoEvents', () => {
  afterEach(() => {
    server.resetHandlers()
  })

  test('renders NoEvents component', async () => {
    render(
      <EventListNoEvents
        id={1234}
        performerName="The bulls"
        type="performerId"
      />
    )

    // Just to wait internal states to finish and not log on console
    await act(async () => {})
  })

  test('renders error if no email', async () => {
    const { user } = render(
      <EventListNoEvents id={1234} performerName="The bulls" type="regionId" />
    )
    await act(async () => {
      await user.click(screen.getByRole('button', { name: /sign up/i }))
    })

    await act(async () => {
      expect(await screen.findByText(/invalid email address/i))
    })
  })

  test('subscribes', async () => {
    server.use(
      rest.post(
        `${apiUrl}/rest/subscriptions/performer-event-alert`,
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({}))
        }
      )
    )
    const { user } = render(
      <EventListNoEvents id={1234} performerName="The bulls" type="regionId" />
    )

    await act(
      async () =>
        await user.type(
          screen.getByPlaceholderText(/enter your email address/i),
          'test@test.com'
        )
    )

    await act(
      async () =>
        await user.click(screen.getByRole('button', { name: /sign up/i }))
    )

    await act(async () => {
      expect(await screen.findByText(/you have subscribed to this performer/i))
    })
  })
})
