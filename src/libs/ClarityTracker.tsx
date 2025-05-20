'use client';

import { useEffect } from 'react';
import { sendTagToClarity } from './clarity';

export const ClarityTracker = () => {
  useEffect(() => {
    const titleElement = document.querySelector('title');
    if (!titleElement) {
      return;
    }
    sendTagToClarity('page_title', document.title);

    const observer = new MutationObserver(() => {
      sendTagToClarity('page_title', document.title);
    });

    observer.observe(titleElement, {
      subtree: true,
      characterData: true,
      childList: true,
    });

    const handleError = (event: ErrorEvent) => {
      sendTagToClarity('error_message', [
        event.message,
        event.error?.stack || 'No stack trace',
        event.filename,
        event.lineno?.toString(),
      ]);
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      sendTagToClarity('unhandled_rejection', event.reason?.toString() || 'Unknown rejection');
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      observer.disconnect();
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
};
