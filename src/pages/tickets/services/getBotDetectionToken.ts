import { solveChallenge } from 'altcha-lib'
import * as jose from 'jose'
import { getIssuesChallenge } from '../../../services/maverick/getIssuesChallenge'

export const getBotDetectionToken = async () => {
  try {
    const { data } = await getIssuesChallenge()

    const initialJWT = data?.jwt

    if (!initialJWT) {
      // noinspection ExceptionCaughtLocallyJS
      throw new Error('No initial JWT')
    }

    const { challenge, salt } = jose.decodeJwt(initialJWT) as {
      challenge: string
      salt: string
    }
    const resp = solveChallenge(challenge, salt)
    const solution = await resp.promise
    return btoa(
      JSON.stringify({ detectionResults: JSON.stringify(solution), initialJWT })
    )
  } catch (e) {
    console.warn('Error fetching bot token', e)
    throw e
  }
}
