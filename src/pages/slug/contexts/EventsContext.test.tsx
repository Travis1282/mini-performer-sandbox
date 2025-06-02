import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import type { components } from '@/contracts/generated/maverick-schema';
import type { Region } from '@/contracts/entities/region';
import { EventsProvider, useEvents } from './EventsContext';

// Mock dependencies
vi.mock('@/services/categories/use-categories-context');
vi.mock('@/services/categories/use-regions-context');
vi.mock('@/utils/eventUtils');

// Import mocked functions
import { useRegionsContext } from '@/services/categories/use-regions-context';
import {
  filterEventFn,
  getFilters,
  prioritizeUSandCanada,
  sortEventList,
} from '@/utils/eventUtils';

const mockRegions: Region[] = [
  { id: 1, name: 'New York', latitude: 40.7128, longitude: -74.006, venueRadius: 50 },
  { id: 2, name: 'California', latitude: 36.7783, longitude: -119.4179, venueRadius: 100 },
];

const mockEvents: components['schemas']['Event'][] = [
  {
    id: 1,
    name: 'Rock Concert',
    venueId: 100,
    venueConfigurationId: 1,
    eventTimeLocal: '2024-07-15T20:30:00',
    timeTbd: false,
    dateTbd: false,
    venue: {
      id: 100,
      name: 'Madison Square Garden',
      city: 'New York',
      state: 'NY',
      country: 'US',
    },
  } as unknown as components['schemas']['Event'],
  {
    id: 2,
    name: 'Comedy Show',
    venueId: 101,
    venueConfigurationId: 2,
    eventTimeLocal: '2024-07-16T19:00:00',
    timeTbd: false,
    dateTbd: false,
    venue: {
      id: 101,
      name: 'Comedy Club',
      city: 'Los Angeles',
      state: 'CA',
      country: 'US',
    },
  } as unknown as components['schemas']['Event'],
];

const mockFilters = {
  disabledDate: { before: new Date('2024-01-01'), after: new Date('2024-12-31') },
  locations: [],
  eventsToFilter: [],
};

// Test component that uses the context
function TestComponent() {
  const { eventsData } = useEvents();
  return (
    <div>
      <div data-testid="events-count">{eventsData.length}</div>
      {eventsData.map((event) => (
        <div data-testid={`event-${event.id}`} key={event.id}>
          {event.name}
        </div>
      ))}
    </div>
  );
}

// Helper function to render with router
function renderWithRouter(
  initialEntries: string[] = ['/'],
  initialData?: components['schemas']['Event'][] | undefined
) {
  // If no second argument is provided, use mockEvents. If undefined is explicitly passed, use undefined.
  const dataToUse = arguments.length < 2 ? mockEvents : initialData;

  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: (
          <EventsProvider initialData={dataToUse}>
            <TestComponent />
          </EventsProvider>
        ),
      },
    ],
    { initialEntries }
  );

  return render(<RouterProvider router={router} />);
}

describe('EventsContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRegionsContext).mockReturnValue(mockRegions);
    vi.mocked(getFilters).mockReturnValue(mockFilters);
    vi.mocked(filterEventFn).mockReturnValue(true);
    vi.mocked(sortEventList).mockImplementation((events) => events || []);
    vi.mocked(prioritizeUSandCanada).mockImplementation((events) => events || []);
  });

  describe('EventsProvider', () => {
    it('provides events data to child components', () => {
      renderWithRouter();

      expect(screen.getByTestId('events-count')).toHaveTextContent('2');
      expect(screen.getByTestId('event-1')).toHaveTextContent('Rock Concert');
      expect(screen.getByTestId('event-2')).toHaveTextContent('Comedy Show');
    });

    it('handles undefined initial data', () => {
      renderWithRouter(['/'], undefined);
      expect(screen.getByTestId('events-count')).toHaveTextContent('0');
    });

    it('handles empty array initial data', () => {
      renderWithRouter(['/'], []);
      expect(screen.getByTestId('events-count')).toHaveTextContent('0');
    });

    it('handles non-array initial data', () => {
      renderWithRouter(['/'], 'invalid' as unknown as components['schemas']['Event'][]);
      expect(screen.getByTestId('events-count')).toHaveTextContent('0');
    });
  });

  describe('URL parameter parsing', () => {
    it('parses category filters from URL', () => {
      renderWithRouter(['/?categories=category:1,category:2']);

      expect(vi.mocked(filterEventFn)).toHaveBeenCalledWith(
        expect.any(Object),
        undefined,
        mockFilters,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        []
      );
    });

    it('parses event types from URL', () => {
      renderWithRouter(['/?types=CONCERTS,COMEDY']);

      expect(vi.mocked(filterEventFn)).toHaveBeenCalledWith(
        expect.any(Object),
        undefined,
        mockFilters,
        undefined,
        ['CONCERTS', 'COMEDY'],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        []
      );
    });

    it('filters out invalid event types', () => {
      renderWithRouter(['/?types=CONCERTS,INVALID,COMEDY']);

      expect(vi.mocked(filterEventFn)).toHaveBeenCalledWith(
        expect.any(Object),
        undefined,
        mockFilters,
        undefined,
        ['CONCERTS', 'COMEDY'],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        []
      );
    });

    it('parses date range from URL', () => {
      const fromDate = '2024-07-01';
      const toDate = '2024-07-31';
      renderWithRouter([`/?from=${encodeURIComponent(fromDate)}&to=${encodeURIComponent(toDate)}`]);

      expect(vi.mocked(filterEventFn)).toHaveBeenCalledWith(
        expect.any(Object),
        undefined,
        mockFilters,
        undefined,
        undefined,
        undefined,
        undefined,
        {
          from: new Date(fromDate),
          to: new Date(toDate),
        },
        undefined,
        undefined,
        []
      );
    });

    it('ignores invalid dates', () => {
      renderWithRouter(['/?from=invalid-date&to=also-invalid']);

      expect(vi.mocked(filterEventFn)).toHaveBeenCalledWith(
        expect.any(Object),
        undefined,
        mockFilters,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        []
      );
    });

    it('parses region filter from URL', () => {
      renderWithRouter(['/?location=1']);

      expect(vi.mocked(filterEventFn)).toHaveBeenCalledWith(
        expect.any(Object),
        undefined,
        mockFilters,
        undefined,
        undefined,
        undefined,
        mockRegions[0],
        undefined,
        undefined,
        undefined,
        []
      );
    });

    it('parses time filter from URL', () => {
      renderWithRouter(['/?time=' + encodeURIComponent('Day/Night')]);

      expect(vi.mocked(filterEventFn)).toHaveBeenCalledWith(
        expect.any(Object),
        undefined,
        mockFilters,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        'Day/Night',
        undefined,
        []
      );
    });

    it('handles invalid time values', () => {
      renderWithRouter(['/?time=Invalid']);

      expect(vi.mocked(filterEventFn)).toHaveBeenCalledWith(
        expect.any(Object),
        undefined,
        mockFilters,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        []
      );
    });
  });

  describe('Complex URL parameter combinations', () => {
    it('handles multiple filter types together', () => {
      const searchParams = new URLSearchParams({
        categories: 'category:1',
        types: 'CONCERTS,COMEDY',
        from: '2024-07-01',
        to: '2024-07-31',
        location: '1',
        time: 'Day',
      });

      renderWithRouter([`/?${searchParams.toString()}`]);

      expect(vi.mocked(filterEventFn)).toHaveBeenCalledWith(
        expect.any(Object),
        undefined,
        mockFilters,
        undefined,
        ['CONCERTS', 'COMEDY'],
        undefined,
        mockRegions[0],
        {
          from: new Date('2024-07-01'),
          to: new Date('2024-07-31'),
        },
        'Day',
        undefined,
        []
      );
    });

    it('handles malformed category IDs', () => {
      renderWithRouter(['/?categories=category:abc,category:,invalid']);
      expect(vi.mocked(filterEventFn)).toHaveBeenCalled();
    });
  });

  describe('Event filtering and sorting', () => {
    it('applies filters to events', () => {
      renderWithRouter();

      expect(vi.mocked(filterEventFn)).toHaveBeenCalledTimes(mockEvents.length);
      expect(vi.mocked(getFilters)).toHaveBeenCalledWith(mockEvents);
    });

    it('sorts filtered events', () => {
      renderWithRouter();

      expect(vi.mocked(sortEventList)).toHaveBeenCalledWith(mockEvents);
    });

    it('prioritizes US and Canada events', () => {
      renderWithRouter();

      expect(vi.mocked(prioritizeUSandCanada)).toHaveBeenCalledWith(mockEvents);
    });

    it('filters out events when filterEventFn returns false', () => {
      vi.mocked(filterEventFn).mockImplementation((event) => {
        return event && event.id === 1;
      });

      renderWithRouter();

      expect(screen.getByTestId('events-count')).toHaveTextContent('1');
      expect(screen.getByTestId('event-1')).toBeInTheDocument();
      expect(screen.queryByTestId('event-2')).not.toBeInTheDocument();
    });
  });

  describe('useEvents hook', () => {
    it('throws error when used outside EventsProvider', () => {
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useEvents must be used within an EventsProvider');

      console.error = originalError;
    });
  });

  describe('URL parameter edge cases', () => {
    it('handles empty search params', () => {
      renderWithRouter(['/']);

      expect(vi.mocked(filterEventFn)).toHaveBeenCalledWith(
        expect.any(Object),
        undefined,
        mockFilters,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        []
      );
    });

    it('handles URL-encoded parameters correctly', () => {
      const fromDate = '2024-07-01T10:00:00';
      const toDate = '2024-07-31T23:59:59';

      renderWithRouter([
        `/?from=${encodeURIComponent(fromDate)}&to=${encodeURIComponent(toDate)}&time=${encodeURIComponent('Day/Night')}`,
      ]);

      expect(vi.mocked(filterEventFn)).toHaveBeenCalledWith(
        expect.any(Object),
        undefined,
        mockFilters,
        undefined,
        undefined,
        undefined,
        undefined,
        {
          from: new Date(fromDate),
          to: new Date(toDate),
        },
        'Day/Night',
        undefined,
        []
      );
    });

    it('handles missing from or to date gracefully', () => {
      renderWithRouter(['/?from=2024-07-01']);

      expect(vi.mocked(filterEventFn)).toHaveBeenCalledWith(
        expect.any(Object),
        undefined,
        mockFilters,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        []
      );
    });

    it('handles case sensitivity in event types', () => {
      renderWithRouter(['/?types=concerts,Comedy,SPORTS']);

      expect(vi.mocked(filterEventFn)).toHaveBeenCalledWith(
        expect.any(Object),
        undefined,
        mockFilters,
        undefined,
        ['CONCERTS', 'COMEDY', 'SPORTS'],
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        []
      );
    });
  });
});
