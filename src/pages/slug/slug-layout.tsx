import ScrollContainer from 'react-indiana-drag-scroll';
import { useLoaderData } from 'react-router';
import type { components } from '@/contracts/generated/maverick-schema';
import NotFound from '@/components/errors/not-found';
import { DateRange, EventTime, RegionHeading } from '@/components/event-list/Filters';
import { SearchEventItem } from '@/components/event-list/search-event-item';
import type { GetPerformerDataResp } from './services /getPerformerData';
import { PerformerHeading } from './components/Header';
import { EventsProvider, useEvents } from './contexts/EventsContext';

function SlugContent() {
  const props = useLoaderData<GetPerformerDataResp>();
  const { data, heroImage, regions } = props;
  const { eventsData } = useEvents();

  return (
    <>
      <PerformerHeading hideHeroImage={!heroImage} performer={data?.performer} showTabs={false} />
      <div className="container mt-5 flex flex-wrap justify-between gap-4 lg:mt-7">
        <RegionHeading regions={regions} />
        <ScrollContainer>
          <div className="no-scrollbar flex flex-nowrap gap-2 overflow-x-auto overflow-y-auto bg-transparent px-4 pb-6 lg:z-10 lg:overflow-visible lg:pb-[35px] xl:px-0">
            <DateRange
            //disabledBeforeAfter={}
            />
            <EventTime />
          </div>
        </ScrollContainer>
      </div>
      <div className="container">
        {eventsData?.map((event: components['schemas']['Event']) => (
          <SearchEventItem event={event} key={event.id} />
        ))}
      </div>
    </>
  );
}

export default function Slug() {
  const props = useLoaderData<GetPerformerDataResp>();
  const { data } = props;

  if (!data?.performer?.id) {
    return <NotFound />;
  }

  return (
    <EventsProvider initialData={data?.events}>
      <SlugContent />
    </EventsProvider>
  );
}
