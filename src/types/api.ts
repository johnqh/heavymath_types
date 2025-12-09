/**
 * @fileoverview API Type Definitions for Heavymath Indexer
 * @description Centralized type definitions for API requests/responses
 * @version 1.0.0
 *
 * Note: API responses use ApiResponse from @sudobility/types
 * This file defines the data payload types used within those responses
 */

import { Optional } from './common';
import {
  MarketStatus,
  WithdrawalType,
  WalletFavoriteEntity,
} from './entities';

// ============================================================================
// API Data Types (used as payload in ApiResponse<T>)
// ============================================================================

/**
 * Market data returned by API endpoints
 */
export interface MarketData {
  id: string;
  chainId: number;
  marketId: string;
  dealerNftTokenId: string;
  dealerAddress: string;
  title: string;
  description: Optional<string>;
  category: string;
  status: MarketStatus;
  outcome: Optional<string>;
  createdAt: string;
  resolvedAt: Optional<string>;
  blockNumber: string;
  transactionHash: string;
}

/**
 * Prediction data returned by API endpoints
 */
export interface PredictionData {
  id: string;
  chainId: number;
  marketId: string;
  userAddress: string;
  amount: string;
  percentage: number;
  outcome: string;
  hasClaimed: boolean;
  claimedAmount: Optional<string>;
  createdAt: string;
  updatedAt: string;
  lastBlockNumber: string;
  lastTransactionHash: string;
}

/**
 * Dealer NFT data returned by API endpoints
 */
export interface DealerNftData {
  id: string;
  chainId: number;
  tokenId: string;
  ownerAddress: string;
  mintedAt: string;
  mintBlockNumber: string;
  mintTransactionHash: string;
  lastTransferAt: Optional<string>;
  lastTransferBlockNumber: Optional<string>;
  lastTransferTransactionHash: Optional<string>;
}

/**
 * Dealer permission data returned by API endpoints
 */
export interface DealerPermissionData {
  id: string;
  chainId: number;
  tokenId: string;
  category: number;
  subCategory: number;
  grantedAt: string;
  blockNumber: string;
  transactionHash: string;
}

/**
 * Fee withdrawal data returned by API endpoints
 */
export interface FeeWithdrawalData {
  id: string;
  chainId: number;
  marketId: Optional<string>;
  withdrawerAddress: string;
  withdrawalType: WithdrawalType;
  amount: string;
  withdrawnAt: string;
  blockNumber: string;
  transactionHash: string;
}

/**
 * Oracle request data returned by API endpoints
 */
export interface OracleRequestData {
  id: string;
  chainId: number;
  marketId: string;
  requestId: string;
  requestedAt: string;
  requestBlockNumber: string;
  requestTransactionHash: string;
  respondedAt: Optional<string>;
  responseBlockNumber: Optional<string>;
  responseTransactionHash: Optional<string>;
  result: Optional<boolean>;
  timedOut: boolean;
}

/**
 * Market state history data returned by API endpoints
 */
export interface MarketStateHistoryData {
  id: string;
  chainId: number;
  marketId: string;
  fromState: Optional<string>;
  toState: string;
  changedAt: string;
  blockNumber: string;
  transactionHash: string;
  reason: Optional<string>;
}

/**
 * Market statistics data returned by API endpoints
 */
export interface MarketStatsData {
  total: number;
  byStatus: Record<string, number>;
  byCategory: Record<string, number>;
}

/**
 * Health check data returned by API endpoints
 */
export interface HealthData {
  status: 'healthy' | 'unhealthy';
  timestamp: number;
}

/**
 * SSE connection statistics data
 */
export interface SSEStatsData {
  clients: number;
  subscriptions: number;
}

/**
 * Wallet favorite data (same as entity for API use)
 */
export type WalletFavoriteData = WalletFavoriteEntity;

// ============================================================================
// API Request Types
// ============================================================================

/**
 * Request body for creating a wallet favorite
 */
export interface CreateFavoriteRequest {
  category: string;
  subcategory: string;
  type: string;
  id: string;
}

// ============================================================================
// Paginated Response Types
// ============================================================================

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  count: number;
  limit: number;
  offset: number;
}
