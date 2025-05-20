import emailSpellChecker from '@zootools/email-spell-checker'
import { useCallback, useState } from 'react'

/**
 * Custom hook for email suggestions.
 * Provides functionality to check email spelling, dismiss suggestions, and clear the suggestion value.
 * @returns An object containing the suggested email, dismissal status, functions to check spelling, dismiss suggestion, and clear suggestion value.
 */
export const useEmailSuggestion = () => {
  const [suggestedEmail, setSuggestedEmail] = useState<string | undefined>(
    undefined
  )
  const [hasDismissedSuggestion, setHasDismissedSuggestion] = useState(false)

  /**
   * Check the spelling of an email address and set the suggested email
   */
  const checkEmailSpelling = useCallback(
    (email: string) => {
      const suggestedEmail = emailSpellChecker.run({
        email,
      })
      if (hasDismissedSuggestion) {
        return
      }
      setSuggestedEmail(suggestedEmail?.full)
    },
    [hasDismissedSuggestion]
  )

  /**
   * Dismiss the suggestion, clearing the value
   * and preventing it from showing again
   */
  const dismissSuggestion = useCallback(() => {
    setHasDismissedSuggestion(true)
    setSuggestedEmail(undefined)
  }, [])

  /**
   * Clear the suggestion value
   */
  const clearSuggestion = useCallback(() => {
    setSuggestedEmail(undefined)
  }, [])

  return {
    suggestedEmail,
    hasDismissedSuggestion,
    checkEmailSpelling,
    dismissSuggestion,
    clearSuggestion,
  }
}
