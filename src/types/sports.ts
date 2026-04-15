/**
 * @fileoverview Shared sports proxy and competition metadata types
 * @description Shared api-sports passthrough response types and sport-specific
 * competition season metadata used across the indexer, client, library, and app.
 */

import type { Optional } from './common.js';

export interface SportsApiResponse<T> {
  get: string;
  parameters: Record<string, string>;
  errors: string[] | Record<string, string>;
  results: number;
  paging?: { current: number; total: number };
  response: T[];
}

export type SportName =
  | 'football'
  | 'basketball'
  | 'hockey'
  | 'nfl'
  | 'baseball'
  | 'rugby'
  | 'formula1'
  | 'mma'
  | 'handball'
  | 'volleyball';

export type SportsQueryParams = Record<
  string,
  string | number | boolean | undefined
>;

export interface SearchTeamResult {
  id: number;
  name: string;
  logo: string | null;
  country: string | null;
}

export interface SportsSearchResponse {
  query: string;
  results: Partial<Record<SportName, SearchTeamResult[]>>;
  totalResults: number;
}

export interface FootballCountry {
  name: string;
  code: Optional<string>;
  flag: Optional<string>;
}

export interface FootballLeague {
  id: number;
  name: string;
  type: 'League' | 'Cup';
  logo: string;
}

export interface FootballSeasonCoverage {
  fixtures: FootballFixturesCoverage;
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
}

export interface FootballFixturesCoverage {
  events: boolean;
  lineups: boolean;
  statistics_fixtures: boolean;
  statistics_players: boolean;
}

export interface FootballSeason {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: FootballSeasonCoverage;
}

export interface FootballLeagueResponse {
  league: FootballLeague;
  country: FootballCountry;
  seasons: FootballSeason[];
}

export interface FootballLeaguesParams {
  id?: Optional<number>;
  name?: Optional<string>;
  country?: Optional<string>;
  code?: Optional<string>;
  season?: Optional<number>;
  team?: Optional<number>;
  type?: Optional<'league' | 'cup'>;
  current?: Optional<boolean>;
  search?: Optional<string>;
  last?: Optional<number>;
}

export interface FootballSeasonsParams {
  league?: Optional<number>;
}

export interface BasketballCountry {
  id: number;
  name: string;
  code: Optional<string>;
  flag: Optional<string>;
}

export interface BasketballLeague {
  id: number;
  name: string;
  type: string;
  logo: Optional<string>;
}

export interface BasketballSeason {
  season: string;
  start: string;
  end: string;
}

export interface BasketballLeagueResponse {
  id: number;
  name: string;
  type: string;
  logo: Optional<string>;
  country: BasketballCountry;
  seasons: BasketballSeason[];
}

export interface BasketballLeaguesParams {
  id?: Optional<number>;
  name?: Optional<string>;
  country?: Optional<string>;
  season?: Optional<string>;
  type?: Optional<string>;
  current?: Optional<boolean>;
  search?: Optional<string>;
}

export interface BasketballSeasonsParams {
  league?: Optional<number>;
}

export interface BaseballCountry {
  id: number;
  name: string;
  code: Optional<string>;
  flag: Optional<string>;
}

export interface BaseballLeague {
  id: number;
  name: string;
  type: string;
  logo: Optional<string>;
}

export interface BaseballSeason {
  season: number;
  start: string;
  end: string;
  current: boolean;
}

export interface BaseballLeagueResponse {
  id: number;
  name: string;
  type: string;
  logo: Optional<string>;
  country: BaseballCountry;
  seasons: BaseballSeason[];
}

export interface BaseballLeaguesParams {
  id?: Optional<number>;
  name?: Optional<string>;
  country?: Optional<string>;
  country_id?: Optional<number>;
  type?: Optional<string>;
  season?: Optional<number>;
  search?: Optional<string>;
}

export interface RugbyCountry {
  id: number;
  name: string;
  code: Optional<string>;
  flag: Optional<string>;
}

export interface RugbyLeague {
  id: number;
  name: string;
  type: string;
  logo: Optional<string>;
}

export interface RugbySeason {
  season: number | string;
  start: string;
  end: string;
  current: boolean;
}

export interface RugbyLeagueResponse {
  id: number;
  name: string;
  type: string;
  logo: Optional<string>;
  country: RugbyCountry;
  seasons: RugbySeason[];
}

export interface RugbyLeaguesParams {
  id?: Optional<number>;
  name?: Optional<string>;
  country?: Optional<string>;
  country_id?: Optional<number>;
  type?: Optional<string>;
  season?: Optional<number | string>;
  search?: Optional<string>;
}

export interface HandballLeague {
  id: number;
  name: string;
  type: string;
  logo: Optional<string>;
}

export interface HandballLeagueCountry {
  id: number;
  name: string;
  code: Optional<string>;
  flag: Optional<string>;
}

export interface HandballLeagueSeason {
  season: number;
  start: string;
  end: string;
  current: boolean;
}

export interface HandballLeagueResponse {
  id: number;
  name: string;
  type: string;
  logo: Optional<string>;
  country: HandballLeagueCountry;
  seasons: HandballLeagueSeason[];
}

export interface HandballLeaguesParams {
  id?: Optional<number>;
  name?: Optional<string>;
  country_id?: Optional<number>;
  country?: Optional<string>;
  type?: Optional<string>;
  season?: Optional<number>;
  search?: Optional<string>;
}

export interface VolleyballLeague {
  id: number;
  name: string;
  type: string;
  logo: Optional<string>;
}

export interface VolleyballLeagueCountry {
  id: number;
  name: string;
  code: Optional<string>;
  flag: Optional<string>;
}

export interface VolleyballLeagueSeason {
  season: number;
  start: string;
  end: string;
  current: boolean;
}

export interface VolleyballLeagueResponse {
  id: number;
  name: string;
  type: string;
  logo: Optional<string>;
  country: VolleyballLeagueCountry;
  seasons: VolleyballLeagueSeason[];
}

export interface VolleyballLeaguesParams {
  id?: Optional<number>;
  name?: Optional<string>;
  country_id?: Optional<number>;
  country?: Optional<string>;
  type?: Optional<string>;
  season?: Optional<number>;
  search?: Optional<string>;
}

export interface HockeyCountry {
  id: number;
  name: string;
  code: Optional<string>;
  flag: Optional<string>;
}

export interface HockeyLeague {
  id: number;
  name: string;
  type: string;
  logo: Optional<string>;
}

export interface HockeySeason {
  season: number;
  start: string;
  end: string;
  current: boolean;
}

export interface HockeyLeagueResponse {
  id: number;
  name: string;
  type: string;
  logo: Optional<string>;
  country: HockeyCountry;
  seasons: HockeySeason[];
}

export interface HockeyLeaguesParams {
  id?: Optional<number>;
  name?: Optional<string>;
  country?: Optional<string>;
  season?: Optional<number>;
  type?: Optional<string>;
  current?: Optional<boolean>;
  search?: Optional<string>;
}

export interface HockeySeasonsParams {
  league?: Optional<number>;
}

export interface NflCountry {
  id: number;
  name: string;
  code: Optional<string>;
  flag: Optional<string>;
}

export interface NflLeague {
  id: number;
  name: string;
  type: string;
  logo: Optional<string>;
}

export interface NflSeason {
  season: number;
  start: string;
  end: string;
  current: boolean;
}

export interface NflLeagueResponse {
  league: NflLeague;
  country: NflCountry;
  seasons: NflSeason[];
}

export interface NflLeaguesParams {
  id?: Optional<number>;
  name?: Optional<string>;
  country?: Optional<string>;
  code?: Optional<string>;
  season?: Optional<number>;
  type?: Optional<string>;
  current?: Optional<boolean>;
  search?: Optional<string>;
}

export interface NflSeasonsParams {
  league?: Optional<number>;
}
