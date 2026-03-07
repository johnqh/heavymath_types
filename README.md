# @sudobility/heavymath_types

Zero-dependency TypeScript types for the Heavymath prediction market platform.

## Installation

```bash
bun add @sudobility/heavymath_types
```

## Usage

```typescript
import type {
  MarketEntity, PredictionEntity, ClaimEntity,
  MarketData, PredictionData, DealerNftData,
  MarketStatus, ClaimType, WithdrawalType,
} from '@sudobility/heavymath_types';

import { OracleType } from '@sudobility/heavymath_types';
```

## Types

### Entity Types (`entities.ts`)

Database-level types using `bigint` fields:

- `MarketEntity`, `PredictionEntity`, `ClaimEntity`
- `OracleEntity`, `DealerNftEntity`, `DealerPermissionEntity`
- `WalletFavoriteEntity`, `FeeWithdrawalEntity`, `OracleRequestEntity`
- `MarketStateHistoryEntity`

**Enums:** `MarketStatus` (Active/Cancelled/Resolved/Abandoned), `ClaimType` (winnings/refund), `WithdrawalType` (dealer/system)

### API Types (`api.ts`)

Serialized types for API responses (strings instead of bigints):

- `MarketData`, `PredictionData`, `DealerNftData`, `DealerPermissionData`
- `FeeWithdrawalData`, `OracleRequestData`, `MarketStateHistoryData`
- `MarketStatsData`, `HealthData`, `SSEStatsData`
- `WalletFavoriteData`, `CreateFavoriteRequest`, `PaginationMeta`

### Event Types (`events.ts`)

Blockchain event argument interfaces for PredictionMarket, DealerNFT, and OracleResolver contracts. Includes `OracleType` constant (`Manual: 0`, `PriceFeed: 1`, `CustomData: 2`).

### Common Types (`common.ts`)

- `Optional<T>`, `ChainPrefixedId`, `PredictionId`, `TxLogId`

### Key Distinction

- **Entity types** use `bigint` -- for indexer/database code
- **Data types** use `string` -- for API responses and client code

## Development

```bash
bun run build        # Build ESM + CJS to dist/
bun run test         # Run Vitest
bun run typecheck    # TypeScript validation
bun run lint         # ESLint check
bun run verify       # Typecheck + lint + build
```

## Related Packages

- `@sudobility/heavymath_contracts` -- smart contracts and TypeScript SDK
- `@sudobility/heavymath_indexer_client` -- indexer API client
- `@sudobility/heavymath_lib` -- business logic hooks
- `heavymath_app` -- frontend web application

## License

BUSL-1.1
