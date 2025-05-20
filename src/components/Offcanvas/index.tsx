'use client';

import type { ReactNode } from 'react';
import { useMobileOverflow } from '@/hooks/useMobileOverflow';
import * as Portal from '@radix-ui/react-portal';
import type { OffcanvasContentProps } from './OffcanvasContent';
import { OffcanvasActivator } from './Activator';
import { OffcanvasContainer } from './Container';
import { OffcanvasContent } from './OffcanvasContent';

export interface OffcanvasProps {
  activator?: ReactNode;
  activatorClassName?: string;
  children?: ReactNode;
  close?: ReactNode;
  /**
   * Disable the use of a portal for the offcanvas content
   * by default the offcanvas content is not rendered in a portal
   * disabled to preserve backwards compatibility
   * @default true
   */
  disablePortal?: boolean;
  label?: string;
  onClick: () => void;
  open: boolean;
  slotProps?: {
    OffCanvasContent?: OffcanvasContentProps;
  };
}

export function Offcanvas({
  label,
  onClick,
  activator,
  activatorClassName,
  open,
  children,
  close,
  disablePortal = true,
  slotProps = {},
}: OffcanvasProps) {
  useMobileOverflow(open, true);

  const offCanvasContent = (
    <OffcanvasContainer open={open}>
      <OffcanvasActivator
        className={activatorClassName}
        close={close}
        label={label}
        onClick={onClick}
        open={open}
      >
        {activator}
      </OffcanvasActivator>
      <OffcanvasContent {...(slotProps.OffCanvasContent ?? {})}>{children}</OffcanvasContent>
    </OffcanvasContainer>
  );

  if (disablePortal) {
    return <>{offCanvasContent}</>;
  }

  return <Portal.Root>{offCanvasContent}</Portal.Root>;
}
