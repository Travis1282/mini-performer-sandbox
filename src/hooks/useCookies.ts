'use strict'
import { useRef } from 'react'
import Cookies from 'universal-cookie'

const useCookies = () => {
  const wasCookieSet = useRef(false)

  const setCookies = (
    cookies: {
      name?: string
      value?: string
      attributes?: { 'Max-Age'?: number }
    }[]
  ) => {
    try {
      if (!wasCookieSet.current) {
        wasCookieSet.current = true
        //set the cookies for the user
        const cookieStore = new Cookies()
        for (const cookie of cookies) {
          if (!cookie?.name) {
            continue
          }
          cookieStore.set(cookie?.name, cookie.value, {
            maxAge: cookie?.attributes?.['Max-Age'],
            path: '/',
          })
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return { setCookies }
}

export default useCookies
