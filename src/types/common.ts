/**
 * Common utility types used throughout the Heavymath application
 */

/**
 * Utility type for values that can be T, undefined, or null.
 * Provides a more semantic way to represent optional/nullable values.
 */
export type Optional<T> = T | undefined | null;

/**
 * Chain-Prefixed ID.
 * Format: `"{chainId}-{identifier}"` where chainId is a numeric EVM chain ID
 * and identifier is a contract-specific string (e.g., market ID, oracle ID).
 * @example "1-0xabc123" (Ethereum mainnet)
 * @example "137-market456" (Polygon)
 * @example "42161-0xdef789" (Arbitrum)
 */
export type ChainPrefixedId = `${number}-${string}`;

/**
 * Composite ID for Predictions.
 * Format: `"{chainId}-{marketId}-{predictorAddress}"` where chainId is a
 * numeric EVM chain ID, marketId is the on-chain market identifier, and
 * predictorAddress is the user's wallet address.
 * @example "1-market123-0xuser"
 * @example "137-0xabc-0xdef"
 */
export type PredictionId = `${number}-${string}-${string}`;

/**
 * Transaction-Log ID.
 * Format: `"{transactionHash}-{logIndex}"` where transactionHash is the
 * on-chain transaction hash and logIndex is the position of the log entry
 * within the transaction receipt.
 * @example "0xabc123def-0" (first log in a transaction)
 */
export type TxLogId = `${string}-${bigint}`;

// ============================================================================
// Validation Utilities
// ============================================================================

/**
 * Regex pattern for ChainPrefixedId: one or more digits, a dash, then one or more characters.
 */
const CHAIN_PREFIXED_ID_RE = /^\d+-[^-].*/;

/**
 * Regex pattern for PredictionId: digits-string-string with at least two dashes.
 */
const PREDICTION_ID_RE = /^\d+-[^-]+-[^-]+/;

/**
 * Regex pattern for TxLogId: non-empty string, a dash, then a numeric string
 * (bigint serialises to digits, optionally with a leading minus).
 */
const TX_LOG_ID_RE = /^.+-(-?\d+)$/;

/**
 * Type guard that checks whether a string conforms to the {@link ChainPrefixedId}
 * template literal format (`{number}-{string}`).
 *
 * @param value - The string to validate
 * @returns `true` (narrowed to `ChainPrefixedId`) when the value matches
 * @example
 * ```ts
 * if (isChainPrefixedId(input)) {
 *   // input is now typed as ChainPrefixedId
 * }
 * ```
 */
export function isChainPrefixedId(value: string): value is ChainPrefixedId {
  return CHAIN_PREFIXED_ID_RE.test(value);
}

/**
 * Type guard that checks whether a string conforms to the {@link PredictionId}
 * template literal format (`{number}-{string}-{string}`).
 *
 * @param value - The string to validate
 * @returns `true` (narrowed to `PredictionId`) when the value matches
 * @example
 * ```ts
 * if (isPredictionId(input)) {
 *   // input is now typed as PredictionId
 * }
 * ```
 */
export function isPredictionId(value: string): value is PredictionId {
  return PREDICTION_ID_RE.test(value);
}

/**
 * Type guard that checks whether a string conforms to the {@link TxLogId}
 * template literal format (`{string}-{bigint}`).
 *
 * The trailing segment must be a valid integer (the serialised form of a
 * bigint). Empty strings are rejected.
 *
 * @param value - The string to validate
 * @returns `true` (narrowed to `TxLogId`) when the value matches
 * @example
 * ```ts
 * if (isTxLogId(input)) {
 *   // input is now typed as TxLogId
 * }
 * ```
 */
export function isTxLogId(value: string): value is TxLogId {
  return TX_LOG_ID_RE.test(value);
}

/**
 * Parsed result of a {@link ChainPrefixedId}.
 */
export interface ParsedChainPrefixedId {
  /** Numeric EVM chain ID */
  chainId: number;
  /** The identifier portion after the chain prefix */
  identifier: string;
}

/**
 * Parses a {@link ChainPrefixedId} into its constituent parts.
 *
 * @param id - A valid ChainPrefixedId string
 * @returns An object containing the numeric `chainId` and the `identifier`
 * @example
 * ```ts
 * const { chainId, identifier } = parseChainPrefixedId('137-0xabc');
 * // chainId === 137, identifier === '0xabc'
 * ```
 */
export function parseChainPrefixedId(id: ChainPrefixedId): ParsedChainPrefixedId {
  const dashIndex = id.indexOf('-');
  return {
    chainId: Number(id.slice(0, dashIndex)),
    identifier: id.slice(dashIndex + 1),
  };
}
