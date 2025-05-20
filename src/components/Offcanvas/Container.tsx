'use client';

import clsx from 'clsx';
import { type ReactNode, useEffect, useState } from 'react';

export interface OffcanvasContainerProps {
  children?: ReactNode;
  className?: string;
  /**
   * Whether to hide the backdrop
   * @default true hide backdrop by default due to backwards compatibility
   */
  hideBackdrop?: boolean;
  inlineStyles?: React.CSSProperties;
  onClickBackdrop?: () => void;
  open?: boolean;
  slideFrom?: 'left' | 'right';
  slots?: {
    backdrop?: {
      className?: string;
    };
  };
}

export function OffcanvasContainer({
  open,
  slideFrom = 'left',
  children,
  className,
  inlineStyles,
  onClickBackdrop,
  hideBackdrop = true,
  slots,
}: OffcanvasContainerProps) {
  const [offCanvasOpen, setOffCanvasOpen] = useState(false);

  useEffect(() => {
    setOffCanvasOpen(Boolean(open));
  }, [open]);

  return (
    <>
      <div
        className={clsx(
          'h-full-screen fixed top-0 z-250 flex w-full max-w-[1024px] flex-col bg-white transition-all duration-200',
          offCanvasOpen
            ? slideFrom === 'left'
              ? 'visible left-0'
              : 'visible right-0'
            : slideFrom === 'left'
              ? 'invisible -left-[calc(100vw+100%)]'
              : 'invisible -right-[calc(100vw+100%)]',
          className
        )}
        style={inlineStyles}
      >
        {hideBackdrop ? null : (
          <div
            aria-hidden="true"
            className={clsx(
              'fixed inset-0 bg-transparent transition-opacity',
              slots?.backdrop?.className
            )}
            onClick={() => {
              if (onClickBackdrop) {
                onClickBackdrop();
              }
            }}
          />
        )}
        {children}
      </div>
    </>
  );
}
