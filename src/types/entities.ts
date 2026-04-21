/**
 * @fileoverview Database Entity Type Definitions
 * @description Centralized type definitions for all database entities
 * @version 1.0.0
 */

import { Optional } from './common.js';

// ============================================================================
// Enums and Constants
// ============================================================================

/**
 * All possible values for {@link MarketStatus}, exposed as a runtime constant
 * so consumers can iterate over them or perform runtime validation.
 */
export const MarketStatusValues = [
  'Active',
  'Cancelled',
  'Resolved',
  'Abandoned',
] as const;

/**
 * Possible states of a prediction market.
 * - `'Active'`    - Market is open for predictions
 * - `'Cancelled'` - Market was cancelled by the dealer before resolution
 * - `'Resolved'`  - Market has been resolved with a final outcome
 * - `'Abandoned'` - Market was abandoned due to no resolution after deadline
 */
export type MarketStatus = (typeof MarketStatusValues)[number];

/**
 * All possible values for {@link ClaimType}, exposed as a runtime constant
 * so consumers can iterate over them or perform runtime validation.
 */
export const ClaimTypeValues = ['winnings', 'refund'] as const;

/**
 * Types of claims that can be made against a market.
 * - `'winnings'` - Claim winnings from a resolved market
 * - `'refund'`   - Claim a refund from a cancelled or abandoned market
 */
export type ClaimType = (typeof ClaimTypeValues)[number];

/**
 * All possible values for {@link WithdrawalType}, exposed as a runtime constant
 * so consumers can iterate over them or perform runtime validation.
 */
export const WithdrawalTypeValues = ['dealer', 'system'] as const;

/**
 * Types of fee withdrawals.
 * - `'dealer'` - Dealer withdraws accumulated fees from a specific market
 * - `'system'` - System-level fee withdrawal to the treasury
 */
export type WithdrawalType = (typeof WithdrawalTypeValues)[number];

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Runtime type guard for {@link MarketStatus}.
 *
 * @param value - The string to validate
 * @returns `true` (narrowed to `MarketStatus`) when the value is a valid market status
 */
export function isMarketStatus(value: string): value is MarketStatus {
  return (MarketStatusValues as readonly string[]).includes(value);
}

/**
 * Runtime type guard for {@link ClaimType}.
 *
 * @param value - The string to validate
 * @returns `true` (narrowed to `ClaimType`) when the value is a valid claim type
 */
export function isClaimType(value: string): value is ClaimType {
  return (ClaimTypeValues as readonly string[]).includes(value);
}

/**
 * Runtime type guard for {@link WithdrawalType}.
 *
 * @param value - The string to validate
 * @returns `true` (narrowed to `WithdrawalType`) when the value is a valid withdrawal type
 */
export function isWithdrawalType(value: string): value is WithdrawalType {
  return (WithdrawalTypeValues as readonly string[]).includes(value);
}

// ============================================================================
// Database Entity Types
// ============================================================================

/**
 * Market Entity
 * Database representation of a prediction market.
 */
export interface MarketEntity {
  /** Unique identifier, typically a {@link import('./common').ChainPrefixedId} */
  id: string;
  /** Ethereum address of the dealer who created the market */
  dealer: string;
  /** Dealer NFT token ID used to create this market */
  tokenId: bigint;
  /** Numeric category index for the market (e.g., sports, crypto) */
  category: bigint;
  /** Numeric sub-category index within the parent category */
  subCategory: bigint;
  /** Unix timestamp (seconds) after which the market can be resolved */
  deadline: bigint;
  /** Human-readable description of the market's prediction question */
  description: string;
  /** Unix timestamp (seconds) when the market was created on-chain */
  createdAt: bigint;
  /**
   * Dealer fee in basis points (1 bps = 0.01%).
   * Valid range is 10-200 (0.10% to 2.00%).
   */
  dealerFeeBps: bigint;
  /** Current status of the market */
  status: MarketStatus;
  /**
   * Whether the positive side won.
   * `null` when the market is still active or was cancelled/abandoned.
   */
  positiveOutcome: Optional<boolean>;
  /**
   * Identifier of the oracle assigned to this market.
   * `null` if no oracle is assigned (manual resolution).
   */
  oracleId: Optional<string>;
  /**
   * Encoded resolution condition (bytes32 hex).
   * `null` or zero-bytes for legacy WinLoss markets.
   */
  conditionData: Optional<string>;
  /** EVM chain ID where this market exists (e.g., 1 for Ethereum mainnet) */
  chainId: number;
  /** Block number in which the market creation transaction was mined */
  blockNumber: bigint;
  /** Transaction hash of the market creation transaction */
  txHash: string;
  /** Unix timestamp (seconds) of the block containing the creation transaction */
  timestamp: bigint;
}

/**
 * Prediction Entity
 * Database representation of a user's prediction on a market.
 */
export interface PredictionEntity {
  /** Unique identifier, typically a {@link import('./common').PredictionId} */
  id: string;
  /** ID of the market this prediction belongs to */
  marketId: string;
  /** Ethereum address of the user who placed the prediction */
  predictor: string;
  /** Amount wagered, in the token's smallest unit (e.g., wei) */
  amount: bigint;
  /** Predicted percentage value (basis-point scale) */
  percentage: bigint;
  /** Unix timestamp (seconds) when the prediction was placed on-chain */
  placedAt: bigint;
  /** Whether the user has claimed winnings or a refund for this prediction */
  claimed: boolean;
  /** EVM chain ID where this prediction exists */
  chainId: number;
  /** Block number in which the prediction transaction was mined */
  blockNumber: bigint;
  /** Transaction hash of the prediction transaction */
  txHash: string;
  /** Unix timestamp (seconds) of the block containing the prediction transaction */
  timestamp: bigint;
}

/**
 * Claim Entity
 * Database representation of a claim (winnings or refund).
 */
export interface ClaimEntity {
  /** Unique identifier, typically a {@link import('./common').TxLogId} */
  id: string;
  /** ID of the market this claim is for */
  marketId: string;
  /** Ethereum address of the user who made the claim */
  claimer: string;
  /** Amount claimed, in the token's smallest unit (e.g., wei) */
  amount: bigint;
  /** Whether this claim is for winnings or a refund */
  claimType: ClaimType;
  /** EVM chain ID where this claim was made */
  chainId: number;
  /** Block number in which the claim transaction was mined */
  blockNumber: bigint;
  /** Transaction hash of the claim transaction */
  txHash: string;
  /** Unix timestamp (seconds) of the block containing the claim transaction */
  timestamp: bigint;
}

/**
 * Oracle Entity
 * Database representation of a registered oracle.
 */
export interface OracleEntity {
  /** Unique identifier, typically a {@link import('./common').ChainPrefixedId} */
  id: string;
  /** On-chain oracle identifier */
  oracleId: string;
  /** Type of oracle (e.g., "Manual", "PriceFeed", "CustomData") */
  oracleType: string;
  /**
   * Address or URL of the oracle's data source.
   * `null` for manual oracles that do not use an external data source.
   */
  dataSource: Optional<string>;
  /** Minimum value the oracle can report */
  minValue: bigint;
  /** Maximum value the oracle can report */
  maxValue: bigint;
  /** EVM chain ID where this oracle is registered */
  chainId: number;
  /** Block number in which the oracle registration transaction was mined */
  blockNumber: bigint;
  /** Transaction hash of the oracle registration transaction */
  txHash: string;
  /** Unix timestamp (seconds) of the block containing the registration transaction */
  timestamp: bigint;
}

/**
 * Dealer NFT Entity
 * Database representation of a dealer license NFT.
 */
export interface DealerNftEntity {
  /** Unique identifier, typically a {@link import('./common').ChainPrefixedId} */
  id: string;
  /** EVM chain ID where this NFT exists */
  chainId: number;
  /** On-chain token ID of the dealer license NFT */
  tokenId: bigint;
  /** Ethereum address of the current NFT owner */
  ownerAddress: string;
  /** Unix timestamp (seconds) when the NFT was minted */
  mintedAt: bigint;
  /** Block number in which the mint transaction was mined */
  mintBlockNumber: bigint;
  /** Transaction hash of the mint transaction */
  mintTransactionHash: string;
  /**
   * Unix timestamp (seconds) of the most recent transfer.
   * `null` if the NFT has never been transferred after minting.
   */
  lastTransferAt: Optional<bigint>;
  /**
   * Block number of the most recent transfer.
   * `null` if the NFT has never been transferred after minting.
   */
  lastTransferBlockNumber: Optional<bigint>;
  /**
   * Transaction hash of the most recent transfer.
   * `null` if the NFT has never been transferred after minting.
   */
  lastTransferTransactionHash: Optional<string>;
}

/**
 * Dealer Permission Entity
 * Database representation of dealer category/subcategory permissions.
 */
export interface DealerPermissionEntity {
  /** Unique identifier combining chain, token, category, and subcategory */
  id: string;
  /** EVM chain ID where this permission exists */
  chainId: number;
  /** Token ID of the dealer license NFT this permission belongs to */
  tokenId: bigint;
  /** Numeric category index the dealer is permitted to operate in */
  category: number;
  /** Numeric sub-category index the dealer is permitted to operate in */
  subCategory: number;
  /** Unix timestamp (seconds) when the permission was granted on-chain */
  grantedAt: bigint;
  /** Block number in which the permission grant transaction was mined */
  blockNumber: bigint;
  /** Transaction hash of the permission grant transaction */
  transactionHash: string;
}

/**
 * Wallet Favorite Entity
 * Database representation of a user's favorite items.
 */
export interface WalletFavoriteEntity {
  /** Auto-incrementing database primary key */
  id: number;
  /** Ethereum address of the wallet that owns this favorite */
  walletAddress: string;
  /** Category of the favorited item (e.g., "sports", "crypto") */
  category: string;
  /** Sub-category of the favorited item (e.g., "football", "bitcoin") */
  subcategory: string;
  /** Type of the favorited item (e.g., "market", "dealer") */
  type: string;
  /** ID of the favorited item */
  itemId: string;
  /** Unix timestamp (seconds) when the favorite was created */
  createdAt: bigint;
}

/**
 * Fee Withdrawal Entity
 * Database representation of fee withdrawals.
 */
export interface FeeWithdrawalEntity {
  /** Unique identifier, typically a {@link import('./common').TxLogId} */
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
  /** Amount withdrawn, in the token's smallest unit (e.g., wei) */
  amount: bigint;
  /** Unix timestamp (seconds) when the withdrawal occurred on-chain */
  withdrawnAt: bigint;
  /** Block number in which the withdrawal transaction was mined */
  blockNumber: bigint;
  /** Transaction hash of the withdrawal transaction */
  transactionHash: string;
}

/**
 * Oracle Request Entity
 * Database representation of oracle resolution requests.
 */
export interface OracleRequestEntity {
  /** Unique identifier */
  id: string;
  /** EVM chain ID where this request was made */
  chainId: number;
  /** ID of the market requesting oracle resolution */
  marketId: string;
  /** On-chain request identifier */
  requestId: string;
  /** Unix timestamp (seconds) when the request was submitted */
  requestedAt: bigint;
  /** Block number in which the request transaction was mined */
  requestBlockNumber: bigint;
  /** Transaction hash of the request transaction */
  requestTransactionHash: string;
  /**
   * Unix timestamp (seconds) when the oracle responded.
   * `null` if the request is still pending.
   */
  respondedAt: Optional<bigint>;
  /**
   * Block number of the oracle's response transaction.
   * `null` if the request is still pending.
   */
  responseBlockNumber: Optional<bigint>;
  /**
   * Transaction hash of the oracle's response transaction.
   * `null` if the request is still pending.
   */
  responseTransactionHash: Optional<string>;
  /**
   * Boolean result of the oracle's determination.
   * `null` if the request is still pending or timed out without a response.
   */
  result: Optional<boolean>;
  /** Whether the request timed out before receiving a response */
  timedOut: boolean;
}

/**
 * Market State History Entity
 * Database representation of market state transitions.
 */
export interface MarketStateHistoryEntity {
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
  /** Unix timestamp (seconds) when the state change occurred on-chain */
  changedAt: bigint;
  /** Block number in which the state change transaction was mined */
  blockNumber: bigint;
  /** Transaction hash of the state change transaction */
  transactionHash: string;
  /**
   * Human-readable reason for the state change.
   * `null` when no reason was provided.
   */
  reason: Optional<string>;
}
