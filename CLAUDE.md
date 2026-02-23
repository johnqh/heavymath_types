# CLAUDE.md - Heavymath Types

This file provides context for Claude Code when working on this project.

## Project Overview

Zero-dependency TypeScript types package for the Heavymath prediction market platform. Provides shared types used across all other packages.

- **Package**: `@sudobility/heavymath_types`
- **Stack**: TypeScript 5.9, Vitest
- **License**: BUSL-1.1
- **Package manager**: Bun
- **Output**: Dual format (ESM + CommonJS)
- **Optional peer dependency**: `viem` ^2.0.0 (for `Hex` and `Address` types in events.ts)

## Quick Commands

```bash
bun run build              # Build ESM + CJS to dist/
bun run build:esm          # Build ESM only
bun run build:cjs          # Build CJS only (uses dist-cjs/ temp dir, then copies to dist/)
bun run clean              # Remove dist/ directory
bun run dev                # Watch mode (TypeScript recompilation on change)
bun run typecheck          # TypeScript validation (--noEmit)
bun run test               # Run all tests (Vitest, single run)
bun run test:watch         # Run tests in watch mode (Vitest)
bun run lint               # ESLint check
bun run lint:fix           # ESLint auto-fix
bun run format             # Prettier formatting (write)
bun run format:check       # Prettier check (no write)
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
├── dist/                       # Build output
│   ├── index.js                # ESM entry
│   ├── index.d.ts              # Type declarations
│   ├── index.cjs               # CommonJS entry
│   └── types/                  # ESM compiled types
│       ├── index.js
│       ├── index.d.ts
│       ├── common.js / .d.ts
│       ├── entities.js / .d.ts
│       ├── events.js / .d.ts
│       └── api.js / .d.ts
├── tsconfig.json               # Base config
├── tsconfig.esm.json           # ESM build (outputs to dist/)
├── tsconfig.cjs.json           # CommonJS build (outputs to dist-cjs/, renamed to .cjs)
├── eslint.config.mjs           # Flat ESLint config
├── .prettierrc                 # Prettier config
└── vitest.config.ts            # Vitest config (node environment)
```

## Build Output Structure

The `dist/` directory contains:
- **ESM**: `.js` files built from `tsconfig.esm.json` directly into `dist/`
- **CJS**: `.cjs` files built from `tsconfig.cjs.json` into a temporary `dist-cjs/` directory, then copied/renamed into `dist/` and the temp directory removed
- **Types**: `.d.ts` declaration files alongside the ESM output

Package exports: `"import"` resolves to `./dist/index.js`, `"require"` resolves to `./dist/index.cjs`, types resolve to `./dist/index.d.ts`.

## Development Workflow

1. Run `bun run dev` for watch mode during development
2. Write tests in co-located `.test.ts` files
3. Use `bun run test:watch` for TDD
4. Run `bun run verify` before committing (runs typecheck + lint + build)

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

## ESLint and Prettier Settings

- **ESLint**: Flat config (`eslint.config.mjs`) with `@typescript-eslint` recommended rules; `no-unused-vars` ignores `_`-prefixed args; `no-explicit-any` is a warning; `no-empty-object-type` is disabled
- **Prettier**: Semi, trailing commas (es5), single quotes, 80 char width, 2-space indent

## Common Pitfalls

- **CJS build temp directory**: The CJS build uses a temporary `dist-cjs/` directory. If a build is interrupted, this directory may remain and should be cleaned with `bun run clean` followed by `rm -rf dist-cjs`.
- **Test type references**: Test files import from the source, not from `dist/`. Vitest is configured to only include `src/**/*.test.ts`.
- **viem peer dependency**: The `Hex` and `Address` types used in `events.ts` are locally defined as `0x${string}` template literal types, so they are always available with full type safety regardless of whether the optional `viem` peer dependency is installed. When `viem` is present, these local definitions are structurally compatible with `viem`'s own `Hex` and `Address` types.

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
