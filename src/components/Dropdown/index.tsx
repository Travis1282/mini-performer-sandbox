import type { DropdownArrowPosition } from '@/contracts/UiVariants';
import type { MouseEvent } from 'react';
import { useOutsideClick } from '@/hooks/useClickOutside';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useMobileOverflow } from '@/hooks/useMobileOverflow';
import { resolveImagePath } from '@/utils/helpers';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export interface DropdownProps {
  className?: string;
  'data-testid'?: string;
  dropdownArrowPosition: DropdownArrowPosition;
  dropdownOptions: string[];
  handleSelectValue: (value: string | undefined) => void;
  id?: string;
  idReset?: string;
  initialDropdownOption?: string;
  selectedValue: string | undefined;
  showSaveButton?: boolean;
  title: string;
}

export function Dropdown({
  title,
  initialDropdownOption = undefined,
  dropdownOptions,
  dropdownArrowPosition,
  selectedValue,
  handleSelectValue,
  showSaveButton = false,
  id,
  idReset,
  className,
  ...props
}: DropdownProps) {
  const [isHovering, setIsHovering] = useState(false);

  const ref = useOutsideClick(() => {
    if (!isHovering) {
      setIsDropdownOpen(false);
    }
  });
  const { isMobile } = useIsMobile();

  useEffect(() => {
    if (initialDropdownOption && !selectedValue) {
      handleSelectValue(initialDropdownOption);
    }
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const dropdownArrowPositionClasses = {
    left: '',
    right: 'self-end',
    center: 'self-center',
  };

  useMobileOverflow(isDropdownOpen, isMobile);

  function handleButtonClick(evt: MouseEvent) {
    evt.preventDefault();
    if (!(evt.target instanceof SVGElement && evt.target.dataset.dropdownXButton)) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  }

  function handleOptionClick(evt: MouseEvent, option: string) {
    evt.preventDefault();
    handleSelectValue(option);
    setIsDropdownOpen(false);
  }

  function handleDropdownSpanClick(evt: MouseEvent) {
    evt.stopPropagation();
    if (!(evt.target instanceof HTMLSpanElement) || !evt.target.dataset.dropdownBackground) {
      return;
    }
    setIsDropdownOpen(false);
  }

  function handleDropdownSave(evt: MouseEvent) {
    evt.preventDefault();
    setIsDropdownOpen(false);
  }

  function handleClearDropdown(evt: MouseEvent) {
    evt.stopPropagation();
    evt.preventDefault();
    handleSelectValue(undefined);
    setIsDropdownOpen(false);
  }

  return (
    <div
      className={`${className ?? ''} flex flex-col`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={ref}
    >
      <button
        className={clsx(
          `text-dark shadow-dropdown-button-box-shadow h6-sm lg:h6-lg flex h-[33px] flex-row items-center gap-2 overflow-hidden rounded-3xl bg-white text-center font-medium lg:h-[36px]`,
          selectedValue && 'bg-accent! text-white'
        )}
        data-cy="dropdown-button"
        data-testid={props?.['data-testid']}
        id={id || 'dropdownButton'}
        onClick={handleButtonClick}
      >
        {selectedValue && (
          <span className="flex h-full flex-row items-center pl-5 align-middle">
            {selectedValue}
            <span
              className="flex h-full items-center self-center pr-5 pl-2"
              data-cy="x-button"
              id={idReset || ''}
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

        {!selectedValue && <span className="px-5">{title}</span>}
      </button>
      {isDropdownOpen && (
        <span
          className={`fixed sm:absolute ${dropdownArrowPositionClasses[dropdownArrowPosition]} bottom-0 left-0 z-50 mt-0 flex h-screen w-screen cursor-pointer flex-col-reverse bg-black/25 sm:bottom-auto sm:left-auto sm:mt-12 sm:h-auto sm:w-40 sm:flex-col`}
          data-dropdown-background
          onClick={handleDropdownSpanClick}
        >
          <svg
            className={`absolute ${dropdownArrowPositionClasses[dropdownArrowPosition]} z-20 mx-4 mt-1 hidden sm:block`}
            fill="white"
            height="8"
            viewBox="0 0 10 8"
            width="10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M6.25 0.875669C5.56 -0.290812 4.44 -0.290812 3.75 0.875669L0 7.21289H10L6.25 0.875669Z"
              fill="white"
              fillRule="evenodd"
            />
          </svg>
          <div
            className="shadow-dropdown-options-box-shadow absolute z-10 w-screen rounded-xs bg-white sm:mt-2.5 sm:w-40"
            id="dropdown"
          >
            <div className="text-dark flex w-full justify-between rounded-xs bg-white px-4 py-6 font-bold sm:hidden">
              <span className="h3-lg">{title}</span>
              <img
                alt="Close Button"
                className="mr-1 cursor-pointer"
                height={25}
                onClick={() => setIsDropdownOpen(false)}
                src={resolveImagePath('/img/close-bold-icon.svg')}
                width={25}
              />
            </div>
            <ul className="h6-lg sm:h6-sm lg:h6-lg font-medium">
              {dropdownOptions &&
                dropdownOptions.map((option, optionIdx) => (
                  <li
                    className={`text-dark hover:border-l-accent hover:bg-dropdown-hover-blue-bg flex justify-between rounded border-l-4 border-l-transparent bg-white px-4 py-4 hover:rounded-l-none ${
                      option === selectedValue ? 'font-bold' : ''
                    } ${
                      optionIdx === 0 && dropdownOptions.length === 2
                        ? 'border-b-light border-b'
                        : optionIdx === dropdownOptions.length - 1 && dropdownOptions.length === 2
                          ? 'border-t-light border-t'
                          : 'border-light border'
                    }`}
                    data-cy={option}
                    key={option}
                    onClick={(evt) => handleOptionClick(evt, option)}
                  >
                    {option}
                    <div
                      className={clsx(
                        'mr-2 inline-block rounded-full sm:hidden',
                        option === selectedValue
                          ? 'border-accent h-4 w-4 border-[5px]'
                          : 'h-4 w-4 border border-[#B3B8BE]'
                      )}
                    />
                  </li>
                ))}
            </ul>
            {showSaveButton && (
              <button
                className="bg-btn-bg-color hover:bg-accent block w-full px-4 py-2 text-center text-white hover:rounded-l-none hover:px-3 sm:hidden sm:rounded-xs"
                onClick={handleDropdownSave}
              >
                Save
              </button>
            )}
          </div>
        </span>
      )}
    </div>
  );
}
