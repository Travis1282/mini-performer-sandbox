import { useEffect, useRef, useState } from 'react';
import { Display } from '@/contracts/UiVariants';

export function useIsMobile(): { isMobile: boolean; isInitialized: boolean } {
  const [isMobile, setIsMobile] = useState(false);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    setIsMobile(Boolean(window.innerWidth < Display.lg));

    function mediaQueryCallback(e: MediaQueryListEvent) {
      setIsMobile(e.matches);
    }

    const mediaQuery = window.matchMedia(`(max-width: ${Display.lg}px)`);
    const isOldQuery = !mediaQuery.addEventListener;
    if (isOldQuery) {
      mediaQuery['addListener'](mediaQueryCallback);
    } else {
      mediaQuery?.addEventListener('change', mediaQueryCallback);
    }
    isInitializedRef.current = true;
    return () => {
      if (isOldQuery) {
        mediaQuery['addListener'](mediaQueryCallback);
      } else {
        mediaQuery?.addEventListener('change', mediaQueryCallback);
      }
    };
  }, []);

  return { isMobile, isInitialized: isInitializedRef.current };
}
