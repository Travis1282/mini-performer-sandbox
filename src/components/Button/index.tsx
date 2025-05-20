'use client';

import type { Arrows, Sizes, Variants } from '@/contracts/UiVariants';
import { tw } from '@/utils/tw';
import clsx from 'clsx';
import { forwardRef, type ReactNode } from 'react';
import { Arrow } from '../Arrow';
import Loader from '../Loader';

type DataAttributes = Record<`data-${string}`, unknown>;

export interface ButtonProps extends DataAttributes {
  ariaLabel?: string;
  arrow?: Arrows;
  arrowClassName?: string;
  arrowColor?: string;
  arrowSize?: { width: number; height: number } | number;
  arrowStrokeWidth?: number;
  children?: React.ReactNode;
  className?: string;
  contentClass?: string;
  'data-testid'?: string;
  disabled?: boolean;
  href?: string;
  id?: string;
  /**
   * isLoading will set the prefix to a loading spinner if true
   */
  isLoading?: boolean;
  label?: null | ReactNode | string;
  onClick?: () => void;
  prefix?: React.ReactNode;
  rel?: string;
  role?: string;
  size?: Sizes;
  suffix?: React.ReactNode;
  target?: string;
  title?: string;
  type?: 'button' | 'reset' | 'submit' | undefined;
  variant?: Variants;
  viewBox?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    label = 'Button',
    isLoading = false,
    variant = 'primary',
    size = 'sm',
    disabled = false,
    arrow,
    arrowSize = 14,
    viewBox = '0 0 14 8',
    arrowColor = 'black',
    arrowStrokeWidth = 1.5,
    arrowClassName = '',
    className,
    contentClass,
    onClick,
    prefix,
    suffix,
    type,
    id,
    title,
    ariaLabel,
    href,
    target,
    children,
    rel,
    role,
    ...rest
  } = props;
  const defaultClasses = [tw`inline-flex flex-row items-center justify-center whitespace-nowrap`];

  const variantClasses = {
    primary: tw`bg-accent hover:bg-accent-hover active:bg-accent-dark text-white`,
    secondary: tw`border-accent text-accent hover:bg-accent-hover active:bg-accent-dark border bg-transparent hover:text-white active:text-white`,
    tertiary: tw`text-accent bg-transparent`,
    quaternary: tw`bg-accent-light text-accent hover:bg-accent-hover active:accent-accent-dark disabled:bg-accent-light disabled:text-accent disabled:text-opacity-60 hover:text-white`,
    green: tw`disabled:submit-disabled bg-submit hover:bg-submit-hover active:bg-submit-active text-white`,
    outline: tw`border-accent text-accent hover:bg-accent-hover active:bg-accent-dark border bg-transparent hover:text-white active:text-white`,
  };

  const sizeClasses = {
    sm: tw`body2 px-[16px] py-[12px]`,
    lg: tw`body2 px-[24px] py-[12px]`,
  };

  const disabledClasses = disabled && tw`hover:none active:none opacity-50`;

  if (href) {
    return (
      <a
        data-testid={props['data-testid'] ?? 'button-component'}
        {...rest}
        href={href}
        rel={rel}
        role={role}
        target={target}
        {...(!!id && { id: id })}
        aria-label={ariaLabel}
        className={clsx(
          'transition-colors',
          defaultClasses,
          variantClasses[variant as keyof typeof variantClasses],
          sizeClasses[size],
          disabledClasses,
          className
        )}
        onClick={() => {
          if (onClick) {
            onClick();
          }
        }}
        title={title}
        type={type}
      >
        <div className={clsx('flex flex-row items-center gap-2', contentClass)}>
          {prefix}
          {label}
          {arrow && (
            <Arrow
              className={arrowClassName}
              color={arrowColor}
              height={typeof arrowSize === 'number' ? arrowSize : arrowSize.height}
              side={arrow}
              strokeWidth={arrowStrokeWidth}
              viewBox={viewBox}
              width={typeof arrowSize === 'number' ? arrowSize : arrowSize.width}
            />
          )}
          {suffix}
        </div>
      </a>
    );
  }
  return (
    <button
      data-testid={props['data-testid'] ?? 'button-component'}
      {...rest}
      {...(!!id && { id })}
      aria-label={ariaLabel}
      className={clsx(
        'transition-colors',
        defaultClasses,
        variantClasses[variant as keyof typeof variantClasses],
        sizeClasses[size],
        disabledClasses,
        className
      )}
      disabled={disabled}
      onClick={() => {
        if (onClick) {
          onClick();
        }
      }}
      ref={ref}
      role={role}
      title={title}
      type={type}
    >
      <div className={clsx('pointer-events-none flex flex-row items-center gap-2', contentClass)}>
        {isLoading ? <Loader className="mr-2" height={24} radius={3} width={24} /> : null}
        {!isLoading && prefix ? <>{prefix}</> : null}
        {label}
        {children}
        {arrow && (
          <Arrow
            className={arrowClassName}
            color={arrowColor}
            height={typeof arrowSize === 'number' ? arrowSize : arrowSize.height}
            side={arrow}
            strokeWidth={arrowStrokeWidth}
            viewBox={viewBox}
            width={typeof arrowSize === 'number' ? arrowSize : arrowSize.width}
          />
        )}
        {suffix}
      </div>
    </button>
  );
});

Button.displayName = 'Button';
