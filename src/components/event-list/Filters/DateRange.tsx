/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import type { DateAfter, DateBefore, DateRange } from 'react-day-picker';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { DateRangePicker } from '@/components/event-list/Filters/DateRangePicker';
import { useFilterByQueryParams } from '@/hooks/useFilterByQueryParams';

interface DateRangeProps {
  disabledBeforeAfter?: DateAfter | DateBefore;
}

export function DateRange({ disabledBeforeAfter }: DateRangeProps) {
  const { dateRange, setDateRange } = useFilterByQueryParams();

  useEffect(() => {
    if (dateRange?.to && dayjs(dateRange.to).isBefore(dayjs())) {
      setDateRange(undefined);
    }
  }, []);

  return (
    <DateRangePicker
      className="flex shrink-0"
      disabled={disabledBeforeAfter}
      handleSelectDateRange={setDateRange}
      selectedDateRange={dateRange}
    />
  );
}
