import { describe, it, expect } from 'vitest';
import {
  MarketStatusValues,
  ClaimTypeValues,
  WithdrawalTypeValues,
  isMarketStatus,
  isClaimType,
  isWithdrawalType,
} from './entities';
import type {
  MarketStatus,
  ClaimType,
  WithdrawalType,
  MarketEntity,
  PredictionEntity,
  ClaimEntity,
  OracleEntity,
  DealerNftEntity,
  DealerPermissionEntity,
  WalletFavoriteEntity,
  FeeWithdrawalEntity,
  OracleRequestEntity,
  MarketStateHistoryEntity,
} from './entities';

// ============================================================================
// Runtime Const Arrays
// ============================================================================

describe('MarketStatusValues', () => {
  it('should contain all four market statuses', () => {
    expect(MarketStatusValues).toEqual([
      'Active',
      'Cancelled',
      'Resolved',
      'Abandoned',
    ]);
  });

  it('should have length 4', () => {
    expect(MarketStatusValues).toHaveLength(4);
  });

  it('should be a readonly tuple (as const provides compile-time immutability)', () => {
    // as const ensures TypeScript treats this as a readonly tuple
    // Verify the values are correct at runtime
    expect(MarketStatusValues[0]).toBe('Active');
    expect(MarketStatusValues[3]).toBe('Abandoned');
  });
});

describe('ClaimTypeValues', () => {
  it('should contain all claim types', () => {
    expect(ClaimTypeValues).toEqual(['winnings', 'refund']);
  });

  it('should have length 2', () => {
    expect(ClaimTypeValues).toHaveLength(2);
  });

  it('should be a readonly tuple (as const provides compile-time immutability)', () => {
    expect(ClaimTypeValues[0]).toBe('winnings');
    expect(ClaimTypeValues[1]).toBe('refund');
  });
});

describe('WithdrawalTypeValues', () => {
  it('should contain all withdrawal types', () => {
    expect(WithdrawalTypeValues).toEqual(['dealer', 'system']);
  });

  it('should have length 2', () => {
    expect(WithdrawalTypeValues).toHaveLength(2);
  });

  it('should be a readonly tuple (as const provides compile-time immutability)', () => {
    expect(WithdrawalTypeValues[0]).toBe('dealer');
    expect(WithdrawalTypeValues[1]).toBe('system');
  });
});

// ============================================================================
// Type Guards
// ============================================================================

describe('isMarketStatus', () => {
  it('should return true for all valid market statuses', () => {
    for (const status of MarketStatusValues) {
      expect(isMarketStatus(status)).toBe(true);
    }
  });

  it('should return false for invalid strings', () => {
    expect(isMarketStatus('active')).toBe(false); // lowercase
    expect(isMarketStatus('ACTIVE')).toBe(false); // uppercase
    expect(isMarketStatus('')).toBe(false);
    expect(isMarketStatus('Pending')).toBe(false);
    expect(isMarketStatus('unknown')).toBe(false);
  });

  it('should narrow the type when true', () => {
    const value: string = 'Active';
    if (isMarketStatus(value)) {
      const _status: MarketStatus = value;
      expect(_status).toBe('Active');
    }
  });
});

describe('isClaimType', () => {
  it('should return true for all valid claim types', () => {
    for (const ct of ClaimTypeValues) {
      expect(isClaimType(ct)).toBe(true);
    }
  });

  it('should return false for invalid strings', () => {
    expect(isClaimType('Winnings')).toBe(false); // wrong case
    expect(isClaimType('')).toBe(false);
    expect(isClaimType('bonus')).toBe(false);
  });

  it('should narrow the type when true', () => {
    const value: string = 'refund';
    if (isClaimType(value)) {
      const _ct: ClaimType = value;
      expect(_ct).toBe('refund');
    }
  });
});

describe('isWithdrawalType', () => {
  it('should return true for all valid withdrawal types', () => {
    for (const wt of WithdrawalTypeValues) {
      expect(isWithdrawalType(wt)).toBe(true);
    }
  });

  it('should return false for invalid strings', () => {
    expect(isWithdrawalType('Dealer')).toBe(false); // wrong case
    expect(isWithdrawalType('')).toBe(false);
    expect(isWithdrawalType('user')).toBe(false);
  });

  it('should narrow the type when true', () => {
    const value: string = 'system';
    if (isWithdrawalType(value)) {
      const _wt: WithdrawalType = value;
      expect(_wt).toBe('system');
    }
  });
});

// ============================================================================
// Entity Types
// ============================================================================

describe('entities types', () => {
  describe('MarketStatus', () => {
    it('should accept Active status', () => {
      const status: MarketStatus = 'Active';
      expect(status).toBe('Active');
    });

    it('should accept Cancelled status', () => {
      const status: MarketStatus = 'Cancelled';
      expect(status).toBe('Cancelled');
    });

    it('should accept Resolved status', () => {
      const status: MarketStatus = 'Resolved';
      expect(status).toBe('Resolved');
    });

    it('should accept Abandoned status', () => {
      const status: MarketStatus = 'Abandoned';
      expect(status).toBe('Abandoned');
    });
  });

  describe('ClaimType', () => {
    it('should accept winnings claim type', () => {
      const type: ClaimType = 'winnings';
      expect(type).toBe('winnings');
    });

    it('should accept refund claim type', () => {
      const type: ClaimType = 'refund';
      expect(type).toBe('refund');
    });
  });

  describe('WithdrawalType', () => {
    it('should accept dealer withdrawal type', () => {
      const type: WithdrawalType = 'dealer';
      expect(type).toBe('dealer');
    });

    it('should accept system withdrawal type', () => {
      const type: WithdrawalType = 'system';
      expect(type).toBe('system');
    });
  });

  describe('MarketEntity', () => {
    it('should have all required fields', () => {
      const market: MarketEntity = {
        id: '1-market123',
        dealer: '0xdealer',
        tokenId: 1n,
        category: 1n,
        subCategory: 2n,
        deadline: 1700000000n,
        description: 'Test market',
        createdAt: 1699000000n,
        dealerFeeBps: 250n,
        status: 'Active',
        resolution: null,
        equilibrium: null,
        oracleId: null,
        chainId: 1,
        blockNumber: 12345n,
        txHash: '0xtxhash',
        timestamp: 1699000000n,
      };

      expect(market.id).toBe('1-market123');
      expect(market.status).toBe('Active');
      expect(market.resolution).toBeNull();
    });

    it('should allow optional fields to be set', () => {
      const market: MarketEntity = {
        id: '1-market123',
        dealer: '0xdealer',
        tokenId: 1n,
        category: 1n,
        subCategory: 2n,
        deadline: 1700000000n,
        description: 'Test market',
        createdAt: 1699000000n,
        dealerFeeBps: 250n,
        status: 'Resolved',
        resolution: 7500n,
        equilibrium: 5000n,
        oracleId: 'oracle-1',
        chainId: 1,
        blockNumber: 12345n,
        txHash: '0xtxhash',
        timestamp: 1699000000n,
      };

      expect(market.resolution).toBe(7500n);
      expect(market.equilibrium).toBe(5000n);
      expect(market.oracleId).toBe('oracle-1');
    });
  });

  describe('PredictionEntity', () => {
    it('should have all required fields', () => {
      const prediction: PredictionEntity = {
        id: '1-market123-0xpredictor',
        marketId: '1-market123',
        predictor: '0xpredictor',
        amount: 1000000n,
        percentage: 5000n,
        placedAt: 1699000000n,
        claimed: false,
        chainId: 1,
        blockNumber: 12345n,
        txHash: '0xtxhash',
        timestamp: 1699000000n,
      };

      expect(prediction.id).toBe('1-market123-0xpredictor');
      expect(prediction.claimed).toBe(false);
    });
  });

  describe('ClaimEntity', () => {
    it('should have all required fields for winnings claim', () => {
      const claim: ClaimEntity = {
        id: '0xtxhash-5',
        marketId: '1-market123',
        claimer: '0xclaimer',
        amount: 1500000n,
        claimType: 'winnings',
        chainId: 1,
        blockNumber: 12345n,
        txHash: '0xtxhash',
        timestamp: 1699000000n,
      };

      expect(claim.claimType).toBe('winnings');
    });

    it('should have all required fields for refund claim', () => {
      const claim: ClaimEntity = {
        id: '0xtxhash-5',
        marketId: '1-market123',
        claimer: '0xclaimer',
        amount: 1000000n,
        claimType: 'refund',
        chainId: 1,
        blockNumber: 12345n,
        txHash: '0xtxhash',
        timestamp: 1699000000n,
      };

      expect(claim.claimType).toBe('refund');
    });
  });

  describe('OracleEntity', () => {
    it('should have all required fields', () => {
      const oracle: OracleEntity = {
        id: '1-oracle123',
        oracleId: 'oracle123',
        oracleType: 'PriceFeed',
        dataSource: '0xdatasource',
        minValue: 0n,
        maxValue: 10000n,
        chainId: 1,
        blockNumber: 12345n,
        txHash: '0xtxhash',
        timestamp: 1699000000n,
      };

      expect(oracle.oracleType).toBe('PriceFeed');
    });

    it('should allow null dataSource', () => {
      const oracle: OracleEntity = {
        id: '1-oracle123',
        oracleId: 'oracle123',
        oracleType: 'Manual',
        dataSource: null,
        minValue: 0n,
        maxValue: 10000n,
        chainId: 1,
        blockNumber: 12345n,
        txHash: '0xtxhash',
        timestamp: 1699000000n,
      };

      expect(oracle.dataSource).toBeNull();
    });
  });

  describe('DealerNftEntity', () => {
    it('should have all required fields', () => {
      const nft: DealerNftEntity = {
        id: '1-1',
        chainId: 1,
        tokenId: 1n,
        ownerAddress: '0xowner',
        mintedAt: 1699000000n,
        mintBlockNumber: 12345n,
        mintTransactionHash: '0xtxhash',
        lastTransferAt: null,
        lastTransferBlockNumber: null,
        lastTransferTransactionHash: null,
      };

      expect(nft.tokenId).toBe(1n);
      expect(nft.lastTransferAt).toBeNull();
    });

    it('should allow transfer fields to be set', () => {
      const nft: DealerNftEntity = {
        id: '1-1',
        chainId: 1,
        tokenId: 1n,
        ownerAddress: '0xnewowner',
        mintedAt: 1699000000n,
        mintBlockNumber: 12345n,
        mintTransactionHash: '0xtxhash',
        lastTransferAt: 1699500000n,
        lastTransferBlockNumber: 12400n,
        lastTransferTransactionHash: '0xtransferhash',
      };

      expect(nft.lastTransferAt).toBe(1699500000n);
    });
  });

  describe('DealerPermissionEntity', () => {
    it('should have all required fields', () => {
      const permission: DealerPermissionEntity = {
        id: '1-1-1-2',
        chainId: 1,
        tokenId: 1n,
        category: 1,
        subCategory: 2,
        grantedAt: 1699000000n,
        blockNumber: 12345n,
        transactionHash: '0xtxhash',
      };

      expect(permission.category).toBe(1);
      expect(permission.subCategory).toBe(2);
    });
  });

  describe('WalletFavoriteEntity', () => {
    it('should have all required fields', () => {
      const favorite: WalletFavoriteEntity = {
        id: 1,
        walletAddress: '0xwallet',
        category: 'sports',
        subcategory: 'football',
        type: 'market',
        itemId: '1-market123',
        createdAt: 1699000000n,
      };

      expect(favorite.id).toBe(1);
      expect(favorite.type).toBe('market');
    });
  });

  describe('FeeWithdrawalEntity', () => {
    it('should have all required fields for dealer withdrawal', () => {
      const withdrawal: FeeWithdrawalEntity = {
        id: '0xtxhash-5',
        chainId: 1,
        marketId: '1-market123',
        withdrawerAddress: '0xdealer',
        withdrawalType: 'dealer',
        amount: 50000n,
        withdrawnAt: 1699000000n,
        blockNumber: 12345n,
        transactionHash: '0xtxhash',
      };

      expect(withdrawal.withdrawalType).toBe('dealer');
    });

    it('should have all required fields for system withdrawal', () => {
      const withdrawal: FeeWithdrawalEntity = {
        id: '0xtxhash-5',
        chainId: 1,
        marketId: null,
        withdrawerAddress: '0xtreasury',
        withdrawalType: 'system',
        amount: 100000n,
        withdrawnAt: 1699000000n,
        blockNumber: 12345n,
        transactionHash: '0xtxhash',
      };

      expect(withdrawal.withdrawalType).toBe('system');
      expect(withdrawal.marketId).toBeNull();
    });
  });

  describe('OracleRequestEntity', () => {
    it('should have all required fields for pending request', () => {
      const request: OracleRequestEntity = {
        id: '1-request123',
        chainId: 1,
        marketId: '1-market123',
        requestId: 'request123',
        requestedAt: 1699000000n,
        requestBlockNumber: 12345n,
        requestTransactionHash: '0xrequesthash',
        respondedAt: null,
        responseBlockNumber: null,
        responseTransactionHash: null,
        result: null,
        timedOut: false,
      };

      expect(request.result).toBeNull();
      expect(request.timedOut).toBe(false);
    });

    it('should have all required fields for completed request', () => {
      const request: OracleRequestEntity = {
        id: '1-request123',
        chainId: 1,
        marketId: '1-market123',
        requestId: 'request123',
        requestedAt: 1699000000n,
        requestBlockNumber: 12345n,
        requestTransactionHash: '0xrequesthash',
        respondedAt: 1699500000n,
        responseBlockNumber: 12400n,
        responseTransactionHash: '0xresponsehash',
        result: true,
        timedOut: false,
      };

      expect(request.result).toBe(true);
    });
  });

  describe('MarketStateHistoryEntity', () => {
    it('should have all required fields', () => {
      const history: MarketStateHistoryEntity = {
        id: '1-market123-12345',
        chainId: 1,
        marketId: '1-market123',
        fromState: 'Active',
        toState: 'Resolved',
        changedAt: 1699000000n,
        blockNumber: 12345n,
        transactionHash: '0xtxhash',
        reason: null,
      };

      expect(history.fromState).toBe('Active');
      expect(history.toState).toBe('Resolved');
    });

    it('should allow null fromState for initial creation', () => {
      const history: MarketStateHistoryEntity = {
        id: '1-market123-12345',
        chainId: 1,
        marketId: '1-market123',
        fromState: null,
        toState: 'Active',
        changedAt: 1699000000n,
        blockNumber: 12345n,
        transactionHash: '0xtxhash',
        reason: null,
      };

      expect(history.fromState).toBeNull();
    });
  });
});
