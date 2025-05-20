'use client';

import type { ReactNode } from 'react';
import { VERCEL_ENV } from '@/utils/config';
import { resolveImagePath } from '@/utils/helpers';
import { Copyright } from './CopyRight';

const SOCIAL_MEDIA = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/gotickets_com/ ',
    icon: 'instagram-icon.svg',
  },
  {
    name: 'Tiktok',
    url: 'https://www.tiktok.com/@gotickets',
    icon: 'tiktok-icon.svg',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/gotickets/',
    icon: 'facebook-icon.svg',
  },
  {
    name: 'X',
    url: 'https://twitter.com/GoTickets',
    icon: 'x-social-icon.svg',
  },
] as const;

function SocialMedia() {
  return (
    <div className="flex gap-6">
      {SOCIAL_MEDIA.map((social) => (
        <a
          aria-label={`Go to ${social.name} Page`}
          className="opacity-30 transition-opacity hover:opacity-100"
          href={social.url}
          key={social.name}
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt={`${social.name} icon`}
            className="h-6! w-6! transition-transform hover:scale-110"
            height={24}
            src={`https://static.gotickets.com/img/${social.icon}`}
            width={24}
          />
        </a>
      ))}
    </div>
  );
}

export function LayoutFooter(): ReactNode {
  return (
    <footer className="bg-footer-bg-color mt-auto text-white">
      <div className="container flex flex-col gap-[8px] px-4 py-6 md:gap-[16px] md:py-16 lg:gap-10 lg:pt-[47px] lg:pb-5 xl:px-0">
        <div className="flex flex-col flex-wrap justify-between lg:flex-row lg:justify-normal lg:gap-x-[65px] lg:gap-y-6">
          <div className="hidden md:mb-0 md:flex md:flex-row md:items-center md:gap-12">
            <a href="/">
              <img
                alt="gotickets logo"
                className=""
                data-cy="footerLogo"
                height={12}
                src={resolveImagePath('/img/gotickets.svg')}
                width={137}
              />
            </a>
          </div>
          <div className="mt-0 flex grow flex-col justify-between md:mt-5 md:flex-row md:gap-10 lg:mt-0 lg:justify-normal lg:gap-0">
            <div className="flex flex-col gap-10 md:flex-row md:justify-end md:gap-4 lg:w-full lg:justify-end">
              <nav className="flex lg:gap-[38px]">
                <ul
                  className="flex flex-wrap gap-4 gap-y-2 md:mb-0 md:gap-8 lg:mt-0 lg:gap-6"
                  data-cy="footerInstitutionalLinks"
                >
                  <li className="body2 font-normal! md:mt-0 md:block">
                    <a
                      aria-label="Go to Order Status Page"
                      className="hover:text-accent"
                      href="/account/order"
                    >
                      Order Status
                    </a>
                  </li>
                  <li className="body2 font-normal!" data-cy="contactUsFooter">
                    <a
                      aria-label="Go to Support Page"
                      className="hover:text-accent"
                      href="https://support.gotickets.com"
                      rel="noreferrer"
                      target="_blank"
                    >
                      Support
                    </a>
                  </li>
                  <li className="body2 font-normal! md:block">
                    <a
                      aria-label="Go to Buyer Guarantee Page"
                      className="hover:text-accent"
                      data-cy="link"
                      href="/buyer-guarantee"
                    >
                      Guarantee
                    </a>
                  </li>
                  <li className="body2 hidden font-normal! md:block">
                    <a aria-label="Go to About Us Page" className="hover:text-accent" href="/about">
                      About Us
                    </a>
                  </li>
                  <li className="body2 font-normal! md:block">
                    <a
                      aria-label="Go to Sell Tickets Page"
                      className="hover:text-accent"
                      href="/sell-tickets"
                    >
                      Sell<span className="xsm-none"> Tickets</span>
                    </a>
                  </li>
                </ul>
                <div className="hidden lg:block" data-cy="footerSocialLinksDesktop">
                  <SocialMedia />
                </div>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 md:mb-2 lg:flex-row">
          <div
            className="mt-6 mb-4 flex flex-wrap items-center justify-between gap-3 align-baseline md:hidden"
            data-cy="footerSocialLinksMobile"
          >
            <a href="/">
              <img
                alt="gotickets logo"
                className=""
                data-cy="footerLogo"
                height={12}
                src={resolveImagePath('/img/gotickets.svg')}
                width={137}
              />
            </a>
            <SocialMedia />
          </div>
          <Copyright />
          <nav className="flex flex-row justify-between gap-10 md:gap-10">
            <ul
              className="flex flex-wrap gap-2 md:max-w-[500px] lg:max-w-none"
              data-cy="footerLegalLinks"
            >
              <li>
                <a
                  aria-label="Go to Accessibility Page"
                  className="body2 hover:text-accent font-normal opacity-50"
                  data-cy="link"
                  href="/accessibility"
                >
                  Accessibility
                </a>
              </li>
              <li>
                <a
                  aria-label="Go to NY Broker Licenses Page"
                  className="body2 hover:text-accent font-normal opacity-50"
                  data-cy="link"
                  href="https://appext20.dos.ny.gov/lcns_public/bus_name_search_cursor_new?p_bus_name=&p_city=&p_zip_code=&p_lic_code=TRE&p_county_code=&p_request=Search&p_display_start=1&"
                  rel="noreferrer"
                  target="_blank"
                >
                  Licenses
                </a>
              </li>
              <li>
                <a
                  aria-label="Go to Terms of Service Page"
                  className="body2 hover:text-accent font-normal opacity-50"
                  data-cy="link"
                  href="/terms-of-use"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  aria-label="Go to Privacy Policy Page"
                  className="body2 hover:text-accent font-normal opacity-50"
                  href="/privacy-policy"
                >
                  Privacy<span className="xsm-none"> Policy</span>
                </a>
                <div className="hidden">{VERCEL_ENV}</div>
              </li>
            </ul>

            <div className="hidden md:block lg:hidden" data-cy="footerSocialLinksTablet">
              <SocialMedia />
            </div>
          </nav>
        </div>
      </div>
    </footer>
  );
}
