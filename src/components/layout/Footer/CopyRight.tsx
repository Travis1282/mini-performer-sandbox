import dayjs from 'dayjs';
import React from 'react';

export const Copyright: React.FC = () => {
  const year = dayjs().year();

  return (
    <p className="body2 font-normal opacity-50" data-testid="copyright">
      &copy; {year} Go Marketplace LLC d/b/a GoTickets.
      <span className="hidden md:inline"> All rights reserved.</span>
    </p>
  );
};
