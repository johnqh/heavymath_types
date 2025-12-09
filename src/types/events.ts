/**
 * @fileoverview Type Definitions for Blockchain Events
 * @description Centralized type definitions for all contract events and their arguments
 * @version 1.0.0
 *
 * This file provides comprehensive type safety for all event handlers,
 * making it easier for AI assistants to understand event structures and
 * provide accurate code suggestions.
 */

/**
 * Hex string type (for use when viem is not available)
 */
export type Hex = `0x${string}`;

/**
 * Address type (for use when viem is not available)
 */
export type Address = `0x${string}`;

/**
 * Base Event Context
 * Common fields available in all events
 */
export interface BaseEventContext {
  blockNumber: bigint;
  blockTimestamp: bigint;
  transactionHash: Hex;
  logIndex: bigint;
  chainId: number;
}

// ============================================================================
// PredictionMarket Event Types
// ============================================================================

/**
 * MarketCreated Event Arguments
 * Emitted when a new prediction market is created
 */
export interface MarketCreatedArgs {
  marketId: string;
  dealer: Address;
  tokenId: bigint;
  category: bigint;
  subCategory: bigint;
  deadline: bigint;
  description: string;
}

/**
 * PredictionPlaced Event Arguments
 * Emitted when a user places a prediction on a market
 */
export interface PredictionPlacedArgs {
  marketId: string;
  predictor: Address;
  amount: bigint;
  percentage: bigint;
}

/**
 * PredictionUpdated Event Arguments
 * Emitted when a user updates their prediction within the grace period
 */
export interface PredictionUpdatedArgs {
  marketId: string;
  predictor: Address;
  newAmount: bigint;
  newPercentage: bigint;
}

/**
 * MarketResolved Event Arguments
 * Emitted when a market is resolved with a final outcome
 */
export interface MarketResolvedArgs {
  marketId: string;
  resolution: bigint;
  equilibrium: bigint;
}

/**
 * MarketCancelled Event Arguments
 * Emitted when a market is cancelled before resolution
 */
export interface MarketCancelledArgs {
  marketId: string;
}

/**
 * MarketAbandoned Event Arguments
 * Emitted when a market is abandoned due to no resolution
 */
export interface MarketAbandonedArgs {
  marketId: string;
}

/**
 * DealerFeeSet Event Arguments
 * Emitted when a dealer updates their fee for a market
 */
export interface DealerFeeSetArgs {
  marketId: string;
  feeBps: bigint;
}

/**
 * WinningsClaimed Event Arguments
 * Emitted when a winner claims their payout
 */
export interface WinningsClaimedArgs {
  marketId: string;
  predictor: Address;
  amount: bigint;
}

/**
 * RefundClaimed Event Arguments
 * Emitted when a user claims a refund from a cancelled/abandoned market
 */
export interface RefundClaimedArgs {
  marketId: string;
  predictor: Address;
  amount: bigint;
}

/**
 * DealerFeesWithdrawn Event Arguments
 * Emitted when a dealer withdraws accumulated fees
 */
export interface DealerFeesWithdrawnArgs {
  marketId: string;
  dealer: Address;
  amount: bigint;
}

/**
 * SystemFeesWithdrawn Event Arguments
 * Emitted when system fees are withdrawn to treasury
 */
export interface SystemFeesWithdrawnArgs {
  recipient: Address;
  amount: bigint;
}

// ============================================================================
// DealerNFT Event Types
// ============================================================================

/**
 * LicenseIssued Event Arguments
 * Emitted when a new dealer license NFT is minted
 */
export interface LicenseIssuedArgs {
  tokenId: bigint;
  dealer: Address;
}

/**
 * PermissionsSet Event Arguments
 * Emitted when permissions are set for a dealer license
 */
export interface PermissionsSetArgs {
  tokenId: bigint;
  category: bigint;
  subCategories: readonly bigint[];
}

/**
 * LicenseTransferred Event Arguments
 * Emitted when a dealer license is transferred
 */
export interface LicenseTransferredArgs {
  tokenId: bigint;
  from: Address;
  to: Address;
}

// ============================================================================
// OracleResolver Event Types
// ============================================================================

/**
 * Oracle Type Enum
 * Types of oracles supported by the system
 */
export const OracleType = {
  Manual: 0,
  PriceFeed: 1,
  CustomData: 2,
} as const;

export type OracleTypeValue = (typeof OracleType)[keyof typeof OracleType];

/**
 * OracleRegistered Event Arguments
 * Emitted when a new oracle is registered
 */
export interface OracleRegisteredArgs {
  oracleId: string;
  oracleType: number; // Enum: 0=Manual, 1=PriceFeed, 2=CustomData
  dataSource: Address;
  minValue: bigint;
  maxValue: bigint;
}

/**
 * OracleDataUpdated Event Arguments
 * Emitted when oracle data is updated
 */
export interface OracleDataUpdatedArgs {
  oracleId: string;
  value: bigint;
  percentage: bigint;
}

/**
 * UpdaterAuthorized Event Arguments
 * Emitted when an oracle updater's authorization changes
 */
export interface UpdaterAuthorizedArgs {
  updater: Address;
  authorized: boolean;
}
