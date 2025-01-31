'use client'

import type { components } from '@/contracts/generated/maverick-schema'
import type ReCAPTCHA from 'react-google-recaptcha'
import Captcha, { getRecaptchaResponse } from '@/components/Captcha'
import { Button } from '@/components/Shared/Button'
import Input from '@/components/Shared/Input'
import { useToast } from '@/hooks/useToast'
import { GtmSignUpPerformerAlerts } from '@/libs/gtm/gtm'
import { postSubsciptionsPerformerEventAlert } from '@/services/maverick/postSubscriptionsPerformerEventAlert'
import { resolveImagePath } from '@/utils/helpers'
import Image from 'next/image'
import React, { useState } from 'react'
import { z, ZodError } from 'zod'
import { NoEventImage } from '../../Empty/NoEventImage'
import Loader from '../../Loader'

interface EventListNoEventsProps {
  id?: number
  performerName?: string
  type?: 'performerId' | 'regionId'
}

export function EventListNoEvents({
  id,
  type,
  performerName,
}: EventListNoEventsProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const schema = z.object({
    email: z.string().email('Invalid email address'),
  })

  const recaptchaRef = React.useRef<ReCAPTCHA>(null)

  const { toast } = useToast()

  async function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    if (!type || !id) {
      return
    }
    e.preventDefault()
    try {
      setLoading(true)
      const validated = schema.parse({ email })

      const recaptchaResponse = getRecaptchaResponse(recaptchaRef, toast)
      if (!recaptchaResponse) {
        setLoading(false)
        return
      }

      const item = { email: validated.email } as Record<string, number | string>

      item[type] = id
      const { error } = await postSubsciptionsPerformerEventAlert({
        body: {
          email: validated.email,
          [type]: id,
        } as components['schemas']['AddPerformerEventAlertRequest'],
        init: { headers: { 'X-Recaptcha-Response': recaptchaResponse } },
      })
      if (error) {
        throw error
      }
      GtmSignUpPerformerAlerts(`${id}`, performerName ?? '', email)
      setError('')
      setEmail('')
      toast({
        message: 'You have subscribed to this performer',
        type: 'success',
      })
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message)
      } else {
        toast({
          message: 'Something went wrong',
          type: 'error',
        })
        console.error(err)
      }
    } finally {
      if (recaptchaRef.current) {
        recaptchaRef.current.reset()
      }
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center" data-testid="noEvents">
      <div className="flex w-full max-w-[600px] flex-col items-center justify-center px-4 pb-6 pt-1 lg:py-[88px]">
        {type && id ? (
          <>
            <Image
              alt="Email no events"
              height={110}
              src={resolveImagePath('/img/email-no-events.svg')}
              unoptimized
              width={190}
            />
            <h4 className="text-dark h2-sm mt-6">No events happening</h4>
            <span className="text-dark h6-lg lg:!h3-sm mt-3 text-center text-opacity-50">
              Get notified when new events are added.
            </span>
            <form
              className="mt-4 flex w-full flex-col items-start justify-center gap-3 lg:flex-row lg:gap-3"
              onSubmit={handleSubscribe}
            >
              <div className="w-full self-center">
                <Input
                  error={error}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  style={{ height: '48px', fontSize: '14px' }}
                  value={email}
                />
              </div>
              <Button
                className="self-top !bg-submit !h6-lg lg:h3-sm w-full rounded border-none px-4 py-3 font-semibold !text-white transition-colors hover:opacity-80 active:!text-white active:!opacity-100 lg:max-w-[184px]"
                disabled={loading}
                label=""
                prefix={
                  loading ? (
                    <Loader height={22} radius={3} width={22} />
                  ) : (
                    <>
                      <span className="hidden lg:block">
                        Sign up for updates
                      </span>
                      <span className="block lg:hidden">Sign up</span>
                    </>
                  )
                }
                type="submit"
                variant="secondary"
              />
            </form>
            <span className="pt-3">
              <Captcha ref={recaptchaRef} />
            </span>
          </>
        ) : (
          <>
            <NoEventImage />
            <h4 className="text-dark h2-sm mt-6">No events happening</h4>
            <span className="text-dark h6-lg lg:!h3-sm mt-3 text-center text-opacity-50">
              Sorry but there are currently no events available, <br />
              please check back soon!
            </span>
          </>
        )}
      </div>
    </div>
  )
}
