import { describe, it, expect, expectTypeOf } from 'vitest';
import type {
  Optional,
  ChainPrefixedId,
  PredictionId,
  TxLogId,
  ParsedChainPrefixedId,
} from './common';
import {
  isChainPrefixedId,
  isPredictionId,
  isTxLogId,
  parseChainPrefixedId,
} from './common';

describe('common types', () => {
  describe('Optional<T>', () => {
    it('should accept the base type', () => {
      const value: Optional<string> = 'hello';
      expect(value).toBe('hello');
    });

    it('should accept undefined', () => {
      const value: Optional<string> = undefined;
      expect(value).toBeUndefined();
    });

    it('should accept null', () => {
      const value: Optional<string> = null;
      expect(value).toBeNull();
    });

    it('should work with complex types', () => {
      interface User {
        name: string;
        age: number;
      }
      const user: Optional<User> = { name: 'John', age: 30 };
      expect(user).toEqual({ name: 'John', age: 30 });

      const noUser: Optional<User> = null;
      expect(noUser).toBeNull();
    });
  });

  describe('ChainPrefixedId', () => {
    it('should accept valid chain-prefixed ID format', () => {
      const id: ChainPrefixedId = '1-0xabc123';
      expect(id).toBe('1-0xabc123');
    });

    it('should accept different chain IDs', () => {
      const mainnet: ChainPrefixedId = '1-market123';
      const polygon: ChainPrefixedId = '137-market456';
      const arbitrum: ChainPrefixedId = '42161-market789';

      expect(mainnet).toMatch(/^\d+-/);
      expect(polygon).toMatch(/^\d+-/);
      expect(arbitrum).toMatch(/^\d+-/);
    });

    it('should be a template literal type', () => {
      expectTypeOf<ChainPrefixedId>().toMatchTypeOf<`${number}-${string}`>();
    });
  });

  describe('PredictionId', () => {
    it('should accept valid prediction ID format', () => {
      const id: PredictionId = '1-market123-0xuser';
      expect(id).toBe('1-market123-0xuser');
    });

    it('should have three parts separated by dashes', () => {
      const id: PredictionId = '137-abc-def';
      const parts = id.split('-');
      expect(parts.length).toBeGreaterThanOrEqual(3);
    });

    it('should be a template literal type', () => {
      expectTypeOf<PredictionId>().toMatchTypeOf<`${number}-${string}-${string}`>();
    });
  });

  describe('TxLogId', () => {
    it('should accept valid tx-log ID format', () => {
      const id: TxLogId = '0xabc123-5n' as TxLogId;
      expect(id).toContain('-');
    });

    it('should be a template literal type with bigint', () => {
      expectTypeOf<TxLogId>().toMatchTypeOf<`${string}-${bigint}`>();
    });
  });
});

// ============================================================================
// Validation Utilities
// ============================================================================

describe('isChainPrefixedId', () => {
  it('should accept valid chain-prefixed IDs', () => {
    expect(isChainPrefixedId('1-0xabc123')).toBe(true);
    expect(isChainPrefixedId('137-market456')).toBe(true);
    expect(isChainPrefixedId('42161-0xdef789')).toBe(true);
  });

  it('should narrow the type when true', () => {
    const value = '1-0xabc123';
    if (isChainPrefixedId(value)) {
      expectTypeOf(value).toEqualTypeOf<ChainPrefixedId>();
    }
  });

  it('should reject empty strings', () => {
    expect(isChainPrefixedId('')).toBe(false);
  });

  it('should reject strings without a dash', () => {
    expect(isChainPrefixedId('1abc')).toBe(false);
    expect(isChainPrefixedId('nodigits')).toBe(false);
  });

  it('should reject strings that start with a dash', () => {
    expect(isChainPrefixedId('-abc')).toBe(false);
  });

  it('should reject strings with only a number and dash but nothing after', () => {
    // '1-' has a dash at index 1, but the identifier portion is empty,
    // however the regex .* allows empty match after the dash prefix check
    // The pattern is ^\d+-[^-].* which requires at least one non-dash char
    expect(isChainPrefixedId('1-')).toBe(false);
  });
});

describe('isPredictionId', () => {
  it('should accept valid prediction IDs', () => {
    expect(isPredictionId('1-market123-0xuser')).toBe(true);
    expect(isPredictionId('137-abc-def')).toBe(true);
  });

  it('should narrow the type when true', () => {
    const value = '1-market123-0xuser';
    if (isPredictionId(value)) {
      expectTypeOf(value).toEqualTypeOf<PredictionId>();
    }
  });

  it('should reject empty strings', () => {
    expect(isPredictionId('')).toBe(false);
  });

  it('should reject strings with fewer than two dashes', () => {
    expect(isPredictionId('1-market123')).toBe(false);
  });

  it('should reject strings where the chain part is not numeric', () => {
    expect(isPredictionId('abc-market-user')).toBe(false);
  });
});

describe('isTxLogId', () => {
  it('should accept valid tx-log IDs', () => {
    expect(isTxLogId('0xabc123-5')).toBe(true);
    expect(isTxLogId('0xdef-0')).toBe(true);
    expect(isTxLogId('txhash-100')).toBe(true);
  });

  it('should narrow the type when true', () => {
    const value = '0xabc123-5';
    if (isTxLogId(value)) {
      expectTypeOf(value).toEqualTypeOf<TxLogId>();
    }
  });

  it('should reject empty strings', () => {
    expect(isTxLogId('')).toBe(false);
  });

  it('should reject strings without a trailing numeric segment', () => {
    expect(isTxLogId('0xabc123-notanumber')).toBe(false);
    expect(isTxLogId('0xabc123-')).toBe(false);
  });

  it('should reject strings without a dash', () => {
    expect(isTxLogId('0xabc123')).toBe(false);
  });
});

describe('parseChainPrefixedId', () => {
  it('should parse a valid ChainPrefixedId into parts', () => {
    const result: ParsedChainPrefixedId = parseChainPrefixedId('137-0xabc');
    expect(result.chainId).toBe(137);
    expect(result.identifier).toBe('0xabc');
  });

  it('should handle identifiers that contain dashes', () => {
    const result = parseChainPrefixedId('1-market-with-dashes');
    expect(result.chainId).toBe(1);
    expect(result.identifier).toBe('market-with-dashes');
  });

  it('should handle chain ID 0', () => {
    const result = parseChainPrefixedId('0-localnet');
    expect(result.chainId).toBe(0);
    expect(result.identifier).toBe('localnet');
  });

  it('should handle large chain IDs', () => {
    const result = parseChainPrefixedId('42161-somemarket');
    expect(result.chainId).toBe(42161);
    expect(result.identifier).toBe('somemarket');
  });
});
