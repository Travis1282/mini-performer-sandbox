import clsx from 'clsx';
import type { components } from '@/contracts/generated/maverick-schema';
import { getEventTitle, getHeroImage } from '@/utils/eventUtils';
import { resolveImagePath } from '@/utils/helpers';

export interface PerformerHeadingProps {
  headerWidth?: number;
  hideHeroImage?: boolean;
  performer?: components['schemas']['Performer'];
  showTabs?: boolean;
  titleOverride?: string;
}

export function PerformerHeading({
  performer,
  showTabs = true,
  hideHeroImage = false,
  titleOverride,
  headerWidth,
}: PerformerHeadingProps) {
  const hasPerformerHeroImagePath = !!performer?.heroImagePath;

  const imageAltName = hasPerformerHeroImagePath
    ? performer?.name
    : performer?.primaryCategory?.name;

  const heroImage = getHeroImage('performer', performer, {
    width: headerWidth,
  });

  console.log('performer', performer);

  const title = getEventTitle(performer, { titleOverride });

  const titleSize = title ? title.length : 0;

  return (
    <>
      <header
        className={clsx('relative pt-[94px]', {
          'pt-16!': hideHeroImage,
        })}
        data-testid="performer-header"
      >
        {!hideHeroImage ? (
          <img
            alt={`Image of ${imageAltName}`}
            className="absolute inset-0 z-1 h-full w-full object-cover object-center"
            loading="eager"
            src={heroImage}
          />
        ) : null}
        <div
          className="absolute inset-0 z-2 bg-[linear-gradient(180deg,#011327_0%,rgba(1,19,39,0.50)_100%),linear-gradient(360deg,rgba(1,19,39,0.4)_0%,rgba(1,19,39,0.2)_100%)] lg:bg-[linear-gradient(180deg,#011327_0%,rgba(1,19,39,0.50)_100%)]"
          id="overlay"
        />

        <div
          className={clsx(
            'relative z-10 flex justify-center px-4',
            showTabs ? 'h-[135px] lg:h-[241px]' : 'h-[100px] lg:h-[160px]'
          )}
        >
          <div className="container flex flex-col justify-end">
            <h1
              className={clsx(
                'leading-[1.1] font-bold text-white',
                titleSize >= 56
                  ? 'body1 leading-6 font-bold! lg:text-[2.3rem] lg:leading-10'
                  : titleSize >= 42
                    ? 'text-2xl lg:text-[3.5rem]'
                    : 'h1-sm lg:h1-lg',
                !showTabs ? 'mb-[45px] lg:mb-[45px]' : ''
              )}
              data-testid="performer-header-title"
              id="performer-headline"
            >
              {title}
            </h1>
            {showTabs && (
              <nav className="h6-lg lg:h5-sm mt-4 flex text-white lg:mt-[45px]">
                <a
                  aria-label={`Go to ${
                    performer?.parking ? performer.parkingParent?.name : performer?.name
                  } Page`}
                  className={`mr-10 flex items-center border-b-4 py-3 lg:font-semibold ${
                    !performer?.parking ? 'border-accent' : 'border-transparent'
                  }`}
                  data-testid="event-link"
                  href={`/${performer?.parking ? performer?.parkingParent?.slug : performer?.slug}`}
                >
                  <img
                    alt="calendar icon"
                    className="mr-1"
                    height={16}
                    src={resolveImagePath('/img/calendar-icon.svg')}
                    width={16}
                  />
                  <span>Events</span>
                </a>
                {performer?.parkingPerformerId || performer?.parking ? (
                  <a
                    aria-label={`Go to ${
                      performer.parking ? performer.name : performer.parkingPerformer?.name
                    } Page`}
                    className={`flex items-center border-b-4 py-3 lg:font-semibold ${
                      performer.parking ? 'border-accent' : 'border-transparent'
                    }`}
                    data-testid="parking-link"
                    href={`/${
                      performer.parking ? performer.slug : performer.parkingPerformer?.slug
                    }`}
                    id="parking-link"
                  >
                    <img
                      alt="calendar icon"
                      className="mr-1"
                      height={16}
                      src={resolveImagePath('/img/parking-icon.svg')}
                      width={16}
                    />
                    <span>Parking</span>
                  </a>
                ) : null}
              </nav>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
