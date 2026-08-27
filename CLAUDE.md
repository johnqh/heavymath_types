# CLAUDE.md - Heavymath Types

> **Git policy — never auto-commit or auto-push.** Leave your work in the working tree.
> Run `git commit`, `git push`, `gh pr create`, or `scripts/push_all.sh` **only when the user
> explicitly asks in that turn**. Approval for an earlier change does not carry forward, and
> finishing a task is not permission to commit it.

This file provides context for Claude Code when working on this project.

## Project Overview

Zero-dependency TypeScript types package for the Heavymath prediction market platform. Provides shared types used across all other packages.

- **Package**: `@sudobility/heavymath_types` (v0.0.31)
- **Stack**: TypeScript 5.9, Vitest 4.0
- **License**: BUSL-1.1
- **Package manager**: Bun
- **Output**: ESM only (`tsc -p tsconfig.esm.json` -> `dist/`)
- **Optional peer dependency**: `viem` ^2.0.0 (for `Hex` and `Address` types in events.ts)

## Commands

```bash
bun run build          # Build ESM to dist/ (tsc -p tsconfig.esm.json)
bun run clean          # Remove dist/
bun run dev            # Watch mode (TypeScript recompilation on change)
bun run typecheck      # TypeScript validation (--noEmit)
bun run test           # Run all tests (Vitest, single run)
bun run test:watch     # Run tests in watch mode (Vitest)
bun run lint           # ESLint check
bun run lint:fix       # ESLint auto-fix
bun run format         # Prettier formatting (write)
bun run format:check   # Prettier check (no write)
bun run verify         # typecheck + lint + build (pre-commit)
bun run prepublishOnly # clean + verify
```

## Project Structure

```
heavymath_types/
├── src/
│   ├── index.ts               # Main entry (re-exports types/)
│   └── types/
│       ├── index.ts            # Barrel export for all types
│       ├── common.ts           # Optional<T>, ChainPrefixedId, PredictionId, TxLogId + validators
│       ├── entities.ts         # Database entity interfaces (MarketEntity, etc.) with bigint fields
│       ├── events.ts           # Blockchain event arg types + OracleType const
│       ├── api.ts              # API response types (string fields for JSON serialization)
│       ├── condition.ts        # Market condition encoding (WinLoss, MatchScore, Tournament)
│       ├── sports.ts           # Sports metadata for 10 sports (leagues, seasons, search)
│       ├── game-status.ts      # Game status codes + state classifiers for all sports
│       ├── discussion.ts       # Discussion/comment entities + SIWE auth types
│       ├── datetime.ts         # getCurrentDatetime() utility
│       └── *.test.ts           # Co-located test files
├── dist/                       # Build output (ESM .js + .d.ts declarations)
├── tsconfig.json               # Base config
├── tsconfig.esm.json           # ESM build config (outputs to dist/)
├── eslint.config.mjs           # Flat ESLint config
├── .prettierrc                 # Prettier config
└── vitest.config.ts            # Vitest config (node environment)
```

## Build Output

The `dist/` directory contains ESM `.js` files and `.d.ts` declaration files. Package exports ESM only:

```json
{ ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" } }
```

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
- Validators: `isChainPrefixedId()`, `isPredictionId()`, `isTxLogId()`, `parseChainPrefixedId()`

### Entity Types (`entities.ts`)
Database-level types with `bigint` fields:
- `MarketEntity`, `PredictionEntity`, `ClaimEntity`, `OracleEntity`
- `DealerNftEntity`, `DealerPermissionEntity`, `WalletFavoriteEntity`
- `FeeWithdrawalEntity`, `OracleRequestEntity`, `MarketStateHistoryEntity`
- **Enums**: `MarketStatus` ('Active'|'Cancelled'|'Resolved'|'Abandoned'), `ClaimType` ('winnings'|'refund'), `WithdrawalType` ('dealer'|'system')
- Runtime const arrays + type guards: `MarketStatusValues`, `isMarketStatus()`, etc.

### Event Types (`events.ts`)
Blockchain event argument interfaces:
- **PredictionMarket**: MarketCreatedArgs, PredictionPlacedArgs, PredictionUpdatedArgs, MarketResolvedArgs, MarketCancelledArgs, MarketAbandonedArgs, DealerFeeSetArgs, WinningsClaimedArgs, RefundClaimedArgs, DealerFeesWithdrawnArgs, SystemFeesWithdrawnArgs
- **DealerNFT**: LicenseIssuedArgs, PermissionsSetArgs, LicenseTransferredArgs
- **OracleResolver**: OracleRegisteredArgs, OracleDataUpdatedArgs, UpdaterAuthorizedArgs
- **Constants**: `OracleType` { Manual: 0, PriceFeed: 1, CustomData: 2 }
- **Utility types**: `Hex`, `Address`, `BaseEventContext`

### API Types (`api.ts`)
Serialized types for API responses (strings instead of bigints):
- `MarketData`, `PredictionData`, `DealerNftData`, `DealerLicenseData`, `DealerPermissionData`
- `FeeWithdrawalData`, `OracleRequestData`, `MarketStateHistoryData`
- `MarketStatsData`, `MarketDetailStatsData`, `MarketDetailData`, `MarketResolutionData`
- `HealthData`, `SportsHealthData`, `ServiceHealthData`, `SSEStatsData`, `ApiInfoData`
- `WalletFavoriteData`, `CreateFavoriteRequest`, `FavoriteCountsFilters`, `PaginationMeta`
- `WalletBalanceSummaryData`, `WalletBalanceDetailData`, `WalletTransactionData`, `WalletHistoryItemData`
- `DealerWithPermissionsData`, `DealerStatsData`, `CategoryCountData`
- `SetMarketOracleConfigRequest`, `MarketOracleConfigData`
- `MarketResolutionCheckSuccess`, `MarketResolutionCheckError`
- `TriggerLockResponseData`, `TriggerResolveResponseData`
- `StadiumData` (World Cup 2026 venue data)

### Condition Types (`condition.ts`)
Market condition encoding/decoding with bytes32 layout:
- **Condition types**: `WinLossCondition`, `MatchScoreCondition`, `TournamentCondition`
- **Enums**: `ConditionType` (WinLoss=1, MatchScore=2, Tournament=3), `ScoreType`, `TeamSide`, `ComparisonOperator`
- **Utilities**: `encodeConditionData()`, `decodeConditionData()`, `formatConditionDescription()`

### Sports Types (`sports.ts`)
Metadata for 10 sports (football, basketball, hockey, baseball, NFL, rugby, handball, volleyball, F1, MMA):
- `SportName` type, `SportsApiResponse`, `SportsQueryParams`
- Per-sport league/season/country types (e.g., `FootballLeague`, `FootballSeason`, `BasketballLeague`)
- Per-sport league/season query param types
- `SearchTeamResult`, `SportsSearchResponse`

### Game Status Types (`game-status.ts`)
Status codes and state classifiers for all 10 sports:
- `GameState` type: 'not_started' | 'in_progress' | 'finished' | 'cancelled' | 'unknown'
- Per-sport status code types and const objects (e.g., `FootballStatus`, `BasketballStatus`)
- Per-sport state classifier functions (e.g., `footballGameState()`, `basketballGameState()`)
- `isGameStarted()` utility predicate

### Discussion Types (`discussion.ts`)
Discussion/comment system with SIWE (Sign-In with Ethereum) auth:
- `DiscussionEntity`, `DiscussionCommentEntity` (database types)
- `DiscussionData`, `CommentData` (API response types)
- `PostCommentRequest`, `ModerateCommentRequest`
- `AuthNonceResponse`, `AuthVerifyRequest`, `AuthVerifyResponse`
- `SubjectType`, `ModerationStatus` with runtime values and type guards

### Datetime Utility (`datetime.ts`)
- `getCurrentDatetime()` - returns current date/time string

## Key Distinction: Entity vs Data Types

- **Entity types** (e.g., `MarketEntity`): Use `bigint` for numeric fields. Used in indexer/database code.
- **Data types** (e.g., `MarketData`): Use `string` for numeric fields. Used in API responses and client code.

## ESLint and Prettier Settings

- **ESLint**: Flat config (`eslint.config.mjs`) with `@typescript-eslint` recommended rules; `no-unused-vars` ignores `_`-prefixed args; `no-explicit-any` is a warning; `no-empty-object-type` is disabled
- **Prettier**: Semi, trailing commas (es5), single quotes, 80 char width, 2-space indent

## Common Pitfalls

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
- `heavymath_contracts` - Contract type definitions
- `heavymath_ui` - UI component type definitions
- `heavymath_app` - Indirect via indexer_client
- `wcprediction_app` - Indirect via indexer_client

## CI/CD

Uses `johnqh/workflows/.github/workflows/unified-cicd.yml@main` with NPM publishing (public access).

## Git Workflow

- Do not use feature branches for code changes. Always stay on the current branch.
