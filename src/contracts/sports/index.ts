import { F1Events } from './F1';
import { GolfEvents } from './Golf';
import { HorseRacingEvents } from './HorseRacing';
import { MlbTeams } from './MLB';
import { MlsTeams } from './MLS';
import { NbaTeams } from './NBA';
import { NcaaFootballTeams } from './NcaaFootball';
import { NcaaMensBasketballTeams } from './NcaaMensBasketball';
import { NflTeams } from './NFL';
import { NhlTeams } from './NHL';
import { RodeoEvents } from './Rodeo';
import { TennisEvents } from './Tennis';
import { WNbaTeams } from './WNBA';

const leagueMap = {
  'nfl-football': { title: 'NFL Teams', teams: NflTeams },
  'mlb-baseball': { title: 'MLB Teams', teams: MlbTeams },
  'mls-soccer': { title: 'MLS Teams', teams: MlsTeams },
  'nba-basketball': { title: 'NBA Teams', teams: NbaTeams },
  'ncaa-football': { title: 'NCAA Football Teams', teams: NcaaFootballTeams },
  'ncaa-mens-basketball': {
    title: "NCAA Men's Basketball Teams",
    teams: NcaaMensBasketballTeams,
  },
  'nhl-hockey': { title: 'NHL Teams', teams: NhlTeams },
  wnba: { title: 'WNBA Teams', teams: WNbaTeams },
};

export {
  MlbTeams,
  MlsTeams,
  NbaTeams,
  NflTeams,
  NhlTeams,
  F1Events,
  GolfEvents,
  HorseRacingEvents,
  NcaaMensBasketballTeams,
  NcaaFootballTeams,
  RodeoEvents,
  TennisEvents,
  leagueMap,
};
