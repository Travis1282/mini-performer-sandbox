'use client';

import type { ReactNode } from 'react';
import clsx from 'clsx';

export interface OffcanvasContentProps {
  children?: ReactNode;
  className?: string;
}

export function OffcanvasContent({ className, children }: OffcanvasContentProps) {
  return (
    <div className={clsx('grow overflow-y-auto', className)} data-cy="offcanvas-content">
      {children}
    </div>
  );
}
