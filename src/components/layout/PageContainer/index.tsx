import React from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Container for page content that adds padding to the top of the page to account for
 * the fixed navbar.
 */
export const PageContainer: React.FC<Props> = ({ className = '', children }) => {
  return <div className={`pt-[60px] lg:pt-[94px] ${className}`}>{children}</div>;
};
