import { useCallback, useEffect, useRef, useState } from 'react';

export const useSimulatedLoading = (duration = 1000, onLoadingComplete?: () => void) => {
  const [value, setValue] = useState(0);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const lastUpdateTimeRef = useRef<number | undefined>(undefined);
  const isRunningRef = useRef(false);

  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    isRunningRef.current = false;
    startTimeRef.current = undefined;
    lastUpdateTimeRef.current = undefined;
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const startIncrementing = useCallback(() => {
    cleanup();
    setValue(0);
    isRunningRef.current = true;
    startTimeRef.current = performance.now();
    lastUpdateTimeRef.current = performance.now();

    const animate = (currentTime: number) => {
      if (!isRunningRef.current || !startTimeRef.current) {
        return;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Check if enough time has passed since the last update
      const timeSinceLastUpdate = currentTime - (lastUpdateTimeRef.current || 0);

      if (progress < 1) {
        // If we're very close to the end (less than 2% remaining), complete immediately
        if (1 - value < 0.02) {
          setValue(1);
          cleanup();
          onLoadingComplete?.();
          return;
        }

        if (timeSinceLastUpdate >= 500) {
          // 500ms pause between updates
          // Calculate target progress based on elapsed time
          const targetProgress = progress;

          // Calculate how much we need to increment to catch up to where we should be
          const remainingTime = duration - elapsed;
          const remainingUpdates = Math.max(1, Math.floor(remainingTime / 500));
          const progressNeeded = targetProgress - value;

          // Add some randomness while ensuring we stay on track
          const minIncrement = progressNeeded / remainingUpdates;
          const maxIncrement = Math.min(minIncrement * 1.5, 1 - value);
          const increment = minIncrement + Math.random() * (maxIncrement - minIncrement);

          setValue((prev) => Math.min(prev + increment, 0.99));
          lastUpdateTimeRef.current = currentTime;
        }
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setValue(1);
        cleanup();
        onLoadingComplete?.();
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [duration, value, cleanup, onLoadingComplete]);

  return {
    value,
    startIncrementing,
  };
};
