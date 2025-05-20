/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import type { DateRange, Matcher } from 'react-day-picker';
import { DateRangePicker } from '@/components/event-list/Filters/DateRangePicker';
import { useFilterByQueryParams } from '@/hooks/useFilterByQueryParams';
import dayjs from 'dayjs';
import { useEffect } from 'react';

interface DateRangeProps {
  disabledDate?: Matcher | Matcher[] | undefined;
}

export function DateRange({ disabledDate }: DateRangeProps) {
  const { dateRange, setDateRange } = useFilterByQueryParams();

  useEffect(() => {
    if (dateRange?.to && dayjs(dateRange.to).isBefore(dayjs())) {
      setDateRange(undefined);
    }
  }, []);

  return (
    <DateRangePicker
      className="flex shrink-0"
      disabled={disabledDate}
      handleSelectDateRange={setDateRange}
      selectedDateRange={dateRange}
    />
  );
}
