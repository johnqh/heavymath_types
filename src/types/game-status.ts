/**
 * @fileoverview Game/fixture status types for all sports
 * @description Const status code maps and helper functions to classify game state
 * across football, basketball, hockey, baseball, NFL, rugby, handball, volleyball,
 * F1, and MMA.  Follows the same `as const` + derived-type pattern used elsewhere
 * in this package.
 */

// ============================================================================
// High-level game state
// ============================================================================

export const GameStateValues = [
  'NotStarted',
  'Live',
  'Finished',
  'Postponed',
  'Cancelled',
  'Suspended',
] as const;

export type GameState = (typeof GameStateValues)[number];

// ============================================================================
// Football (Soccer)
// ============================================================================

export const FootballStatus = {
  TBD: 'TBD',
  NotStarted: 'NS',
  FirstHalf: '1H',
  HalfTime: 'HT',
  SecondHalf: '2H',
  ExtraTime: 'ET',
  Penalties: 'P',
  BreakTime: 'BT',
  Live: 'LIVE',
  FullTime: 'FT',
  AfterExtraTime: 'AET',
  AfterPenalties: 'PEN',
  Suspended: 'SUSP',
  Interrupted: 'INT',
  Postponed: 'PST',
  Cancelled: 'CANC',
  Abandoned: 'ABD',
  TechnicalLoss: 'AWD',
  Walkover: 'WO',
} as const;

export type FootballStatusCode =
  (typeof FootballStatus)[keyof typeof FootballStatus];

// ============================================================================
// Basketball
// ============================================================================

export const BasketballStatus = {
  NotStarted: 'NS',
  Quarter1: 'Q1',
  Quarter2: 'Q2',
  Quarter3: 'Q3',
  Quarter4: 'Q4',
  Overtime: 'OT',
  HalfTime: 'HT',
  BreakTime: 'BT',
  Live: 'LIVE',
  FullTime: 'FT',
  AfterOvertime: 'AOT',
  Postponed: 'PST',
  Cancelled: 'CANC',
} as const;

export type BasketballStatusCode =
  (typeof BasketballStatus)[keyof typeof BasketballStatus];

// ============================================================================
// Hockey
// ============================================================================

export const HockeyStatus = {
  NotStarted: 'NS',
  Period1: 'P1',
  Period2: 'P2',
  Period3: 'P3',
  Overtime: 'OT',
  BreakTime: 'BT',
  Live: 'LIVE',
  FullTime: 'FT',
  AfterOvertime: 'AOT',
  AfterPenalties: 'AP',
  Postponed: 'PST',
  Cancelled: 'CANC',
} as const;

export type HockeyStatusCode =
  (typeof HockeyStatus)[keyof typeof HockeyStatus];

// ============================================================================
// Baseball
// ============================================================================

export const BaseballStatus = {
  NotStarted: 'NS',
  Live: 'LIVE',
  InPlay: 'INPLAY',
  FullTime: 'FT',
  PostGame: 'POST',
  Postponed: 'PST',
  Cancelled: 'CANC',
  Suspended: 'SUSP',
} as const;

export type BaseballStatusCode =
  (typeof BaseballStatus)[keyof typeof BaseballStatus];

// ============================================================================
// NFL (American Football)
// ============================================================================

export const NflStatus = {
  NotStarted: 'NS',
  Quarter1: 'Q1',
  Quarter2: 'Q2',
  Quarter3: 'Q3',
  Quarter4: 'Q4',
  Overtime: 'OT',
  HalfTime: 'HT',
  Live: 'LIVE',
  FullTime: 'FT',
  AfterOvertime: 'AOT',
  Postponed: 'PST',
  Cancelled: 'CANC',
} as const;

export type NflStatusCode = (typeof NflStatus)[keyof typeof NflStatus];

// ============================================================================
// Rugby
// ============================================================================

export const RugbyStatus = {
  NotStarted: 'NS',
  FirstHalf: '1H',
  SecondHalf: '2H',
  HalfTime: 'HT',
  Live: 'LIVE',
  FullTime: 'FT',
  AfterExtraTime: 'AET',
  AfterPenalties: 'PEN',
  Postponed: 'PST',
  Cancelled: 'CANC',
} as const;

export type RugbyStatusCode =
  (typeof RugbyStatus)[keyof typeof RugbyStatus];

// ============================================================================
// Handball
// ============================================================================

export const HandballStatus = {
  NotStarted: 'NS',
  Live: 'LIVE',
  FullTime: 'FT',
  AfterExtraTime: 'AET',
  Postponed: 'PST',
  Cancelled: 'CANC',
} as const;

export type HandballStatusCode =
  (typeof HandballStatus)[keyof typeof HandballStatus];

// ============================================================================
// Volleyball
// ============================================================================

export const VolleyballStatus = {
  NotStarted: 'NS',
  Live: 'LIVE',
  FullTime: 'FT',
  AfterExtraTime: 'AET',
  Postponed: 'PST',
  Cancelled: 'CANC',
} as const;

export type VolleyballStatusCode =
  (typeof VolleyballStatus)[keyof typeof VolleyballStatus];

// ============================================================================
// Formula 1
// ============================================================================

export const F1Status = {
  NotStarted: 'NS',
  Scheduled: 'SCH',
  Live: 'LIVE',
  FullTime: 'FT',
  Finished: 'Finished',
  Cancelled: 'CANC',
} as const;

export type F1StatusCode = (typeof F1Status)[keyof typeof F1Status];

// ============================================================================
// MMA
// ============================================================================

export const MmaStatus = {
  NotStarted: 'NS',
  Scheduled: 'SCH',
  Live: 'LIVE',
  FullTime: 'FT',
  Finished: 'Finished',
  Cancelled: 'CANC',
} as const;

export type MmaStatusCode = (typeof MmaStatus)[keyof typeof MmaStatus];

// ============================================================================
// Helper sets for each sport – "live" and "finished" codes
// ============================================================================

const FOOTBALL_LIVE: ReadonlySet<string> = new Set([
  FootballStatus.FirstHalf,
  FootballStatus.SecondHalf,
  FootballStatus.HalfTime,
  FootballStatus.ExtraTime,
  FootballStatus.Penalties,
  FootballStatus.BreakTime,
  FootballStatus.Live,
]);

const FOOTBALL_FINISHED: ReadonlySet<string> = new Set([
  FootballStatus.FullTime,
  FootballStatus.AfterExtraTime,
  FootballStatus.AfterPenalties,
  FootballStatus.Abandoned,
  FootballStatus.TechnicalLoss,
  FootballStatus.Walkover,
]);

const BASKETBALL_LIVE: ReadonlySet<string> = new Set([
  BasketballStatus.Quarter1,
  BasketballStatus.Quarter2,
  BasketballStatus.Quarter3,
  BasketballStatus.Quarter4,
  BasketballStatus.Overtime,
  BasketballStatus.HalfTime,
  BasketballStatus.BreakTime,
  BasketballStatus.Live,
]);

const BASKETBALL_FINISHED: ReadonlySet<string> = new Set([
  BasketballStatus.FullTime,
  BasketballStatus.AfterOvertime,
]);

const HOCKEY_LIVE: ReadonlySet<string> = new Set([
  HockeyStatus.Period1,
  HockeyStatus.Period2,
  HockeyStatus.Period3,
  HockeyStatus.Overtime,
  HockeyStatus.BreakTime,
  HockeyStatus.Live,
]);

const HOCKEY_FINISHED: ReadonlySet<string> = new Set([
  HockeyStatus.FullTime,
  HockeyStatus.AfterOvertime,
  HockeyStatus.AfterPenalties,
]);

const BASEBALL_LIVE: ReadonlySet<string> = new Set([
  BaseballStatus.Live,
  BaseballStatus.InPlay,
]);

const BASEBALL_FINISHED: ReadonlySet<string> = new Set([
  BaseballStatus.FullTime,
  BaseballStatus.PostGame,
]);

const NFL_LIVE: ReadonlySet<string> = new Set([
  NflStatus.Quarter1,
  NflStatus.Quarter2,
  NflStatus.Quarter3,
  NflStatus.Quarter4,
  NflStatus.Overtime,
  NflStatus.HalfTime,
  NflStatus.Live,
]);

const NFL_FINISHED: ReadonlySet<string> = new Set([
  NflStatus.FullTime,
  NflStatus.AfterOvertime,
]);

const RUGBY_LIVE: ReadonlySet<string> = new Set([
  RugbyStatus.FirstHalf,
  RugbyStatus.SecondHalf,
  RugbyStatus.HalfTime,
  RugbyStatus.Live,
]);

const RUGBY_FINISHED: ReadonlySet<string> = new Set([
  RugbyStatus.FullTime,
  RugbyStatus.AfterExtraTime,
  RugbyStatus.AfterPenalties,
]);

const HANDBALL_NOT_STARTED: ReadonlySet<string> = new Set([
  HandballStatus.NotStarted,
  HandballStatus.Postponed,
  HandballStatus.Cancelled,
]);

const HANDBALL_FINISHED: ReadonlySet<string> = new Set([
  HandballStatus.FullTime,
  HandballStatus.AfterExtraTime,
]);

const VOLLEYBALL_NOT_STARTED: ReadonlySet<string> = new Set([
  VolleyballStatus.NotStarted,
  VolleyballStatus.Postponed,
  VolleyballStatus.Cancelled,
]);

const VOLLEYBALL_FINISHED: ReadonlySet<string> = new Set([
  VolleyballStatus.FullTime,
  VolleyballStatus.AfterExtraTime,
]);

const F1_NOT_STARTED: ReadonlySet<string> = new Set([
  F1Status.NotStarted,
  F1Status.Scheduled,
]);

const F1_FINISHED: ReadonlySet<string> = new Set([
  F1Status.FullTime,
  F1Status.Finished,
]);

const MMA_NOT_STARTED: ReadonlySet<string> = new Set([
  MmaStatus.NotStarted,
  MmaStatus.Scheduled,
]);

const MMA_FINISHED: ReadonlySet<string> = new Set([
  MmaStatus.FullTime,
  MmaStatus.Finished,
]);

// ============================================================================
// Per-sport helper functions
// ============================================================================

export const footballGameState = (status: string): GameState => {
  if (FOOTBALL_LIVE.has(status)) return 'Live';
  if (FOOTBALL_FINISHED.has(status)) return 'Finished';
  if (status === FootballStatus.Postponed) return 'Postponed';
  if (status === FootballStatus.Cancelled) return 'Cancelled';
  if (status === FootballStatus.Suspended || status === FootballStatus.Interrupted) return 'Suspended';
  return 'NotStarted';
};

export const basketballGameState = (status: string): GameState => {
  if (BASKETBALL_LIVE.has(status)) return 'Live';
  if (BASKETBALL_FINISHED.has(status)) return 'Finished';
  if (status === BasketballStatus.Postponed) return 'Postponed';
  if (status === BasketballStatus.Cancelled) return 'Cancelled';
  return 'NotStarted';
};

export const hockeyGameState = (status: string): GameState => {
  if (HOCKEY_LIVE.has(status)) return 'Live';
  if (HOCKEY_FINISHED.has(status)) return 'Finished';
  if (status === HockeyStatus.Postponed) return 'Postponed';
  if (status === HockeyStatus.Cancelled) return 'Cancelled';
  return 'NotStarted';
};

export const baseballGameState = (status: string): GameState => {
  if (BASEBALL_LIVE.has(status)) return 'Live';
  if (BASEBALL_FINISHED.has(status)) return 'Finished';
  if (status === BaseballStatus.Postponed) return 'Postponed';
  if (status === BaseballStatus.Cancelled) return 'Cancelled';
  if (status === BaseballStatus.Suspended) return 'Suspended';
  return 'NotStarted';
};

export const nflGameState = (status: string): GameState => {
  if (NFL_LIVE.has(status)) return 'Live';
  if (NFL_FINISHED.has(status)) return 'Finished';
  if (status === NflStatus.Postponed) return 'Postponed';
  if (status === NflStatus.Cancelled) return 'Cancelled';
  return 'NotStarted';
};

export const rugbyGameState = (status: string): GameState => {
  if (RUGBY_LIVE.has(status)) return 'Live';
  if (RUGBY_FINISHED.has(status)) return 'Finished';
  if (status === RugbyStatus.Postponed) return 'Postponed';
  if (status === RugbyStatus.Cancelled) return 'Cancelled';
  return 'NotStarted';
};

export const handballGameState = (status: string): GameState => {
  if (HANDBALL_FINISHED.has(status)) return 'Finished';
  if (HANDBALL_NOT_STARTED.has(status)) {
    if (status === HandballStatus.Postponed) return 'Postponed';
    if (status === HandballStatus.Cancelled) return 'Cancelled';
    return 'NotStarted';
  }
  return 'Live';
};

export const volleyballGameState = (status: string): GameState => {
  if (VOLLEYBALL_FINISHED.has(status)) return 'Finished';
  if (VOLLEYBALL_NOT_STARTED.has(status)) {
    if (status === VolleyballStatus.Postponed) return 'Postponed';
    if (status === VolleyballStatus.Cancelled) return 'Cancelled';
    return 'NotStarted';
  }
  return 'Live';
};

export const f1GameState = (status: string): GameState => {
  if (F1_FINISHED.has(status)) return 'Finished';
  if (F1_NOT_STARTED.has(status)) return 'NotStarted';
  if (status === F1Status.Cancelled) return 'Cancelled';
  return 'Live';
};

export const mmaGameState = (status: string): GameState => {
  if (MMA_FINISHED.has(status)) return 'Finished';
  if (MMA_NOT_STARTED.has(status)) return 'NotStarted';
  if (status === MmaStatus.Cancelled) return 'Cancelled';
  return 'Live';
};

// ============================================================================
// Convenience predicates
// ============================================================================

export const isGameStarted = (state: GameState): boolean =>
  state === 'Live' || state === 'Finished';
