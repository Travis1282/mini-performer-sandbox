export const PARAMS_TO_CHECK = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'keywordId',
  'gclid',
  'msclkid',
  'tid',
  'agid',
  'gbraid',
  'wbraid',
  'network',
  'cid',
]

export const SESSION_COOKIE = 'gt_sid'
export const PROFILE_COOKIE = 'gt_pid'
export const PREVIOUS_PARAMS_COOKIE = 'gt_up'
export const COOKIE_EXPIRY_DAYS = 90
export const IS_PROD = import.meta.env.VITE_APP_ENV === 'production'
export const COOKIE_DOMAIN =
  import.meta.env.VITE_COOKIE_DOMAIN ?? '.gotickets.com'
export const COOKIE_SAME_SITE = IS_PROD ? 'lax' : 'none'
