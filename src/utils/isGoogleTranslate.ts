export function isGoogleTranslateActive(defaultLang = 'en') {
  // Check for google translate cookie
  if (document.cookie.split(';').some((cookie) => cookie.trim().startsWith('googtrans='))) {
    return true;
  }
  // Check for the google translate banner iframe
  if (document.querySelector('iframe.goog-te-banner-frame')) {
    return true;
  }
  // Check if the lang attribute has changed from your default
  if (document.documentElement.getAttribute('lang') !== defaultLang) {
    return true;
  }
  return false;
}
