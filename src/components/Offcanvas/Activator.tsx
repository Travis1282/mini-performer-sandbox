'use client';

import type { ReactNode } from 'react';
import { resolveImagePath } from '@/utils/helpers';

export interface OffcanvasActivatorProps {
  children?: ReactNode;
  className?: string;
  close?: ReactNode;
  label?: string;
  onClick: () => void;
  open?: boolean;
}

export function OffcanvasActivator({
  onClick,
  label,
  open,
  children,
  close,
  className,
}: OffcanvasActivatorProps) {
  return (
    <div
      className={`relative flex min-h-[79px] w-full shrink items-center justify-between px-6 ${
        className || ''
      }`}
      data-cy="offcanvas-activator"
    >
      {label && <span className="text-dark h2-sm font-semibold">{label}</span>}
      {open ? (
        <button
          data-cy="offcanvas-activator-close"
          onClick={() => {
            onClick();
          }}
          type="button"
        >
          {close ? (
            close
          ) : (
            <img
              alt="close icon"
              height={28}
              src={resolveImagePath('/img/close-bold-icon.svg')}
              style={{
                width: 28,
                height: 28,
              }}
              width={28}
            />
          )}
        </button>
      ) : null}
      {children}
    </div>
  );
}
