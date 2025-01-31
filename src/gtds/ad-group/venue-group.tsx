import type { components } from '@/contracts/generated/maverick-schema'
import HomeSearchBoxSearch from '@/components/Home/SearchBox'
import { LayoutFooter } from '@/components/Layout/Footer'
import { LayoutNavbar } from '@/components/Layout/Navbar'
import { AdGroupAllEvents } from '@/components/Shared/AdGroup/AllEvents'
import { AdGroupPerformerEvents } from '@/components/Shared/AdGroup/PerformerEvents'
import { Messages } from '@/components/Shared/AdGroup/PerformerGroup'
import { VenueHeading } from '@/components/Venue/Heading'

export function VenueGroup({
  data,
  message,
}: {
  data: components['schemas']['SearchAdGroupResult']
  message?: keyof typeof Messages
}) {
  return (
    <>
      <LayoutNavbar
        defaultDark={!data.adGroupEntityResult?.venue?.id}
        hideGradient={!!data.events?.length}
      />
      <div className="mt-[-60px] lg:mt-[-94px]">
        {data.adGroupEntityResult?.venue?.id ? (
          <>
            <VenueHeading
              showTabs={false}
              venue={data.adGroupEntityResult.venue}
            />
            <div className="container">
              {message ? Messages[message] : null}
              <AdGroupPerformerEvents data={data} />
              <div className="pb-20 lg:pb-24">
                <AdGroupAllEvents events={data.events} />
              </div>
            </div>
          </>
        ) : (
          <div className="container flex !min-h-[calc(100dvh-200px)] min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-[94px]">
            <h4 className="text-dark h2-sm mt-6 w-full max-w-[326px] pb-4 lg:max-w-[638px]">
              Find your event
            </h4>

            <HomeSearchBoxSearch suppressSearchResults suppressSidebar />
          </div>
        )}
      </div>
      <LayoutFooter />
    </>
  )
}
