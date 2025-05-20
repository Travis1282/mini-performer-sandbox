'use client';

import type { DropdownArrowPosition } from '@/contracts/UiVariants';
import type { MouseEvent } from 'react';
import { useOutsideClick } from '@/hooks/useClickOutside';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useMobileOverflow } from '@/hooks/useMobileOverflow';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export interface DropdownCheckboxProps {
  className?: string;
  'data-testid'?: string;
  dropdownArrowPosition: DropdownArrowPosition;
  dropdownOptions: string[];
  handleSelectedItems: (value: string[]) => void;
  initialDropdownOption?: string[];
  selectedItems: string[];
  title: string;
  titleMultipleSelected: string;
}

export function DropdownCheckbox({
  title,
  titleMultipleSelected,
  initialDropdownOption = [],
  dropdownOptions,
  dropdownArrowPosition,
  selectedItems,
  handleSelectedItems,
  className,
  ...props
}: DropdownCheckboxProps) {
  const ref = useOutsideClick(() => setIsDropdownOpen(false));
  const { isMobile } = useIsMobile();

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownArrowPositionClasses = {
    left: '',
    right: 'self-end',
    center: 'self-center',
  };

  useEffect(() => {
    if (initialDropdownOption.length && selectedItems.length === 0) {
      handleSelectedItems(initialDropdownOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMobileOverflow(isDropdownOpen, isMobile);

  function handleButtonClick(evt: MouseEvent) {
    evt.preventDefault();
    if (!(evt.target instanceof SVGElement && evt.target.dataset.dropdownXButton)) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  }

  function handleOptionClick(option: string, checked: boolean) {
    if (checked) {
      handleSelectedItems([...selectedItems, option]);
    } else {
      handleSelectedItems(selectedItems.filter((item) => item !== option));
    }
  }

  function handleDropdownSpanClick(evt: MouseEvent) {
    evt.stopPropagation();
    if (!(evt.target instanceof HTMLSpanElement) || !evt.target.dataset.dropdownBackground) {
      return;
    }
    setIsDropdownOpen(false);
  }

  function handleClearDropdown(evt: MouseEvent) {
    evt.stopPropagation();
    evt.preventDefault();
    handleSelectedItems([]);
    setIsDropdownOpen(false);
  }

  return (
    <div className={`${className ?? ''} flex-col sm:flex sm:w-fit`} ref={ref}>
      <button
        className={clsx(
          `text-dark shadow-dropdown-button-box-shadow h6-sm lg:h6-lg flex h-[33px] flex-row items-center gap-2 overflow-hidden rounded-3xl bg-white text-center font-medium lg:h-[36px]`,
          selectedItems.length > 0 && 'bg-accent! text-white'
        )}
        data-cy="dropdown-button"
        data-testid={props?.['data-testid']}
        id="dropdownDefaultButton"
        onClick={handleButtonClick}
      >
        {selectedItems.length > 0 && (
          <span className="flex h-full flex-row items-center pl-5 align-middle">
            {selectedItems.length > 1
              ? `${titleMultipleSelected}: ${selectedItems.length}`
              : selectedItems[0]}
            <span
              className="flex h-full items-center self-center pr-5 pl-2"
              data-cy="x-button"
              onClick={handleClearDropdown}
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
          </span>
        )}

        {selectedItems.length === 0 && <span className="px-5">{title}</span>}
      </button>
      {isDropdownOpen && (
        <span
          className={`fixed sm:absolute ${dropdownArrowPositionClasses[dropdownArrowPosition]} lg bottom-0 left-0 z-50 mt-0 flex h-screen w-screen cursor-pointer flex-col-reverse bg-black/25 sm:bottom-auto sm:left-auto sm:mt-10 sm:h-auto sm:w-40 sm:flex-col`}
          data-dropdown-background
          onClick={handleDropdownSpanClick}
        >
          <div
            className="shadow-dropdown-options-box-shadow absolute z-10 w-screen rounded-xs bg-white sm:mt-2.5 sm:w-40"
            id="dropdown"
          >
            <div className="text-dark flex w-full justify-between rounded-xs bg-white px-4 py-6 font-bold sm:hidden">
              <span className="h3-lg">{title}</span>

              <button
                aria-label="Close Button"
                className="mr-1 cursor-pointer"
                onClick={() => setIsDropdownOpen(false)}
                type="button"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <ul className="h6-lg sm:h6-sm lg:h6-lg font-medium">
              {dropdownOptions &&
                dropdownOptions.map((option, optionIdx) => (
                  <li
                    className={clsx(
                      'border-light text-dark hover:border-l-accent hover:bg-dropdown-hover-blue-bg flex justify-between rounded-xs border-t border-l-4 border-l-transparent bg-white px-6 py-4 hover:rounded-l-none lg:py-[7px]',
                      selectedItems.includes(option)
                        ? 'border-accent! bg-accent! rounded-none text-white'
                        : '',
                      optionIdx === 0 &&
                        dropdownOptions.length === 2 &&
                        'border-b-none border-b-light',
                      optionIdx === 0 && '!lg:rounded-t',
                      optionIdx === dropdownOptions.length - 1 && '!lg:rounded-b border-b-0!'
                    )}
                    data-cy={option}
                    key={option}
                    onClick={() => handleOptionClick(option, !selectedItems.includes(option))}
                  >
                    {option}
                    <input
                      checked={selectedItems.includes(option)}
                      className="text-accent self-center rounded-xs border border-[#B3B8BE]"
                      onChange={() => {
                        handleOptionClick(option, !selectedItems.includes(option));
                      }}
                      type="checkbox"
                      value={option}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </span>
      )}
    </div>
  );
}
