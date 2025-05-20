'use client';

import type { FC } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  FireIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export interface PillProps {
  className?: string;
  'data-testid'?: string;
  disableIcon?: boolean;
  disableTypography?: boolean;
  message: string;
  severity: 'error' | 'info' | 'success' | 'urgent' | 'warning';
  size?: 'lg' | 'md' | 'sm';
  typographyClassName?: string;
}

export const Pill: FC<PillProps> = ({
  'data-testid': dataTestId,
  message,
  severity,
  className,
  size = 'md',
  disableIcon = false,
  typographyClassName,
  disableTypography = false,
}) => {
  const baseClassName = 'flex items-center justify-center p-1 px-2 rounded-full text-center ';

  const variants = {
    info: 'bg-go-blue-50', // TODO
    warning: 'bg-yellow-100', // TODO
    error: 'bg-red-100', // TODO
    success: 'bg-ocean-green-100', // TODO
    urgent: 'bg-burnt-orange-50 text-burnt-orange-400 border border-burnt-orange-400',
  };

  const sizes = {
    sm: 'h-auto sm:h-5',
    md: 'h-6',
    lg: 'h-8',
  };

  const textSizes = {
    sm: 'body3',
    md: 'body2',
    lg: 'text-lg',
  };

  const icons = {
    info: InformationCircleIcon,
    warning: ExclamationTriangleIcon,
    error: ExclamationCircleIcon,
    success: CheckCircleIcon,
    urgent: FireIcon,
  };

  const iconClasses = {
    info: 'text-go-blue-600',
    warning: 'text-yellow-600',
    error: 'text-red-600',
    success: 'text-ocean-green-600',
    urgent: 'text-burnt-orange-400',
  };

  const iconClassesSize = {
    sm: 'h-2 w-2',
    md: 'h-4 w-4',
    lg: 'h-6 w-6',
  };

  const Icon = icons[severity];

  return (
    <div
      className={clsx('', baseClassName, variants[severity], sizes[size], className)}
      data-testid={dataTestId}
    >
      {disableIcon ? null : <Icon className={clsx(iconClasses[severity], iconClassesSize[size])} />}
      <p
        className={clsx(
          !disableTypography ? 'leading-none! font-semibold! uppercase' : '',
          !disableTypography ? textSizes[size] : '',
          typographyClassName,
          {
            'ml-2': !disableIcon,
            'ml-0': disableIcon,
          }
        )}
      >
        {message}
      </p>
    </div>
  );
};
