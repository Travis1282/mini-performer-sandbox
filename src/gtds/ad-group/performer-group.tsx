import type { components } from '@/contracts/generated/maverick-schema'
import type { ReactNode } from 'react'
import HomeSearchBoxSearch from '@/components/Home/SearchBox'
import { LayoutFooter } from '@/components/Layout/Footer'
import { LayoutNavbar } from '@/components/Layout/Navbar'
import { PerformerHeading } from '@/components/Performer/Heading'
import { NarrowHeading } from '@/components/Performer/Heading/NarrowHeading'
import clsx from 'clsx'
import { AdGroupBuyerGuarantee, SafeAndSecureBuyerGuarantee } from './Alerts'
import { EventList } from './EventList'

export const Messages = {
  'buyer-guarantee': <AdGroupBuyerGuarantee />,
  'secure-checkout': <SafeAndSecureBuyerGuarantee />,
}

export const PerformerGroup = ({
  data,
  message,
  children,
  showNarrowHeading = false,
  deviceType,
}: {
  data: components['schemas']['SearchAdGroupResult']
  message?: keyof typeof Messages
  children?: ReactNode
  showNarrowHeading?: boolean
  deviceType?: 'desktop' | 'mobile' | 'unknown'
}) => {
  return (
    <div className="w-100 flex min-h-[100vh] flex-col">
      <LayoutNavbar
        darkBgNavbar={showNarrowHeading}
        defaultDark={!data.adGroupEntityResult?.performer}
        hideGradient={!!data.adGroupEntityResult?.performer}
      />
      <div className="mt-[-60px] lg:mt-[-94px]">
        {data.adGroupEntityResult?.performer ? (
          <>
            {showNarrowHeading ? (
              <NarrowHeading
                deviceType={deviceType}
                performer={data?.adGroupEntityResult?.performer}
                showTabs={false}
              />
            ) : (
              <PerformerHeading
                performer={data?.adGroupEntityResult?.performer}
                showTabs={false}
              />
            )}

            <div
              className={clsx({
                'narrow-container': showNarrowHeading,
                container: !showNarrowHeading,
              })}
              data-testid="container"
            >
              {children ? (
                children
              ) : (
                <>
                  {message ? Messages[message] : null}
                  <EventList data={data} />
                </>
              )}
            </div>
          </>
        ) : (
          <div className="container flex !max-h-[calc(100dvh-200px)] max-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-[94px]">
            {message ? Messages[message] : null}
            <h4 className="text-dark h2-sm mt-6 w-full max-w-[326px] pb-4 lg:max-w-[638px]">
              Find your event
            </h4>
            <HomeSearchBoxSearch suppressSearchResults suppressSidebar />
          </div>
        )}
      </div>
      <LayoutFooter />
    </div>
  )
}
