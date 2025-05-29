import { useLocationContext } from '@/services/location/useLocationContext';
import clsx from 'clsx';
import { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Outlet } from 'react-router';
import { useLocalStorage } from 'react-use';

export function Layout() {
  const location = useLocationContext();

  const [value, setValue, remove] = useLocalStorage('gt-debug', 'hide');

  useHotkeys('ctrl+g+t', () => setValue(value === 'show' ? 'hide' : 'show'), [value]);

  useEffect(() => {
    return () => {
      remove();
    };
  }, [remove]);

  return (
    <>
      <div
        className={clsx(
          'fixed right-2 bottom-2 flex max-h-96 w-96 flex-col gap-2 overflow-auto rounded-sm border-2 border-gray-300 bg-white p-6 drop-shadow-sm',
          value === 'show' ? 'block' : 'hidden'
        )}
      >
        <button
          className="font-xl absolute top-2 right-2 font-bold"
          onClick={() => setValue('hide')}
        >
          &times;
        </button>
        <h2 className="font-bold">Debugger Panel</h2>
        <pre>{JSON.stringify(location, null, 2)}</pre>
      </div>
      <Outlet />
    </>
  );
}
