import { describe, it, expect, expectTypeOf } from 'vitest';
import type { Optional, ChainPrefixedId, PredictionId, TxLogId } from './common';

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
