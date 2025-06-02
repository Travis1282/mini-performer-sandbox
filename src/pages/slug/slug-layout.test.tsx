import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLoaderData } from 'react-router';
import type { components } from '@/contracts/generated/maverick-schema';
import type { GetPerformerDataResp } from './services /getPerformerData';
import Slug from './slug-layout';

vi.mock('react-router', () => ({
  useLoaderData: vi.fn(),
}));

vi.mock('react-indiana-drag-scroll', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('@/components/errors/not-found', () => ({
  default: () => <div data-testid="not-found">Not Found</div>,
}));

interface RegionProps {
  regions: {
    id: number;
    name: string;
    latitude?: number;
    longitude?: number;
    venueRadius?: number;
  }[];
}

vi.mock('@/components/event-list/Filters', () => ({
  DateRange: ({ disabledBeforeAfter }: { disabledBeforeAfter: { before: Date; after: Date } }) => (
    <div data-testid="date-range">
      Date Range: {disabledBeforeAfter.before.toISOString()} -{' '}
      {disabledBeforeAfter.after.toISOString()}
    </div>
  ),
  EventTime: () => <div data-testid="event-time">Event Time</div>,
  RegionHeading: ({ regions }: RegionProps) => (
    <div data-testid="region-heading">Regions: {regions.length}</div>
  ),
}));

vi.mock('@/components/event-list/search-event-item', () => ({
  SearchEventItem: ({ event }: { event: components['schemas']['Event'] }) => (
    <div data-testid={`event-item-${event.id}`}>Event: {event.name}</div>
  ),
}));

vi.mock('./components/Header', () => ({
  PerformerHeading: ({
    performer,
    hideHeroImage,
    showTabs,
    titleOverride,
  }: {
    performer?: components['schemas']['Performer'];
    hideHeroImage: boolean;
    showTabs: boolean;
    titleOverride?: string;
  }) => (
    <div data-testid="performer-heading">
      <div>Performer: {performer?.name || titleOverride}</div>
      <div>Hide Hero: {hideHeroImage.toString()}</div>
      <div>Show Tabs: {showTabs.toString()}</div>
    </div>
  ),
}));

interface EventsProviderProps {
  children: React.ReactNode;
  initialData: components['schemas']['Event'][] | undefined;
}

// Variable to track the current events data for the useEvents mock
let currentEventsData: components['schemas']['Event'][] = [];

vi.mock('./contexts/EventsContext', () => ({
  EventsProvider: ({ children, initialData }: EventsProviderProps) => {
    // Update the current events data when EventsProvider is rendered
    currentEventsData = initialData || [];
    return (
      <div data-testid="events-provider">
        <div data-testid="events-provider-data">Events: {initialData?.length || 0}</div>
        {children}
      </div>
    );
  },
  useEvents: () => ({
    eventsData: currentEventsData,
  }),
}));

// Mock data
const mockEvents: components['schemas']['Event'][] = [
  {
    id: 1,
    name: 'Madonna Concert',
    eventTimeLocal: '2023-07-15T20:30:00',
    venue: {
      id: 5628,
      name: 'Madison Square Garden',
      city: 'New York',
      state: 'NY',
      country: 'US',
    },
    eventPerformers: [
      {
        id: 87903,
        performerId: 9080,
        master: true,
      },
    ],
  } as components['schemas']['Event'],
  {
    id: 2,
    name: 'Madonna Concert 2',
    eventTimeLocal: '2023-07-16T20:30:00',
    venue: {
      id: 5629,
      name: 'TD Garden',
      city: 'Boston',
      state: 'MA',
      country: 'US',
    },
    eventPerformers: [
      {
        id: 87904,
        performerId: 9080,
        master: true,
      },
    ],
  } as components['schemas']['Event'],
];

const mockPerformer: components['schemas']['Performer'] = {
  id: 9080,
  name: 'Madonna',
  slug: 'madonna',
  heroImagePath: 'https://example.com/madonna.jpg',
  primaryCategoryId: 6,
} as components['schemas']['Performer'];

const mockRegions = [
  { id: 1, name: 'New York', latitude: 40.7128, longitude: -74.006, venueRadius: 50 },
  { id: 2, name: 'Boston', latitude: 42.3601, longitude: -71.0589, venueRadius: 50 },
];

const mockDatesWithEvents = {
  before: new Date('2023-07-15'),
  after: new Date('2023-07-16'),
};

const mockLoaderData: GetPerformerDataResp = {
  data: {
    performer: mockPerformer,
    events: mockEvents,
    title: 'Madonna Events',
  } as components['schemas']['CmsPathResponse'],
  heroImage: 'https://example.com/hero.jpg',
  regionsWithEvents: mockRegions,
  datesWithEvents: mockDatesWithEvents,
  regions: mockRegions,
  slug: 'madonna',
};

const mockLoaderDataWithoutPerformer: GetPerformerDataResp = {
  data: {
    events: mockEvents,
  } as components['schemas']['CmsPathResponse'],
  heroImage: '',
  regionsWithEvents: mockRegions,
  datesWithEvents: mockDatesWithEvents,
  regions: mockRegions,
  slug: 'madonna',
};

const mockUseLoaderData = useLoaderData as ReturnType<typeof vi.fn>;

describe('Slug Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset to default mock events for each test
    currentEventsData = mockEvents;
  });

  it('renders the SlugContent when performer data is available', () => {
    mockUseLoaderData.mockReturnValue(mockLoaderData);

    render(<Slug />);

    expect(screen.getByTestId('events-provider')).toBeInTheDocument();
    expect(screen.getByTestId('performer-heading')).toBeInTheDocument();
    expect(screen.getByTestId('region-heading')).toBeInTheDocument();
    expect(screen.getByTestId('date-range')).toBeInTheDocument();
    expect(screen.getByTestId('event-time')).toBeInTheDocument();
    expect(screen.getByTestId('event-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('event-item-2')).toBeInTheDocument();
  });

  it('renders NotFound when performer id is missing', () => {
    mockUseLoaderData.mockReturnValue(mockLoaderDataWithoutPerformer);

    render(<Slug />);

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('passes correct props to PerformerHeading', () => {
    mockUseLoaderData.mockReturnValue(mockLoaderData);

    render(<Slug />);

    const performerHeading = screen.getByTestId('performer-heading');
    expect(performerHeading).toHaveTextContent('Performer: Madonna');
    expect(performerHeading).toHaveTextContent('Hide Hero: false');
    expect(performerHeading).toHaveTextContent('Show Tabs: false');
  });

  it('hides hero image when heroImage is not provided', () => {
    const dataWithoutHeroImage = {
      ...mockLoaderData,
      heroImage: '',
    };
    mockUseLoaderData.mockReturnValue(dataWithoutHeroImage);

    render(<Slug />);

    const performerHeading = screen.getByTestId('performer-heading');
    expect(performerHeading).toHaveTextContent('Hide Hero: true');
  });

  it('passes correct regions to RegionHeading', () => {
    mockUseLoaderData.mockReturnValue(mockLoaderData);

    render(<Slug />);

    const regionHeading = screen.getByTestId('region-heading');
    expect(regionHeading).toHaveTextContent('Regions: 2');
  });

  it('passes correct date range to DateRange component', () => {
    mockUseLoaderData.mockReturnValue(mockLoaderData);

    render(<Slug />);

    const dateRange = screen.getByTestId('date-range');
    expect(dateRange).toHaveTextContent('2023-07-15');
    expect(dateRange).toHaveTextContent('2023-07-16');
  });

  it('renders all events in the events list', () => {
    mockUseLoaderData.mockReturnValue(mockLoaderData);

    render(<Slug />);

    expect(screen.getByTestId('event-item-1')).toHaveTextContent('Event: Madonna Concert');
    expect(screen.getByTestId('event-item-2')).toHaveTextContent('Event: Madonna Concert 2');
  });

  it('initializes EventsProvider with correct data', () => {
    mockUseLoaderData.mockReturnValue(mockLoaderData);

    render(<Slug />);

    const eventsProviderData = screen.getByTestId('events-provider-data');
    expect(eventsProviderData).toHaveTextContent('Events: 2');
  });

  it('uses title override when provided', () => {
    const dataWithTitleOverride = {
      ...mockLoaderData,
      data: {
        ...mockLoaderData.data,
        title: 'Custom Title',
        performer: undefined,
      },
    };
    mockUseLoaderData.mockReturnValue(dataWithTitleOverride);

    render(<Slug />);

    // This should show NotFound since performer is undefined
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('handles empty events array gracefully', () => {
    const dataWithNoEvents = {
      ...mockLoaderData,
      data: {
        ...mockLoaderData.data,
        events: [],
      },
    };
    mockUseLoaderData.mockReturnValue(dataWithNoEvents);

    render(<Slug />);

    expect(screen.getByTestId('events-provider')).toBeInTheDocument();
    expect(screen.queryByTestId('event-item-1')).not.toBeInTheDocument();
    expect(screen.queryByTestId('event-item-2')).not.toBeInTheDocument();
  });

  it('handles missing data gracefully', () => {
    mockUseLoaderData.mockReturnValue({
      ...mockLoaderData,
      data: undefined,
    });

    render(<Slug />);

    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });
});
