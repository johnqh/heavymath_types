/**
 * Common utility types used throughout the Heavymath application
 */

/**
 * Utility type for values that can be T, undefined, or null
 * Provides a more semantic way to represent optional/nullable values
 */
export type Optional<T> = T | undefined | null;

/**
 * Chain-Prefixed ID
 * Format: "{chainId}-{identifier}"
 * Used for creating unique IDs across multiple chains
 */
export type ChainPrefixedId = `${number}-${string}`;

/**
 * Composite ID for Predictions
 * Format: "{chainId}-{marketId}-{predictorAddress}"
 */
export type PredictionId = `${number}-${string}-${string}`;

/**
 * Transaction-Log ID
 * Format: "{transactionHash}-{logIndex}"
 * Used for unique identification of log entries
 */
export type TxLogId = `${string}-${bigint}`;
