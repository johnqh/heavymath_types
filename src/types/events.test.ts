import { describe, it, expect, expectTypeOf } from 'vitest';
import { OracleType } from './events';
import type {
  Hex,
  Address,
  BaseEventContext,
  MarketCreatedArgs,
  PredictionPlacedArgs,
  PredictionUpdatedArgs,
  MarketResolvedArgs,
  MarketCancelledArgs,
  MarketAbandonedArgs,
  DealerFeeSetArgs,
  WinningsClaimedArgs,
  RefundClaimedArgs,
  DealerFeesWithdrawnArgs,
  SystemFeesWithdrawnArgs,
  LicenseIssuedArgs,
  PermissionsSetArgs,
  LicenseTransferredArgs,
  OracleTypeValue,
  OracleRegisteredArgs,
  OracleDataUpdatedArgs,
  UpdaterAuthorizedArgs,
} from './events';

describe('events types', () => {
  describe('Hex type', () => {
    it('should accept valid hex strings', () => {
      const hex: Hex = '0x1234abcd';
      expect(hex).toMatch(/^0x/);
    });

    it('should be a template literal type starting with 0x', () => {
      expectTypeOf<Hex>().toMatchTypeOf<`0x${string}`>();
    });
  });

  describe('Address type', () => {
    it('should accept valid address strings', () => {
      const address: Address = '0x742d35Cc6634C0532925a3b844Bc9e7595f72bDE';
      expect(address).toMatch(/^0x/);
    });

    it('should be a template literal type starting with 0x', () => {
      expectTypeOf<Address>().toMatchTypeOf<`0x${string}`>();
    });
  });

  describe('OracleType', () => {
    it('should have Manual value of 0', () => {
      expect(OracleType.Manual).toBe(0);
    });

    it('should have PriceFeed value of 1', () => {
      expect(OracleType.PriceFeed).toBe(1);
    });

    it('should have CustomData value of 2', () => {
      expect(OracleType.CustomData).toBe(2);
    });

    it('should be a const object', () => {
      expect(Object.keys(OracleType)).toEqual(['Manual', 'PriceFeed', 'CustomData']);
    });
  });

  describe('OracleTypeValue', () => {
    it('should accept valid oracle type values', () => {
      const manual: OracleTypeValue = 0;
      const priceFeed: OracleTypeValue = 1;
      const customData: OracleTypeValue = 2;

      expect([manual, priceFeed, customData]).toEqual([0, 1, 2]);
    });
  });

  describe('BaseEventContext', () => {
    it('should have all required fields', () => {
      const context: BaseEventContext = {
        blockNumber: 12345n,
        blockTimestamp: 1699999999n,
        transactionHash: '0xabc123',
        logIndex: 5n,
        chainId: 1,
      };

      expect(context.blockNumber).toBe(12345n);
      expect(context.blockTimestamp).toBe(1699999999n);
      expect(context.transactionHash).toBe('0xabc123');
      expect(context.logIndex).toBe(5n);
      expect(context.chainId).toBe(1);
    });
  });

  describe('MarketCreatedArgs', () => {
    it('should have all required fields', () => {
      const args: MarketCreatedArgs = {
        marketId: 'market-1',
        dealer: '0xdealer',
        tokenId: 1n,
        category: 1n,
        subCategory: 2n,
        deadline: 1700000000n,
        description: 'Test market',
      };

      expect(args.marketId).toBe('market-1');
      expect(args.dealer).toBe('0xdealer');
      expect(args.tokenId).toBe(1n);
    });
  });

  describe('PredictionPlacedArgs', () => {
    it('should have all required fields', () => {
      const args: PredictionPlacedArgs = {
        marketId: 'market-1',
        predictor: '0xpredictor',
        amount: 1000000n,
        percentage: 5000n,
      };

      expect(args.marketId).toBe('market-1');
      expect(args.amount).toBe(1000000n);
      expect(args.percentage).toBe(5000n);
    });
  });

  describe('PredictionUpdatedArgs', () => {
    it('should have all required fields', () => {
      const args: PredictionUpdatedArgs = {
        marketId: 'market-1',
        predictor: '0xpredictor',
        newAmount: 2000000n,
        newPercentage: 6000n,
      };

      expect(args.newAmount).toBe(2000000n);
      expect(args.newPercentage).toBe(6000n);
    });
  });

  describe('MarketResolvedArgs', () => {
    it('should have all required fields', () => {
      const args: MarketResolvedArgs = {
        marketId: 'market-1',
        resolution: 7500n,
        equilibrium: 5000n,
      };

      expect(args.resolution).toBe(7500n);
      expect(args.equilibrium).toBe(5000n);
    });
  });

  describe('MarketCancelledArgs', () => {
    it('should have marketId field', () => {
      const args: MarketCancelledArgs = {
        marketId: 'market-1',
      };

      expect(args.marketId).toBe('market-1');
    });
  });

  describe('MarketAbandonedArgs', () => {
    it('should have marketId field', () => {
      const args: MarketAbandonedArgs = {
        marketId: 'market-1',
      };

      expect(args.marketId).toBe('market-1');
    });
  });

  describe('DealerFeeSetArgs', () => {
    it('should have marketId and feeBps fields', () => {
      const args: DealerFeeSetArgs = {
        marketId: 'market-1',
        feeBps: 250n,
      };

      expect(args.marketId).toBe('market-1');
      expect(args.feeBps).toBe(250n);
    });
  });

  describe('WinningsClaimedArgs', () => {
    it('should have all required fields', () => {
      const args: WinningsClaimedArgs = {
        marketId: 'market-1',
        predictor: '0xpredictor',
        amount: 1500000n,
      };

      expect(args.amount).toBe(1500000n);
    });
  });

  describe('RefundClaimedArgs', () => {
    it('should have all required fields', () => {
      const args: RefundClaimedArgs = {
        marketId: 'market-1',
        predictor: '0xpredictor',
        amount: 1000000n,
      };

      expect(args.amount).toBe(1000000n);
    });
  });

  describe('DealerFeesWithdrawnArgs', () => {
    it('should have all required fields', () => {
      const args: DealerFeesWithdrawnArgs = {
        marketId: 'market-1',
        dealer: '0xdealer',
        amount: 50000n,
      };

      expect(args.dealer).toBe('0xdealer');
      expect(args.amount).toBe(50000n);
    });
  });

  describe('SystemFeesWithdrawnArgs', () => {
    it('should have recipient and amount fields', () => {
      const args: SystemFeesWithdrawnArgs = {
        recipient: '0xtreasury',
        amount: 100000n,
      };

      expect(args.recipient).toBe('0xtreasury');
      expect(args.amount).toBe(100000n);
    });
  });

  describe('LicenseIssuedArgs', () => {
    it('should have tokenId and dealer fields', () => {
      const args: LicenseIssuedArgs = {
        tokenId: 1n,
        dealer: '0xdealer',
      };

      expect(args.tokenId).toBe(1n);
      expect(args.dealer).toBe('0xdealer');
    });
  });

  describe('PermissionsSetArgs', () => {
    it('should have tokenId, category, and subCategories fields', () => {
      const args: PermissionsSetArgs = {
        tokenId: 1n,
        category: 1n,
        subCategories: [1n, 2n, 3n] as readonly bigint[],
      };

      expect(args.tokenId).toBe(1n);
      expect(args.category).toBe(1n);
      expect(args.subCategories).toEqual([1n, 2n, 3n]);
    });
  });

  describe('LicenseTransferredArgs', () => {
    it('should have tokenId, from, and to fields', () => {
      const args: LicenseTransferredArgs = {
        tokenId: 1n,
        from: '0xfrom',
        to: '0xto',
      };

      expect(args.from).toBe('0xfrom');
      expect(args.to).toBe('0xto');
    });
  });

  describe('OracleRegisteredArgs', () => {
    it('should have all required fields', () => {
      const args: OracleRegisteredArgs = {
        oracleId: 'oracle-1',
        oracleType: 1,
        dataSource: '0xdatasource',
        minValue: 0n,
        maxValue: 10000n,
      };

      expect(args.oracleId).toBe('oracle-1');
      expect(args.oracleType).toBe(1);
    });
  });

  describe('OracleDataUpdatedArgs', () => {
    it('should have all required fields', () => {
      const args: OracleDataUpdatedArgs = {
        oracleId: 'oracle-1',
        value: 5000n,
        percentage: 50n,
      };

      expect(args.value).toBe(5000n);
      expect(args.percentage).toBe(50n);
    });
  });

  describe('UpdaterAuthorizedArgs', () => {
    it('should have updater and authorized fields', () => {
      const args: UpdaterAuthorizedArgs = {
        updater: '0xupdater',
        authorized: true,
      };

      expect(args.updater).toBe('0xupdater');
      expect(args.authorized).toBe(true);
    });
  });
});
