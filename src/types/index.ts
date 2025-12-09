/**
 * @fileoverview Type exports for @heavymath/types
 */

// Common types
export type {
  Optional,
  ChainPrefixedId,
  PredictionId,
  TxLogId,
} from './common';

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
} from './events';

// Export const values separately
export { OracleType } from './events';

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
} from './entities';

// API types
export type {
  MarketData,
  PredictionData,
  DealerNftData,
  DealerPermissionData,
  FeeWithdrawalData,
  OracleRequestData,
  MarketStateHistoryData,
  MarketStatsData,
  HealthData,
  SSEStatsData,
  WalletFavoriteData,
  CreateFavoriteRequest,
  PaginationMeta,
} from './api';
