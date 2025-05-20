import type { NavbarCategory } from '../UiVariants';
import { citiesConcerts, citiesSports, citiesTheater } from '../cities';
import {
  CountryAndFolk,
  musicFestivals,
  popConcerts,
  RapAndHipHopConcerts,
  RockConcerts,
  trendingConcerts,
} from '../Concerts';
import { RAndBPerformers } from '../Concerts/R&B';
import {
  F1Events,
  GolfEvents,
  HorseRacingEvents,
  MlbTeams,
  MlsTeams,
  NbaTeams,
  NcaaFootballTeams,
  NcaaMensBasketballTeams,
  NflTeams,
  NhlTeams,
  RodeoEvents,
  TennisEvents,
} from '../sports';
import { navbarMenuEventsMlb } from '../sports/MLB';
import { navbarMenuEventsMls } from '../sports/MLS';
import { navbarMenuEventsNba } from '../sports/NBA';
import { navbarMenuEvents } from '../sports/NFL';
import { navbarMenuEventsNhl } from '../sports/NHL';
import { WNbaTeams } from '../sports/WNBA';
import {
  broadwayTheater,
  // classicalTheater,
  comedyTheater,
  familyTheater,
  // holidayTheater,
  trendingTheater,
} from '../Theater';
import { cirqueTheater } from '../Theater/cirqueTheater';

export const sportsSecondLevel = [
  {
    id: 181,
    children: [
      ...navbarMenuEvents,
      ...NflTeams,
      {
        title: 'View all NFL Football',
        url: 'nfl-football',
      },
    ],
  },
  {
    id: 171,
    children: [
      ...navbarMenuEventsMlb,
      ...MlbTeams,
      {
        title: 'View all MLB Baseball',
        url: 'mlb-baseball',
      },
    ],
  },
  {
    id: 175,
    children: [
      ...navbarMenuEventsNba,
      ...NbaTeams,
      {
        title: 'View all NBA Basketball',
        url: 'nba-basketball',
      },
    ],
  },
  {
    id: 183,
    children: [
      ...navbarMenuEventsNhl,
      ...NhlTeams,
      {
        title: 'View all NHL Hockey',
        url: 'nhl-hockey',
      },
    ],
  },
  {
    id: 199,
    children: [
      ...WNbaTeams,
      {
        title: 'View all WNBA Basketball',
        url: 'wnba',
      },
    ],
  },

  {
    id: 226,
    children: [
      ...F1Events,
      {
        title: 'View all F1',
        url: 'f1',
      },
    ],
  },
  {
    id: 209,
    children: [
      ...GolfEvents,
      {
        title: 'View all Golf',
        url: 'golf',
      },
    ],
  },
  {
    id: 195,
    children: [
      ...HorseRacingEvents,
      {
        title: 'View all Horse Racing',
        url: 'horse-racing',
      },
    ],
  },
  {
    id: 206,
    children: [
      ...navbarMenuEventsMls,
      ...MlsTeams,
      {
        title: 'View all MLS Soccer',
        url: 'mls-soccer',
      },
    ],
  },
  {
    id: 182,
    children: [
      {
        title: 'College Football Championship',
        url: 'college-football-championship',
      },
      ...NcaaFootballTeams,
      {
        title: 'View all NCAA Football',
        url: 'ncaa-football',
      },
    ],
  },
  {
    id: 157,
    children: [
      {
        title: 'NCAA Final Four',
        url: 'ncaa-mens-final-four',
      },
      ...NcaaMensBasketballTeams,
      {
        title: 'View all NCAA Basketball',
        url: 'ncaa-mens-basketball',
      },
    ],
  },
  {
    id: 156,
    children: [
      ...RodeoEvents,
      {
        title: 'View all Rodeo',
        url: 'rodeo',
      },
    ],
  },
  {
    id: 169,
    children: [
      ...TennisEvents,
      {
        title: 'View all Tennis',
        url: 'tennis',
      },
    ],
  },
] as NavbarCategory[];

export const concertsSecondLevel = [
  {
    id: undefined,
    title: 'Trending',
    url: '#',
    children: trendingConcerts,
  },
  {
    id: 186,
    children: musicFestivals,
  },
  {
    id: 141,
    children: popConcerts,
  },
  {
    id: 145,
    children: RapAndHipHopConcerts,
  },
  {
    id: 149,
    children: RAndBPerformers,
  },
  {
    id: 137,
    children: RockConcerts,
  },
  {
    id: 138,
    children: CountryAndFolk,
  },
] as NavbarCategory[];

export const theaterSecondLevel = [
  {
    id: undefined,
    title: 'Trending',
    url: '#',
    children: trendingTheater,
  },
  {
    id: 184,
    children: broadwayTheater,
  },
  {
    id: 136,
    children: comedyTheater,
  },
  {
    id: 154,
    children: familyTheater,
  },
  // {
  //   id: 243,
  //   children: holidayTheater,
  // },
  {
    id: 150,
    children: cirqueTheater,
  },
] as NavbarCategory[];

export const citiesSecondLevel = [
  {
    id: 5,
    children: citiesSports,
  },
  {
    id: 185,
    children: citiesConcerts,
  },
  {
    id: 155,
    children: citiesTheater,
  },
] as NavbarCategory[];
