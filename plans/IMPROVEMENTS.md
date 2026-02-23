# Improvement Plans for @sudobility/heavymath_types

## Priority 1 - High Impact

### 1. Add JSDoc to All Entity and API Interfaces' Fields
- Currently, entity interfaces (e.g., `MarketEntity`, `PredictionEntity`) and API types (e.g., `MarketData`, `PredictionData`) have top-level doc comments but no field-level JSDoc.
- Fields like `dealerFeeBps`, `equilibrium`, `resolution`, `oracleId`, `claimType`, and `chainId` carry domain-specific meaning that is not self-evident from the name alone.
- Adding `@description`, `@example`, and `@remarks` annotations per field would improve IntelliSense for all downstream consumers (`heavymath_indexer`, `heavymath_indexer_client`, `heavymath_lib`, `heavymath_app`).
- Special attention to: numeric ranges (e.g., `dealerFeeBps` is 10-200), format strings (e.g., `ChainPrefixedId` pattern), and nullable semantics (e.g., `resolution` is null when market is active).

### 2. Add Validation Utilities Alongside Template Literal Types
- `ChainPrefixedId`, `PredictionId`, and `TxLogId` are template literal types that provide compile-time safety but no runtime validation.
- Consumers that receive these IDs from API responses or user input currently have no way to validate them at runtime without writing their own regex.
- Adding type guard functions (e.g., `isChainPrefixedId(value: string): value is ChainPrefixedId`) and parser functions (e.g., `parseChainPrefixedId(id: ChainPrefixedId): { chainId: number; identifier: string }`) would reduce duplicated validation code across the ecosystem.
- This would remain zero-dependency since these are pure string operations.

### 3. Strengthen Type Safety for the Entity-to-Data Type Mapping
- The relationship between Entity types (with `bigint` fields) and Data types (with `string` fields) is documented in CLAUDE.md but not enforced in code.
- There is no utility type or mapped type that ensures `MarketData` has the same fields as `MarketEntity` with appropriate type transformations.
- A mapped type like `EntityToData<T>` that converts `bigint` to `string`, preserves `string`/`number`/`boolean`, and handles `Optional<bigint>` to `Optional<string>` would catch drift between entities and API types at compile time.
- Currently `MarketEntity` and `MarketData` have different field names (e.g., `dealer` vs `dealerAddress`, `tokenId` vs `dealerNftTokenId`), which means this would also serve to document intentional divergences.

## Priority 2 - Medium Impact

### 3. Expand Test Coverage Beyond Type Assignability Checks
- Existing tests (in `common.test.ts`, `entities.test.ts`, `events.test.ts`, `api.test.ts`) are primarily compile-time type assignability tests using `expectTypeOf`.
- These tests verify that types accept valid values but do not test edge cases: empty strings for `ChainPrefixedId`, boundary values for enum-like types, or that the `OracleType` const object has the expected keys and values.
- Adding runtime tests for the `OracleType` const (the only runtime export) would improve confidence: verifying its keys, values, and that `OracleTypeValue` matches.
- Consider adding tests for any future validation/parser utilities.

### 4. Add Branded Types for Stronger Type Discrimination
- `MarketEntity.id` and `PredictionEntity.id` are both plain `string` types, making it easy to accidentally pass a market ID where a prediction ID is expected.
- Fields like `dealer`, `predictor`, `claimer`, `ownerAddress`, and `withdrawerAddress` are all `string` but represent Ethereum addresses.
- Using branded types (e.g., `type MarketId = string & { readonly __brand: 'MarketId' }`) or leveraging the existing template literal types more consistently would provide compile-time safeguards.
- The `Address` type in `events.ts` already uses a template literal (`0x${string}`) but entity types use plain `string` for address fields.

### 5. Document and Enforce the Enum String Literal Pattern
- `MarketStatus`, `ClaimType`, and `WithdrawalType` are string literal union types, not TypeScript `enum`s.
- There are no corresponding runtime const objects (like `OracleType` has) that would allow runtime validation or iteration.
- Adding `const MarketStatusValues = ['Active', 'Cancelled', 'Resolved', 'Abandoned'] as const` and deriving the type from it would provide both compile-time and runtime guarantees.
- This pattern is already partially used with `OracleType` but inconsistently applied across the package.

## Priority 3 - Nice to Have

### 6. Add Changelog and Version Tracking
- The `entities.ts` file header says `@version 1.0.0` while the package itself is at a different version.
- There is no CHANGELOG.md or automated version tracking that helps consumers understand what changed between releases.
- Version comments in individual files should either be removed (to avoid staleness) or synchronized with the package version automatically.

### 7. Consolidate the `Hex` and `Address` Type Strategy
- `events.ts` defines its own `Hex` and `Address` types as fallbacks when `viem` is not installed, but these are identical template literal types (`0x${string}`).
- The CLAUDE.md notes that when viem is not installed, these types become `any`, but the current code defines them locally rather than importing from viem.
- This creates a subtle inconsistency: the locally defined types are always available (not `any`), contradicting the documentation.
- Clarifying the strategy (always use local definitions, or conditionally import from viem) and updating documentation to match would reduce confusion.

### 8. Add `@since` Tags and Deprecation Strategy
- As the package evolves, new types will be added and old ones may be superseded.
- Currently there is no `@since` tagging to indicate when a type was introduced.
- Adding `@since 0.0.x` annotations to each exported type would help consumers know which minimum version they need.
- Consider adding `@deprecated` annotations proactively for any types that are planned for removal.
