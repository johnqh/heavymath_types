/**
 * @fileoverview Type exports for @heavymath/types
 */

// Common types
export type {
  Optional,
  ChainPrefixedId,
  PredictionId,
  TxLogId,
  ParsedChainPrefixedId,
} from './common.js';

// Common validation utilities
export {
  isChainPrefixedId,
  isPredictionId,
  isTxLogId,
  parseChainPrefixedId,
} from './common.js';

// Event types - export type for interfaces/types
export type {
  Hex,
  Address,
  BaseEventContext,
  MarketCreatedArgs,
  PredictionPlacedArgs,
  PredictionUpdatedArgs,
  MarketResolvedArgs,
  MarketCancelledArgs,
  MarketAbandonedArgs,
  DealerFeeSetArgs,
  WinningsClaimedArgs,
  RefundClaimedArgs,
  DealerFeesWithdrawnArgs,
  SystemFeesWithdrawnArgs,
  LicenseIssuedArgs,
  PermissionsSetArgs,
  LicenseTransferredArgs,
  OracleTypeValue,
  OracleRegisteredArgs,
  OracleDataUpdatedArgs,
  UpdaterAuthorizedArgs,
} from './events.js';

// Export const values separately
export { OracleType } from './events.js';

// Entity types
export type {
  MarketStatus,
  ClaimType,
  WithdrawalType,
  MarketEntity,
  PredictionEntity,
  ClaimEntity,
  OracleEntity,
  DealerNftEntity,
  DealerPermissionEntity,
  WalletFavoriteEntity,
  FeeWithdrawalEntity,
  OracleRequestEntity,
  MarketStateHistoryEntity,
} from './entities.js';

// Entity runtime const arrays and type guards
export {
  MarketStatusValues,
  ClaimTypeValues,
  WithdrawalTypeValues,
  isMarketStatus,
  isClaimType,
  isWithdrawalType,
} from './entities.js';

// API types
export type {
  MarketData,
  PredictionData,
  DealerNftData,
  DealerLicenseData,
  DealerPermissionData,
  FeeWithdrawalData,
  OracleRequestData,
  MarketStateHistoryData,
  MarketStatsData,
  HealthData,
  SSEStatsData,
  WalletFavoriteData,
  CreateFavoriteRequest,
  FavoriteCountsFilters,
  PaginationMeta,
  SetMarketOracleConfigRequest,
  MarketOracleConfigData,
  MarketResolutionCheckSuccess,
  MarketResolutionCheckError,
  LicensePermissionData,
  DealerWithPermissionsData,
  DealerStatsData,
  MarketDetailStatsData,
  CategoryCountData,
  MarketResolutionData,
  MarketDetailData,
  WalletBalanceSummaryData,
  WalletBalanceDetailData,
  WalletTransactionData,
  WalletHistoryItemData,
  ServiceHealthData,
  TriggerLockResponseData,
  TriggerResolveResponseData,
  ApiInfoData,
  SportsHealthData,
} from './api.js';

export type {
  SportsApiResponse,
  SportName,
  SportsQueryParams,
  SearchTeamResult,
  SportsSearchResponse,
  FootballCountry,
  FootballLeague,
  FootballSeasonCoverage,
  FootballFixturesCoverage,
  FootballSeason,
  FootballLeagueResponse,
  FootballLeaguesParams,
  FootballSeasonsParams,
  BasketballCountry,
  BasketballLeague,
  BasketballSeason,
  BasketballLeagueResponse,
  BasketballLeaguesParams,
  BasketballSeasonsParams,
  BaseballCountry,
  BaseballLeague,
  BaseballSeason,
  BaseballLeagueResponse,
  BaseballLeaguesParams,
  RugbyCountry,
  RugbyLeague,
  RugbySeason,
  RugbyLeagueResponse,
  RugbyLeaguesParams,
  HandballLeague,
  HandballLeagueCountry,
  HandballLeagueSeason,
  HandballLeagueResponse,
  HandballLeaguesParams,
  VolleyballLeague,
  VolleyballLeagueCountry,
  VolleyballLeagueSeason,
  VolleyballLeagueResponse,
  VolleyballLeaguesParams,
  HockeyCountry,
  HockeyLeague,
  HockeySeason,
  HockeyLeagueResponse,
  HockeyLeaguesParams,
  HockeySeasonsParams,
  NflCountry,
  NflLeague,
  NflSeason,
  NflLeagueResponse,
  NflLeaguesParams,
  NflSeasonsParams,
} from './sports.js';

// Condition types - export type for interfaces/types
export type {
  ConditionTypeValue,
  ScoreTypeValue,
  TeamSideValue,
  ComparisonOperatorValue,
  WinLossCondition,
  MatchScoreCondition,
  TournamentCondition,
  ConditionData,
} from './condition.js';

// Condition const values and utilities
export {
  ConditionType,
  ScoreType,
  TeamSide,
  ComparisonOperator,
  encodeConditionData,
  decodeConditionData,
  formatConditionDescription,
} from './condition.js';

// Game status types - export type for derived types
export type {
  GameState,
  FootballStatusCode,
  BasketballStatusCode,
  HockeyStatusCode,
  BaseballStatusCode,
  NflStatusCode,
  RugbyStatusCode,
  HandballStatusCode,
  VolleyballStatusCode,
  F1StatusCode,
  MmaStatusCode,
} from './game-status.js';

// Game status const values, state classifiers, and predicates
export {
  GameStateValues,
  FootballStatus,
  BasketballStatus,
  HockeyStatus,
  BaseballStatus,
  NflStatus,
  RugbyStatus,
  HandballStatus,
  VolleyballStatus,
  F1Status,
  MmaStatus,
  footballGameState,
  basketballGameState,
  hockeyGameState,
  baseballGameState,
  nflGameState,
  rugbyGameState,
  handballGameState,
  volleyballGameState,
  f1GameState,
  mmaGameState,
  isGameStarted,
} from './game-status.js';

// Discussion types
export type {
  SubjectType,
  ModerationStatus,
  DiscussionEntity,
  DiscussionCommentEntity,
  DiscussionData,
  CommentData,
  DiscussionCommentsResponse,
  PostCommentRequest,
  ModerateCommentRequest,
  AuthNonceResponse,
  AuthVerifyRequest,
  AuthVerifyResponse,
} from './discussion.ts';

export {
  SubjectTypeValues,
  isSubjectType,
  ModerationStatusValues,
  isModerationStatus,
} from './discussion.ts';

// Datetime utilities
export { getCurrentDatetime } from './datetime.js';
