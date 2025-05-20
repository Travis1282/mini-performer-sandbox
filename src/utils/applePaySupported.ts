'use client';

declare global {
  interface Window {
    ApplePaySession: {
      canMakePayments(): boolean;
    };
  }
}

export function applePaySupported() {
  if (window.ApplePaySession) {
    try {
      return window.ApplePaySession.canMakePayments() as boolean;
    } catch {
      return false;
    }
  } else {
    return false;
  }
}
