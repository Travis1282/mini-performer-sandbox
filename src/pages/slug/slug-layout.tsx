import NotFound from '@/components/errors/not-found';
import { Categories, DateRange, EventType, RegionHeading } from '@/components/event-list/Filters';
import { SearchEventItem } from '@/components/event-list/search-event-item';
import ScrollContainer from 'react-indiana-drag-scroll';
// import Redirect from '@/services/navigation/redirect';
import { useLoaderData } from 'react-router';
import type { GetPerformerDataResp } from './services /getPerformerData';
import { PerformerHeading } from './components/Header';
import { EventsProvider, useEvents } from './contexts/EventsContext';

function SlugContent() {
  const props = useLoaderData<GetPerformerDataResp>();
  const { data, hasSpecificHeroImage, showTabs, titleOverride } = props;
  const { eventsData, isLoading, error } = useEvents();

  // // test reidrect
  // if (slug === 'bruno-mars') {
  //   return <Redirect to="bruno-mars-tickets" />;
  // }

  // if (slug === 'bruno-mars-404') {
  //   return <NotFound />;
  // }

  return (
    <>
      <PerformerHeading
        hideHeroImage={!hasSpecificHeroImage}
        performer={data?.performer}
        showTabs={showTabs}
        titleOverride={titleOverride}
      />
      <div className="container mt-5 flex flex-wrap justify-between gap-4 lg:mt-7">
        <RegionHeading />
        <ScrollContainer>
          <div className="no-scrollbar flex flex-nowrap gap-2 overflow-x-auto overflow-y-auto bg-transparent px-4 pb-6 lg:z-10 lg:overflow-visible lg:pb-[35px] xl:px-0">
            <DateRange />
            <EventType />
            <Categories />
          </div>
        </ScrollContainer>
      </div>
      <div className="container">
        {eventsData?.data?.results?.map((event) => (
          <SearchEventItem event={event} key={event.id} />
        ))}
        {isLoading && <div>Loading events...</div>}
        {error && <div>Error loading events</div>}
      </div>
    </>
  );
}

export default function Slug() {
  const props = useLoaderData<GetPerformerDataResp>();
  const { data, eventsListResp } = props;

  if (!data?.performer?.id) {
    return <NotFound />;
  }

  return (
    <EventsProvider initialData={eventsListResp} performerId={data.performer.id}>
      <SlugContent />
    </EventsProvider>
  );
}
