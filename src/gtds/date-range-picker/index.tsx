'use client'

import type { MouseEvent } from 'react'
import type { DateRange, Matcher } from 'react-day-picker'
import { formatDate } from '@/utils/helpers'
import clsx from 'clsx'
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  isFriday,
  isSaturday,
  isSunday,
  nextFriday,
  nextSunday,
  subMonths,
} from 'date-fns'
import { useMemo, useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { useScrollContainer } from 'react-indiana-drag-scroll'
import { Offcanvas } from '../Offcanvas'

const options = {
  'any-dates': 'Any Dates',
  'this-weekend': 'This Weekend',
  'this-week': 'This Week',
  'this-month': 'This Month',
  'next-7-days': 'Next 7 Days',
  'next-30-days': 'Next 30 Days',
} as const

export interface DateRangePickerProps {
  className?: string
  disabled?: Matcher | Matcher[] | undefined
  handleSelectDateRange: (date: DateRange | undefined) => void
  label?: string
  selectedDateRange?: DateRange | undefined
}

export function DateRangePicker({
  label = 'Date',
  selectedDateRange,
  handleSelectDateRange,
  disabled,
  className,
}: DateRangePickerProps) {
  const [internalDateRange, setInternalDateRange] = useState<
    DateRange | undefined
  >(selectedDateRange)
  const [isOpen, setIsOpen] = useState(false)
  const { isMobile } = useIsMobile()
  const [optionSelected, setOptionSelected] = useState<
    keyof typeof options | undefined
  >('any-dates')
  const [defaultMonth, setDefaultMonth] = useState(new Date())
  const [isHovering, setIsHovering] = useState(false)

  const scrollContainer = useScrollContainer()
  const dropdownWrapperRef = useOutsideClick(() => {
    if (!isHovering) {
      setIsOpen(false)
    }
  })

  useMobileOverflow(isOpen, isMobile)

  function handlePreOptionClick(type: keyof typeof options) {
    setOptionSelected(type)
    setDefaultMonth(new Date())
    switch (type) {
      case 'this-weekend':
        if (isFriday(new Date()) || isSaturday(new Date())) {
          handleSelect({
            from: new Date(),
            to: nextSunday(new Date()),
          })
        } else {
          handleSelect({
            from: nextFriday(new Date()),
            to: addDays(nextFriday(new Date()), 2),
          })
        }
        break
      case 'this-week':
        handleSelect({
          from: new Date(),
          to: endOfWeek(new Date()),
        })
        break
      case 'this-month':
        handleSelect({
          from: new Date(),
          to: endOfMonth(new Date()),
        })
        break
      case 'next-7-days':
        handleSelect({
          from: new Date(),
          to: addDays(new Date(), 7),
        })
        break
      case 'next-30-days':
        handleSelect({
          from: new Date(),
          to: addDays(new Date(), 30),
        })
        break
      case 'any-dates':
        handleSelect(undefined)
        break
      default:
        break
    }
  }

  function handleSelect(date: DateRange | undefined) {
    const { from, to } = date || {}
    if (from && !to && date) {
      date.to = new Date(from.toISOString())
    }

    setInternalDateRange(date)
  }

  const selectedRangeText = useMemo(() => {
    const isSameDay = dayjs(selectedDateRange?.from).isSame(
      selectedDateRange?.to,
      'day'
    )

    if (isSameDay) {
      return formatDate(selectedDateRange?.from, {
        month: 'short',
        day: 'numeric',
      })
    }

    return `${formatDate(selectedDateRange?.from, {
      month: 'short',
      day: 'numeric',
    })} -  ${formatDate(selectedDateRange?.to, {
      month: 'short',
      day: 'numeric',
    })}`
  }, [selectedDateRange?.from, selectedDateRange?.to])

  function handleResetClick() {
    setInternalDateRange(undefined)
    setOptionSelected('any-dates')
  }

  function handleApplyChanges() {
    if (internalDateRange === undefined) {
      handleSelectDateRange(internalDateRange)
    }
    if (internalDateRange?.from && internalDateRange?.to) {
      internalDateRange.to.setHours(23)
      internalDateRange.to.setMinutes(59)
      internalDateRange.to.setSeconds(59)
      handleSelectDateRange(internalDateRange)
    }
    setIsOpen(false)
  }

  function handleOpenDatePicker(evt: MouseEvent) {
    evt.preventDefault()
    if (
      !(evt.target instanceof SVGElement && evt.target.dataset.dropdownXButton)
    ) {
      setIsOpen(!isOpen)
    }
  }

  function handleClearDatePicker(evt: MouseEvent) {
    evt.stopPropagation()
    evt.preventDefault()
    setOptionSelected('any-dates')
    setInternalDateRange(undefined)
    handleSelectDateRange(undefined)
    setIsOpen(false)
  }

  function DayPickerRender() {
    return (
      <div
        className="lg:shadow-dropdown-options-box-shadow relative bg-white"
        id="datePickerDropdown"
      >
        <div className="z-50 flex h-full flex-col lg:px-2 lg:py-6">
          <div className="px-6">
            <div
              className="no-scrollbar overflow-x-auto whitespace-nowrap rounded py-[6px] text-sm font-medium lg:bg-white"
              ref={scrollContainer.ref}
            >
              {Object.keys(options).map((option, index) => (
                <button
                  className={clsx(
                    'text-large rounded-full px-3 py-1.5 font-medium lg:w-auto lg:px-2.5 lg:py-2 lg:text-sm',
                    optionSelected === option
                      ? 'bg-accent lg:bg-accent lg:text-accent !text-white'
                      : 'text-dark opacity-60',
                    index === 0 && 'pl-[9px]',
                    'disabled:cursor-default disabled:opacity-40'
                  )}
                  disabled={option === 'this-weekend' && isSunday(new Date())}
                  key={option}
                  onClick={() =>
                    handlePreOptionClick(option as keyof typeof options)
                  }
                >
                  {options[option as keyof typeof options]}
                </button>
              ))}
            </div>
          </div>
          {/* TODO: Refactor to adapt to tailwind */}
          <style>
            {`.rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                background-color: #0E519D;
                border-radius: 4px;
                color: white;
          }`}
          </style>
          <DayPicker
            className="flex-1 px-2 pb-16 lg:!mb-0 lg:!pb-0"
            classNames={{
              caption_end: isMobile
                ? '!mx-0 rdp-month rdp-caption_end'
                : 'rdp-caption_end',
              caption_start: isMobile
                ? '!mx-0 rdp-month rdp-caption_start'
                : 'rdp-caption_start',
              day: isMobile
                ? 'w-full h-full !text-sm'
                : 'rdp-button_reset rdp-button rdp-day !text-sm',
              head_cell: 'h6-sm font-bold pl-[5px] pt-[7px] pb-1.5 pr-1',
              month: 'rdp-month h-full',
              months: isMobile ? 'flex flex-col h-full gap-10' : 'rdp-months',
              nav_button_next: 'absolute -top-[80px]',
              row: isMobile ? '' : 'rdp-row',
              table: isMobile ? 'w-full ' : '',
            }}
            components={{
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              CaptionLabel: ({ displayMonth }: { displayMonth: any }) => {
                return (
                  <div className="w-full text-center">
                    <p className="text-dark text-sm font-semibold">
                      {displayMonth.toLocaleString('default', {
                        month: 'long',
                      })}{' '}
                      {displayMonth.toLocaleString('default', {
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                )
              },

              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              Caption: ({ displayIndex, displayMonth }: any) => {
                return (
                  <div className="mb-[9px] flex items-center justify-between">
                    <button
                      className={clsx(
                        'text-dark p-2 text-sm',
                        displayIndex === 1 && 'invisible',
                        displayIndex === 0 && 'visible'
                      )}
                      onClick={() => {
                        setDefaultMonth(subMonths(defaultMonth, 1))
                      }}
                    >
                      <ChevronLeft />
                    </button>
                    <p className="text-dark text-sm font-semibold">
                      {formatDate(displayMonth, { month: 'long' })}{' '}
                      {formatDate(displayMonth, { year: 'numeric' })}
                    </p>
                    <button
                      className={clsx(
                        'text-dark p-2 text-sm',
                        displayIndex === 0
                          ? 'visible lg:invisible'
                          : 'invisible',
                        displayIndex === 1 ? 'invisible lg:visible' : 'visible'
                      )}
                      onClick={() => {
                        setDefaultMonth(addMonths(defaultMonth, 1))
                      }}
                    >
                      <ChevronRight />
                    </button>
                  </div>
                )
              },
            }}
            disabled={disabled}
            id="test"
            mode="range"
            modifiersClassNames={{
              range_middle:
                '!text-dark !bg-light !rounded !border-[2px] !border-white text-sm',
              range_end:
                '!text-white !bg-accent !rounded !border-[2px] !border-white text-sm',
              range_start:
                '!text-white !bg-accent !rounded !border-[2px] !border-white text-sm',
            }}
            month={defaultMonth}
            numberOfMonths={2}
            onDayClick={() => {
              setOptionSelected(undefined)
            }}
            onSelect={(e) => handleSelect(e)}
            selected={internalDateRange}
          />
          <div className="text-large sticky bottom-0 mt-4 flex w-full lg:relative lg:mx-4 lg:w-auto lg:justify-end lg:gap-[45px] lg:px-4">
            <button
              className="lg:text-accent w-1/2 bg-[#3899F8] text-white lg:w-auto lg:rounded lg:bg-transparent"
              onClick={handleResetClick}
            >
              Reset
            </button>
            <button
              className={clsx(
                'lg:bg-accent w-1/2 bg-[#196DD2] px-6 py-3 text-white transition-all hover:bg-opacity-75 lg:w-auto lg:rounded',
                internalDateRange === undefined ||
                  (internalDateRange?.from && internalDateRange?.to)
                  ? ''
                  : 'disabled'
              )}
              disabled={
                internalDateRange !== undefined &&
                (!internalDateRange?.from || !internalDateRange?.to)
              }
              id="applyChangesButton"
              onClick={handleApplyChanges}
            >
              Apply changes
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${className ?? ''}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={dropdownWrapperRef}
    >
      <ToolTip open={isOpen}>
        <ToolTip.Activator>
          <button
            className={clsx(
              'text-dark shadow-dropdown-button-box-shadow h6-sm lg:h6-lg h-[33px] overflow-hidden rounded-3xl bg-white font-medium lg:h-[36px]',
              selectedDateRange && '!bg-accent text-white'
            )}
            id="dateFilterButton"
            onClick={handleOpenDatePicker}
          >
            {selectedDateRange ? (
              <div
                className={clsx(
                  'flex h-full flex-row items-center pl-5',
                  !selectedDateRange && 'pr-5'
                )}
              >
                {selectedRangeText}
                <span
                  className="flex h-full items-center self-center pl-2 pr-5"
                  id="resetDateButton"
                  onClick={handleClearDatePicker}
                >
                  <svg
                    data-dropdown-x-button
                    fill="none"
                    height="8"
                    viewBox="0 0 8 8"
                    width="8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.80309 6.85232L4.95077 4L7.80309 1.14768C8.06564 0.885136 8.06564 0.459457 7.80309 0.19691C7.54054 -0.0656368 7.11486 -0.0656367 6.85232 0.19691L4 3.04923L1.14768 0.19691C0.885136 -0.0656367 0.459457 -0.0656368 0.19691 0.19691C-0.0656368 0.459457 -0.0656367 0.885136 0.19691 1.14768L3.04923 4L0.19691 6.85232C-0.0656368 7.11486 -0.0656368 7.54054 0.19691 7.80309C0.459457 8.06564 0.885136 8.06564 1.14768 7.80309L4 4.95077L6.85232 7.80309C7.11486 8.06564 7.54054 8.06564 7.80309 7.80309C8.06564 7.54054 8.06564 7.11486 7.80309 6.85232Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </div>
            ) : (
              <span className="h-full px-5">{label}</span>
            )}
          </button>
        </ToolTip.Activator>
        <ToolTip.Content arrowColor="#fff" id="dateDropdown" sideOffset={16}>
          {!isMobile && DayPickerRender()}
        </ToolTip.Content>
      </ToolTip>
      {isMobile ? (
        <Offcanvas
          activatorClassName={'max-h-[100px]'}
          label="Date"
          onClick={() => setIsOpen(false)}
          open={isOpen}
        >
          {DayPickerRender()}
        </Offcanvas>
      ) : null}
    </div>
  )
}

import type { SVGProps } from 'react'
import { useOutsideClick } from '@/hooks/useClickOutside'
import { useIsMobile } from '@/hooks/useIsMobile'
import { useMobileOverflow } from '@/hooks/useMobileOverflow'
import dayjs from 'dayjs'
import ToolTip from '../Tooltip'
const ChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={11}
    width={7}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.5 10.75a.743.743 0 0 1-.54-.21.723.723 0 0 1 0-1.056L4.923 5.5.96 1.54a.723.723 0 0 1 0-1.056.723.723 0 0 1 1.055 0l4.5 4.5a.723.723 0 0 1 0 1.055l-4.5 4.5a.727.727 0 0 1-.516.211Z"
      fill="#000"
    />
  </svg>
)

const ChevronLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="none"
    height={11}
    width={7}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.5 10.75a.743.743 0 0 1-.54-.21l-4.5-4.5a.723.723 0 0 1 0-1.056l4.5-4.5a.723.723 0 0 1 1.056 0 .723.723 0 0 1 0 1.055L2.055 5.5l3.96 3.984a.723.723 0 0 1 0 1.055.727.727 0 0 1-.515.211Z"
      fill="#2D4047"
    />
  </svg>
)
