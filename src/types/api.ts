/**
 * @fileoverview API Type Definitions for Heavymath Indexer
 * @description Centralized type definitions for API requests/responses
 * @version 1.0.0
 *
 * Note: API responses use ApiResponse from @sudobility/types
 * This file defines the data payload types used within those responses
 */

import { Optional } from './common.js';
import {
  MarketStatus,
  WithdrawalType,
  WalletFavoriteEntity,
} from './entities.js';

// ============================================================================
// API Data Types (used as payload in ApiResponse<T>)
// ============================================================================

/**
 * Market data returned by API endpoints.
 * Serialised form of {@link import('./entities').MarketEntity} where `bigint`
 * fields are represented as strings for JSON compatibility.
 */
export interface MarketData {
  /** Unique identifier, typically a {@link import('./common').ChainPrefixedId} */
  id: string;
  /** EVM chain ID where this market exists (e.g., 1 for Ethereum mainnet) */
  chainId: number;
  /** On-chain market identifier */
  marketId: string;
  /** String representation of the dealer NFT token ID used to create this market */
  dealerNftTokenId: string;
  /** Ethereum address of the dealer who created the market */
  dealerAddress: string;
  /** Human-readable title of the market */
  title: string;
  /** Optional longer description of the market's prediction question */
  description: Optional<string>;
  /** Category label for the market (e.g., "sports", "crypto") */
  category: string;
  /** Current status of the market */
  status: MarketStatus;
  /**
   * String representation of the resolution outcome.
   * `null` when the market is still active or was cancelled/abandoned.
   */
  outcome: Optional<string>;
  /** ISO 8601 timestamp when the market was created */
  createdAt: string;
  /**
   * ISO 8601 timestamp when the market was resolved.
   * `null` when the market has not been resolved.
   */
  resolvedAt: Optional<string>;
  /** String representation of the block number where the market was created */
  blockNumber: string;
  /** Transaction hash of the market creation transaction */
  transactionHash: string;
  /** Oracle ID (bytes32 hex) for sports event linking, null if not set */
  oracleId: Optional<string>;
  /** Encoded resolution condition (bytes32 hex), null for legacy markets */
  conditionData: Optional<string>;
}

/**
 * Prediction data returned by API endpoints.
 * Serialised form of {@link import('./entities').PredictionEntity} where
 * `bigint` fields are represented as strings for JSON compatibility.
 */
export interface PredictionData {
  /** Unique identifier, typically a {@link import('./common').PredictionId} */
  id: string;
  /** EVM chain ID where this prediction exists */
  chainId: number;
  /** ID of the market this prediction belongs to */
  marketId: string;
  /** Ethereum address of the user who placed the prediction */
  userAddress: string;
  /** String representation of the wagered amount in the token's smallest unit */
  amount: string;
  /** Predicted percentage value */
  percentage: number;
  /** The predicted outcome label */
  outcome: string;
  /** Whether the user has claimed winnings or a refund for this prediction */
  hasClaimed: boolean;
  /**
   * String representation of the claimed amount.
   * `null` if the user has not yet claimed.
   */
  claimedAmount: Optional<string>;
  /** ISO 8601 timestamp when the prediction was created */
  createdAt: string;
  /** ISO 8601 timestamp of the last update to the prediction */
  updatedAt: string;
  /** String representation of the block number of the last update */
  lastBlockNumber: string;
  /** Transaction hash of the last update transaction */
  lastTransactionHash: string;
}

/**
 * Dealer NFT data returned by API endpoints.
 * Serialised form of {@link import('./entities').DealerNftEntity} where
 * `bigint` fields are represented as strings for JSON compatibility.
 */
export interface DealerNftData {
  /** Unique identifier, typically a {@link import('./common').ChainPrefixedId} */
  id: string;
  /** EVM chain ID where this NFT exists */
  chainId: number;
  /** String representation of the on-chain token ID */
  tokenId: string;
  /** Ethereum address of the current NFT owner */
  ownerAddress: string;
  /** ISO 8601 timestamp when the NFT was minted */
  mintedAt: string;
  /** String representation of the block number where the NFT was minted */
  mintBlockNumber: string;
  /** Transaction hash of the mint transaction */
  mintTransactionHash: string;
  /**
   * ISO 8601 timestamp of the most recent transfer.
   * `null` if the NFT has never been transferred after minting.
   */
  lastTransferAt: Optional<string>;
  /**
   * String representation of the block number of the most recent transfer.
   * `null` if the NFT has never been transferred after minting.
   */
  lastTransferBlockNumber: Optional<string>;
  /**
   * Transaction hash of the most recent transfer.
   * `null` if the NFT has never been transferred after minting.
   */
  lastTransferTransactionHash: Optional<string>;
}

/**
 * Dealer permission data returned by API endpoints.
 * Serialised form of {@link import('./entities').DealerPermissionEntity}.
 */
export interface DealerPermissionData {
  /** Unique identifier combining chain, token, category, and subcategory */
  id: string;
  /** EVM chain ID where this permission exists */
  chainId: number;
  /** String representation of the dealer license NFT token ID */
  tokenId: string;
  /** Numeric category index the dealer is permitted to operate in */
  category: number;
  /** Numeric sub-category index the dealer is permitted to operate in */
  subCategory: number;
  /** ISO 8601 timestamp when the permission was granted */
  grantedAt: string;
  /** String representation of the block number where the permission was granted */
  blockNumber: string;
  /** Transaction hash of the permission grant transaction */
  transactionHash: string;
}

/**
 * Fee withdrawal data returned by API endpoints.
 * Serialised form of {@link import('./entities').FeeWithdrawalEntity} where
 * `bigint` fields are represented as strings for JSON compatibility.
 */
export interface FeeWithdrawalData {
  /** Unique identifier */
  id: string;
  /** EVM chain ID where this withdrawal occurred */
  chainId: number;
  /**
   * ID of the market the fees were withdrawn from.
   * `null` for system-level withdrawals that are not tied to a specific market.
   */
  marketId: Optional<string>;
  /** Ethereum address of the entity that performed the withdrawal */
  withdrawerAddress: string;
  /** Whether this is a dealer or system fee withdrawal */
  withdrawalType: WithdrawalType;
  /** String representation of the withdrawn amount in the token's smallest unit */
  amount: string;
  /** ISO 8601 timestamp when the withdrawal occurred */
  withdrawnAt: string;
  /** String representation of the block number where the withdrawal occurred */
  blockNumber: string;
  /** Transaction hash of the withdrawal transaction */
  transactionHash: string;
}

/**
 * Oracle request data returned by API endpoints.
 * Serialised form of {@link import('./entities').OracleRequestEntity} where
 * `bigint` fields are represented as strings for JSON compatibility.
 */
export interface OracleRequestData {
  /** Unique identifier */
  id: string;
  /** EVM chain ID where this request was made */
  chainId: number;
  /** ID of the market requesting oracle resolution */
  marketId: string;
  /** On-chain request identifier */
  requestId: string;
  /** ISO 8601 timestamp when the request was submitted */
  requestedAt: string;
  /** String representation of the block number where the request was submitted */
  requestBlockNumber: string;
  /** Transaction hash of the request transaction */
  requestTransactionHash: string;
  /**
   * ISO 8601 timestamp when the oracle responded.
   * `null` if the request is still pending.
   */
  respondedAt: Optional<string>;
  /**
   * String representation of the block number of the oracle's response.
   * `null` if the request is still pending.
   */
  responseBlockNumber: Optional<string>;
  /**
   * Transaction hash of the oracle's response transaction.
   * `null` if the request is still pending.
   */
  responseTransactionHash: Optional<string>;
  /**
   * Boolean result of the oracle's determination.
   * `null` if the request is still pending or timed out.
   */
  result: Optional<boolean>;
  /** Whether the request timed out before receiving a response */
  timedOut: boolean;
}

/**
 * Market state history data returned by API endpoints.
 * Serialised form of {@link import('./entities').MarketStateHistoryEntity}
 * where `bigint` fields are represented as strings for JSON compatibility.
 */
export interface MarketStateHistoryData {
  /** Unique identifier */
  id: string;
  /** EVM chain ID where this state transition occurred */
  chainId: number;
  /** ID of the market that transitioned */
  marketId: string;
  /**
   * The state the market transitioned from.
   * `null` for the initial creation event (the market had no prior state).
   */
  fromState: Optional<string>;
  /** The state the market transitioned to */
  toState: string;
  /** ISO 8601 timestamp when the state change occurred */
  changedAt: string;
  /** String representation of the block number where the state change occurred */
  blockNumber: string;
  /** Transaction hash of the state change transaction */
  transactionHash: string;
  /**
   * Human-readable reason for the state change.
   * `null` when no reason was provided.
   */
  reason: Optional<string>;
}

/**
 * Market statistics data returned by API endpoints.
 */
export interface MarketStatsData {
  /** Total number of markets */
  total: number;
  /** Breakdown of market count by status (e.g., { Active: 50, Resolved: 40 }) */
  byStatus: Record<string, number>;
  /** Breakdown of market count by category (e.g., { sports: 30, crypto: 40 }) */
  byCategory: Record<string, number>;
}

/**
 * Health check data returned by API endpoints.
 */
export interface HealthData {
  /** Current health status of the service */
  status: 'healthy' | 'unhealthy';
  /** Unix timestamp (milliseconds) when the health check was performed */
  timestamp: number;
}

/**
 * SSE (Server-Sent Events) connection statistics data.
 */
export interface SSEStatsData {
  /** Number of currently connected SSE clients */
  clients: number;
  /** Total number of active subscriptions across all clients */
  subscriptions: number;
}

/**
 * Wallet favorite data (same as entity for API use).
 */
export type WalletFavoriteData = WalletFavoriteEntity;

// ============================================================================
// API Request Types
// ============================================================================

/**
 * Request body for creating a wallet favorite.
 */
export interface CreateFavoriteRequest {
  /** Category of the item to favorite (e.g., "sports", "crypto") */
  category: string;
  /** Sub-category of the item to favorite (e.g., "football", "bitcoin") */
  subcategory: string;
  /** Type of the item to favorite (e.g., "market", "dealer") */
  type: string;
  /** ID of the item to favorite */
  id: string;
}

/**
 * Query parameters for the global favorite counts endpoint (GET /api/favorites/counts).
 * Used to get the number of users who favorited specific items.
 */
export interface FavoriteCountsFilters {
  /** Category (e.g., "sports") */
  category: string;
  /** Subcategory (e.g., "soccer") */
  subcategory: string;
  /** Item type (e.g., "team", "match") */
  type: string;
  /** Array of item IDs to get counts for */
  itemIds: string[];
}

// ============================================================================
// Oracle Resolution Types
// ============================================================================

/**
 * Request body for setting oracle config on a market.
 * Used by: POST /api/markets/:id/oracle-config
 */
export interface SetMarketOracleConfigRequest {
  /** Sports API team ID whose win = positive outcome (required for WinLoss, optional otherwise) */
  positiveTeamId?: string;
  /** Display name of the positive team */
  positiveTeamName?: string;
  /** Display name of the negative team */
  negativeTeamName?: string;
}

/**
 * Oracle config data returned by the API.
 * Used by: POST/GET /api/markets/:id/oracle-config
 */
export interface MarketOracleConfigData {
  /** Unique identifier (same as market ID, chain-prefixed) */
  id: string;
  /** EVM chain ID */
  chainId: number;
  /** Chain-prefixed market ID */
  marketId: string;
  /** Numeric sport code (1-10) decoded from oracleId */
  sportCode: number;
  /** Game/fixture ID from the sports API */
  gameId: string;
  /** Sports API team ID whose win = positive outcome */
  positiveTeamId: string;
  /** Display name of the positive team */
  positiveTeamName: string | null;
  /** Display name of the negative team */
  negativeTeamName: string | null;
  /** Unix timestamp (seconds) when the config was created */
  createdAt: number;
}

/**
 * Successful resolution check response (HTTP 200).
 * Used by: GET /api/markets/:id/resolve
 * The `result` field is what Chainlink extracts on-chain.
 */
export interface MarketResolutionCheckSuccess {
  /** 1 = positive outcome, 0 = negative outcome */
  result: number;
  /** Always true for successful checks */
  gameFinished: true;
  /** Condition type used for resolution (e.g., "WinLoss", "MatchScore", "Tournament") */
  conditionType?: string;
  /** Display name of the positive team */
  positiveTeamName: string | null;
  /** Display name of the negative team */
  negativeTeamName: string | null;
  /** Sports API ID of the winning team */
  winnerId: number;
  /** Name of the winning team */
  winnerName: string;
  /** Score string (e.g., "3-1") */
  score: string;
  /** Human-readable result description */
  description: string;
  /** ISO 8601 timestamp of the check */
  timestamp: string;
}

/**
 * Failed resolution check response (HTTP 400).
 * Used by: GET /api/markets/:id/resolve
 */
export interface MarketResolutionCheckError {
  /** Always false for error responses */
  success: false;
  /** Human-readable error message */
  error: string;
  /** Current game status from the sports API (e.g., "NS", "1H", "HT") */
  gameStatus?: string;
  /** ISO 8601 timestamp of the check */
  timestamp: string;
}

// ============================================================================
// Paginated Response Types
// ============================================================================

/**
 * Pagination metadata included in paginated API responses.
 */
export interface PaginationMeta {
  /** Total number of items matching the query */
  count: number;
  /** Maximum number of items returned per page */
  limit: number;
  /** Number of items skipped (for offset-based pagination) */
  offset: number;
}
