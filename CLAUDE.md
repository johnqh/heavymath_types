# CLAUDE.md - Heavymath Types

This file provides context for Claude Code when working on this project.

## Project Overview

Zero-dependency TypeScript types package for the Heavymath prediction market platform. Provides shared types used across all other packages.

- **Package**: `@sudobility/heavymath_types`
- **Stack**: TypeScript 5.9, Vitest
- **License**: BUSL-1.1
- **Package manager**: Bun
- **Output**: Dual format (ESM + CommonJS)

## Quick Commands

```bash
bun run build              # Build ESM + CJS to dist/
bun run typecheck          # TypeScript validation
bun run test               # Run all tests (Vitest)
bun run lint               # ESLint check
bun run lint:fix           # ESLint auto-fix
bun run format             # Prettier formatting
bun run verify             # typecheck + lint + build (pre-commit)
```

## Project Structure

```
heavymath_types/
├── src/
│   ├── index.ts               # Main entry (re-exports types/)
│   └── types/
│       ├── index.ts            # Barrel export for all types
│       ├── common.ts           # Optional, ChainPrefixedId, PredictionId, TxLogId
│       ├── common.test.ts
│       ├── entities.ts         # Database entity interfaces (MarketEntity, etc.)
│       ├── entities.test.ts
│       ├── events.ts           # Blockchain event arg types + OracleType const
│       ├── events.test.ts
│       ├── api.ts              # API response data types (MarketData, etc.)
│       └── api.test.ts
├── tsconfig.json               # Base config
├── tsconfig.esm.json           # ESM build
├── tsconfig.cjs.json           # CommonJS build
└── vitest.config.ts
```

## Type Categories

### Common Types (`common.ts`)
- `Optional<T>` - T | undefined | null
- `ChainPrefixedId` - `${number}-${string}` (e.g., "1-0xabc123")
- `PredictionId` - `${number}-${string}-${string}` (e.g., "1-market123-0xuser")
- `TxLogId` - `${string}-${bigint}` (e.g., "0xabc123-5n")

### Entity Types (`entities.ts`)
Database-level types with `bigint` fields:
- `MarketEntity` - Prediction market records
- `PredictionEntity` - User prediction records
- `ClaimEntity` - Winnings/refund claims
- `OracleEntity` - Registered oracles
- `DealerNftEntity` - Dealer license NFTs
- `DealerPermissionEntity` - NFT permissions
- `WalletFavoriteEntity` - User favorites
- `FeeWithdrawalEntity` - Fee withdrawal records
- `OracleRequestEntity` - Oracle request tracking
- `MarketStateHistoryEntity` - State transitions

**Enums**: `MarketStatus` ('Active'|'Cancelled'|'Resolved'|'Abandoned'), `ClaimType` ('winnings'|'refund'), `WithdrawalType` ('dealer'|'system')

### Event Types (`events.ts`)
Blockchain event argument interfaces:
- **PredictionMarket**: MarketCreatedArgs, PredictionPlacedArgs, PredictionUpdatedArgs, MarketResolvedArgs, MarketCancelledArgs, MarketAbandonedArgs, DealerFeeSetArgs, WinningsClaimedArgs, RefundClaimedArgs, DealerFeesWithdrawnArgs, SystemFeesWithdrawnArgs
- **DealerNFT**: LicenseIssuedArgs, PermissionsSetArgs, LicenseTransferredArgs
- **OracleResolver**: OracleRegisteredArgs, OracleDataUpdatedArgs, UpdaterAuthorizedArgs
- **Constants**: `OracleType` { Manual: 0, PriceFeed: 1, CustomData: 2 }
- **Utility types**: `Hex`, `Address`, `BaseEventContext`

### API Types (`api.ts`)
Serialized types for API responses (strings instead of bigints):
- `MarketData`, `PredictionData`, `DealerNftData`, `DealerPermissionData`
- `FeeWithdrawalData`, `OracleRequestData`, `MarketStateHistoryData`
- `MarketStatsData`, `HealthData`, `SSEStatsData`
- `WalletFavoriteData`, `CreateFavoriteRequest`, `PaginationMeta`

## Key Distinction: Entity vs Data Types

- **Entity types** (e.g., `MarketEntity`): Use `bigint` for numeric fields. Used in indexer/database code.
- **Data types** (e.g., `MarketData`): Use `string` for numeric fields. Used in API responses and client code.

## Adding New Types

1. Add to the appropriate file in `src/types/`
2. Export from `src/types/index.ts`
3. Add tests in the corresponding `.test.ts` file
4. Run `bun run verify`

## Consumers

This package is used by:
- `heavymath_indexer` - Entity types for database operations
- `heavymath_indexer_client` - Re-exports Data types for API consumers
- `heavymath_lib` - Business logic type definitions
- `heavymath_app` - Indirect via indexer_client

## CI/CD

Uses `johnqh/workflows/.github/workflows/unified-cicd.yml@main` with NPM publishing (public access).
