// may end up using this in the future
// disabling checking for now

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const requestTimeout = (fn, delay, registerCancel, evt) => {
  const start = new Date().getTime();

  const loop = () => {
    const delta = new Date().getTime() - start;

    if (delta >= delay) {
      fn(evt);
      registerCancel(noop);
      return;
    }

    const raf = requestAnimationFrame(loop);
    registerCancel(() => cancelAnimationFrame(raf));
  };

  const raf = requestAnimationFrame(loop);
  registerCancel(() => cancelAnimationFrame(raf));
};

import { useEffect, useRef } from 'react';

const useCancelableScheduledWork = () => {
  const cancelCallback = useRef(noop);
  const registerCancel = (fn) => (cancelCallback.current = fn);
  const cancelScheduledWork = () => cancelCallback.current();

  // Cancels the current sheduled work before the "unmount"
  useEffect(() => {
    return cancelScheduledWork;
  }, []);

  return [registerCancel, cancelScheduledWork];
};

export const useClickPrevention = ({ onClick, onDoubleClick, delay = 300 }) => {
  const [registerCancel, cancelScheduledRaf] = useCancelableScheduledWork();

  const handleClick = (event: React.MouseEvent) => {
    const evt = event;
    event.preventDefault();
    event.stopPropagation();
    cancelScheduledRaf();
    requestTimeout(onClick, delay, registerCancel, evt);
  };

  const handleDoubleClick = (event: React.MouseEvent) => {
    const evt = event;
    event.preventDefault();
    event.stopPropagation();
    cancelScheduledRaf();
    onDoubleClick(evt);
  };

  return [handleClick, handleDoubleClick];
};
