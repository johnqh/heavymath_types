/**
 * @fileoverview Database Entity Type Definitions
 * @description Centralized type definitions for all database entities
 * @version 1.0.0
 */

import { Optional } from './common';

// ============================================================================
// Enums and Constants
// ============================================================================

/**
 * Market Status Enum
 * Possible states of a prediction market
 */
export type MarketStatus = 'Active' | 'Cancelled' | 'Resolved' | 'Abandoned';

/**
 * Claim Type Enum
 * Types of claims that can be made
 */
export type ClaimType = 'winnings' | 'refund';

/**
 * Withdrawal Type Enum
 * Types of fee withdrawals
 */
export type WithdrawalType = 'dealer' | 'system';

// ============================================================================
// Database Entity Types
// ============================================================================

/**
 * Market Entity
 * Database representation of a prediction market
 */
export interface MarketEntity {
  id: string;
  dealer: string;
  tokenId: bigint;
  category: bigint;
  subCategory: bigint;
  deadline: bigint;
  description: string;
  createdAt: bigint;
  dealerFeeBps: bigint;
  status: MarketStatus;
  resolution: Optional<bigint>;
  equilibrium: Optional<bigint>;
  oracleId: Optional<string>;
  chainId: number;
  blockNumber: bigint;
  txHash: string;
  timestamp: bigint;
}

/**
 * Prediction Entity
 * Database representation of a user's prediction
 */
export interface PredictionEntity {
  id: string;
  marketId: string;
  predictor: string;
  amount: bigint;
  percentage: bigint;
  placedAt: bigint;
  claimed: boolean;
  chainId: number;
  blockNumber: bigint;
  txHash: string;
  timestamp: bigint;
}

/**
 * Claim Entity
 * Database representation of a claim (winnings or refund)
 */
export interface ClaimEntity {
  id: string;
  marketId: string;
  claimer: string;
  amount: bigint;
  claimType: ClaimType;
  chainId: number;
  blockNumber: bigint;
  txHash: string;
  timestamp: bigint;
}

/**
 * Oracle Entity
 * Database representation of an oracle
 */
export interface OracleEntity {
  id: string;
  oracleId: string;
  oracleType: string;
  dataSource: Optional<string>;
  minValue: bigint;
  maxValue: bigint;
  chainId: number;
  blockNumber: bigint;
  txHash: string;
  timestamp: bigint;
}

/**
 * Dealer NFT Entity
 * Database representation of a dealer license NFT
 */
export interface DealerNftEntity {
  id: string;
  chainId: number;
  tokenId: bigint;
  ownerAddress: string;
  mintedAt: bigint;
  mintBlockNumber: bigint;
  mintTransactionHash: string;
  lastTransferAt: Optional<bigint>;
  lastTransferBlockNumber: Optional<bigint>;
  lastTransferTransactionHash: Optional<string>;
}

/**
 * Dealer Permission Entity
 * Database representation of dealer category/subcategory permissions
 */
export interface DealerPermissionEntity {
  id: string;
  chainId: number;
  tokenId: bigint;
  category: number;
  subCategory: number;
  grantedAt: bigint;
  blockNumber: bigint;
  transactionHash: string;
}

/**
 * Wallet Favorite Entity
 * Database representation of a user's favorite items
 */
export interface WalletFavoriteEntity {
  id: number;
  walletAddress: string;
  category: string;
  subcategory: string;
  type: string;
  itemId: string;
  createdAt: bigint;
}

/**
 * Fee Withdrawal Entity
 * Database representation of fee withdrawals
 */
export interface FeeWithdrawalEntity {
  id: string;
  chainId: number;
  marketId: Optional<string>;
  withdrawerAddress: string;
  withdrawalType: WithdrawalType;
  amount: bigint;
  withdrawnAt: bigint;
  blockNumber: bigint;
  transactionHash: string;
}

/**
 * Oracle Request Entity
 * Database representation of oracle requests
 */
export interface OracleRequestEntity {
  id: string;
  chainId: number;
  marketId: string;
  requestId: string;
  requestedAt: bigint;
  requestBlockNumber: bigint;
  requestTransactionHash: string;
  respondedAt: Optional<bigint>;
  responseBlockNumber: Optional<bigint>;
  responseTransactionHash: Optional<string>;
  result: Optional<boolean>;
  timedOut: boolean;
}

/**
 * Market State History Entity
 * Database representation of market state transitions
 */
export interface MarketStateHistoryEntity {
  id: string;
  chainId: number;
  marketId: string;
  fromState: Optional<string>;
  toState: string;
  changedAt: bigint;
  blockNumber: bigint;
  transactionHash: string;
  reason: Optional<string>;
}
