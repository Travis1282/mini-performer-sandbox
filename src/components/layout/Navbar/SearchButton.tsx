'use client';

// import ResultsBox from '@/components/AutocompleteSearch/ResultBox';
// import CustomDropdown from '@/components/Shared/CustomDropdown';
// import OffCanvasSearch from '@/components/Shared/OffCanvasSearch';
// import { useDebounce } from '@/hooks/useDebounce';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useMobileOverflow } from '@/hooks/useMobileOverflow';
// import useSaveRecentSearch from '@/hooks/useSaveRecentSearch';
// import { useToast } from '@/hooks/useToast';
// import { GtmSearch, GtmSearchInput } from '@/libs/gtm/gtm';
import { resolveImagePath } from '@/utils/helpers';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router';

export interface SearchButtonProps {
  className?: string;
  defaultDark?: boolean;
  handleDropdownOpen: () => void;
  marginRightInput?: number;
  onClick?: () => void;
  onClose: () => void;
}

export function SearchButton({
  className = '',
  handleDropdownOpen,
  onClose,
  marginRightInput,
  defaultDark,
}: SearchButtonProps) {
  // const router = useNavigate();
  // const pathname = useLocation().pathname;
  const [isOpen, setIsOpen] = useState(false);
  // const [showBgAndBorder, setShowBgAndBorder] = useState(true);
  // const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  // const debouncedValue = useDebounce<string>(search, 500);

  // function handleChangeSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
  //   setSearch(e.target.value);
  // }

  // useEffect(() => {
  //   if (debouncedValue.length >= 2) {
  //     GtmSearchInput(debouncedValue, 'header');
  //   }
  // }, [debouncedValue]);

  const { isMobile } = useIsMobile();
  // const { recentSearch } = useSaveRecentSearch();
  useMobileOverflow(isOpen, isMobile);

  // const { toast } = useToast();

  // function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
  //   if (event.key === 'Enter') {
  //     GtmSearch(search);
  //     if (search.length < 2) {
  //       toast({
  //         message: 'Search must be at least 2 characters',
  //         type: 'error',
  //       });
  //       return;
  //     }
  //     const levelsToRoot = pathname.split('/').length - 2;
  //     const root = '../'.repeat(levelsToRoot);
  //     const url = `${root}search?q=${search}`;

  //     router(url);
  //     handleToggleDropdown();
  //   }
  // }
  function handleToggleDropdown() {
    setIsOpen((prevState) => !prevState);
  }

  useEffect(() => {
    if (isOpen) {
      handleDropdownOpen();
    } else {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    if (inputRef.current && window.scrollY > 0) {
      // setShowBgAndBorder(true);
    }
    const onScroll = () => {
      if (!inputRef.current) {
        return;
      }
      // const window = e.currentTarget as Window;
      // setShowBgAndBorder(window.scrollY > 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const searchIcon = (
    <>
      <img
        alt="search"
        className={clsx('h4-lg z-10 flex items-center', defaultDark ? 'invert' : '')}
        height={18}
        src={resolveImagePath('/img/icons/fi-br-search.svg')}
        width={18}
      />
    </>
  );

  return (
    <div className={clsx('flex', isOpen && !isMobile && 'max-w-[400px]')}>
      {/* {isMobile ? (
        <>
          <button className="m-2">{searchIcon}</button>
          <OffCanvasSearch
            handleClose={handleToggleDropdown}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </>
      ) : */}

      {!isOpen ? (
        <button
          aria-label="Search"
          className={className}
          data-cy="searchNavBar"
          id="searchNavBar"
          onClick={handleToggleDropdown}
          title="Search"
          type="button"
        >
          {searchIcon}
        </button>
      ) : (
        <div
          className={clsx(
            `lg:px-auto absolute top-0 flex h-full w-full transition-all duration-300`,
            isOpen && !isMobile ? 'max-w-[400px]' : 'max-w-0'
          )}
          style={{
            right: marginRightInput,
          }}
        >
          {/* <CustomDropdown className="w-full" disableAutoClose={isMobile} setOpen={setIsOpen}>
            <CustomDropdown.Activator>
              <div className="relative p-1">
                <input
                  autoFocus={!isMobile}
                  className={clsx(
                    'text-dark placeholder-dark/40 h6-lg w-full rounded-xs py-[13px] pr-3 pl-12 font-normal lg:font-medium',
                    showBgAndBorder ? 'border-light border bg-[#FAFAFB]' : ''
                  )}
                  data-cy="searchInput"
                  id="searchNavBarInput"
                  name="search_term_string"
                  onChange={handleChangeSearchInput}
                  onClick={() => setIsOpen(true)}
                  onFocus={() => setIsOpen(true)}
                  onKeyDown={handleKeyPress}
                  placeholder="Search by team, artist, event or venue"
                  ref={inputRef}
                  required
                  // this is needed because tailwind border style doesn't work on iphone
                  type="text"
                  value={search}
                />
                <span className="pointer-events-none relative -top-[41px] flex h-0 w-full justify-start px-2">
                  <Search className="text-go-blue-500 h-[2.2rem] w-[2.2rem] p-2" />
                </span>
              </div>
            </CustomDropdown.Activator>
            <CustomDropdown.Content
              className="bg-light top-[60px] mx-1 max-h-[calc(100dvh-200px)]! w-[calc(100%-8px)] overflow-auto rounded-xs"
              open={Boolean(isOpen && (search.length >= 2 || recentSearch.length))}
            >
              <>
                {!isMobile && (search.length >= 2 || recentSearch.length) && (
                  <ResultsBox
                    handleClose={handleToggleDropdown}
                    isAtNavbar
                    search={debouncedValue}
                  />
                )}
              </>
            </CustomDropdown.Content>
          </CustomDropdown> */}
        </div>
      )}
    </div>
  );
}
