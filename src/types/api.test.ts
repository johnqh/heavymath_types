import { describe, it, expect } from 'vitest';
import type {
  MarketData,
  PredictionData,
  DealerNftData,
  DealerPermissionData,
  FeeWithdrawalData,
  OracleRequestData,
  MarketStateHistoryData,
  MarketStatsData,
  HealthData,
  SSEStatsData,
  WalletFavoriteData,
  CreateFavoriteRequest,
  PaginationMeta,
} from './api';

describe('api types', () => {
  describe('MarketData', () => {
    it('should have all required fields', () => {
      const market: MarketData = {
        id: '1-market123',
        chainId: 1,
        marketId: 'market123',
        dealerNftTokenId: '1',
        dealerAddress: '0xdealer',
        title: 'Test Market',
        description: 'A test market description',
        category: 'sports',
        status: 'Active',
        outcome: null,
        createdAt: '2024-01-01T00:00:00Z',
        resolvedAt: null,
        blockNumber: '12345',
        transactionHash: '0xtxhash',
      };

      expect(market.id).toBe('1-market123');
      expect(market.status).toBe('Active');
    });

    it('should allow resolved market with outcome', () => {
      const market: MarketData = {
        id: '1-market123',
        chainId: 1,
        marketId: 'market123',
        dealerNftTokenId: '1',
        dealerAddress: '0xdealer',
        title: 'Test Market',
        description: null,
        category: 'sports',
        status: 'Resolved',
        outcome: '75%',
        createdAt: '2024-01-01T00:00:00Z',
        resolvedAt: '2024-01-15T00:00:00Z',
        blockNumber: '12345',
        transactionHash: '0xtxhash',
      };

      expect(market.outcome).toBe('75%');
      expect(market.resolvedAt).toBe('2024-01-15T00:00:00Z');
    });
  });

  describe('PredictionData', () => {
    it('should have all required fields', () => {
      const prediction: PredictionData = {
        id: '1-market123-0xpredictor',
        chainId: 1,
        marketId: '1-market123',
        userAddress: '0xpredictor',
        amount: '1000000',
        percentage: 50,
        outcome: 'higher',
        hasClaimed: false,
        claimedAmount: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
        lastBlockNumber: '12345',
        lastTransactionHash: '0xtxhash',
      };

      expect(prediction.percentage).toBe(50);
      expect(prediction.hasClaimed).toBe(false);
    });

    it('should allow claimed prediction with amount', () => {
      const prediction: PredictionData = {
        id: '1-market123-0xpredictor',
        chainId: 1,
        marketId: '1-market123',
        userAddress: '0xpredictor',
        amount: '1000000',
        percentage: 50,
        outcome: 'higher',
        hasClaimed: true,
        claimedAmount: '1500000',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        lastBlockNumber: '12400',
        lastTransactionHash: '0xclaimhash',
      };

      expect(prediction.hasClaimed).toBe(true);
      expect(prediction.claimedAmount).toBe('1500000');
    });
  });

  describe('DealerNftData', () => {
    it('should have all required fields', () => {
      const nft: DealerNftData = {
        id: '1-1',
        chainId: 1,
        tokenId: '1',
        ownerAddress: '0xowner',
        mintedAt: '2024-01-01T00:00:00Z',
        mintBlockNumber: '12345',
        mintTransactionHash: '0xminthash',
        lastTransferAt: null,
        lastTransferBlockNumber: null,
        lastTransferTransactionHash: null,
      };

      expect(nft.tokenId).toBe('1');
    });

    it('should allow transfer data', () => {
      const nft: DealerNftData = {
        id: '1-1',
        chainId: 1,
        tokenId: '1',
        ownerAddress: '0xnewowner',
        mintedAt: '2024-01-01T00:00:00Z',
        mintBlockNumber: '12345',
        mintTransactionHash: '0xminthash',
        lastTransferAt: '2024-01-15T00:00:00Z',
        lastTransferBlockNumber: '12400',
        lastTransferTransactionHash: '0xtransferhash',
      };

      expect(nft.lastTransferAt).toBe('2024-01-15T00:00:00Z');
    });
  });

  describe('DealerPermissionData', () => {
    it('should have all required fields', () => {
      const permission: DealerPermissionData = {
        id: '1-1-1-2',
        chainId: 1,
        tokenId: '1',
        category: 1,
        subCategory: 2,
        grantedAt: '2024-01-01T00:00:00Z',
        blockNumber: '12345',
        transactionHash: '0xtxhash',
      };

      expect(permission.category).toBe(1);
      expect(permission.subCategory).toBe(2);
    });
  });

  describe('FeeWithdrawalData', () => {
    it('should have all required fields for dealer withdrawal', () => {
      const withdrawal: FeeWithdrawalData = {
        id: '0xtxhash-5',
        chainId: 1,
        marketId: '1-market123',
        withdrawerAddress: '0xdealer',
        withdrawalType: 'dealer',
        amount: '50000',
        withdrawnAt: '2024-01-15T00:00:00Z',
        blockNumber: '12400',
        transactionHash: '0xtxhash',
      };

      expect(withdrawal.withdrawalType).toBe('dealer');
    });

    it('should allow null marketId for system withdrawal', () => {
      const withdrawal: FeeWithdrawalData = {
        id: '0xtxhash-5',
        chainId: 1,
        marketId: null,
        withdrawerAddress: '0xtreasury',
        withdrawalType: 'system',
        amount: '100000',
        withdrawnAt: '2024-01-15T00:00:00Z',
        blockNumber: '12400',
        transactionHash: '0xtxhash',
      };

      expect(withdrawal.marketId).toBeNull();
    });
  });

  describe('OracleRequestData', () => {
    it('should have all required fields for pending request', () => {
      const request: OracleRequestData = {
        id: '1-request123',
        chainId: 1,
        marketId: '1-market123',
        requestId: 'request123',
        requestedAt: '2024-01-01T00:00:00Z',
        requestBlockNumber: '12345',
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
      const request: OracleRequestData = {
        id: '1-request123',
        chainId: 1,
        marketId: '1-market123',
        requestId: 'request123',
        requestedAt: '2024-01-01T00:00:00Z',
        requestBlockNumber: '12345',
        requestTransactionHash: '0xrequesthash',
        respondedAt: '2024-01-02T00:00:00Z',
        responseBlockNumber: '12400',
        responseTransactionHash: '0xresponsehash',
        result: true,
        timedOut: false,
      };

      expect(request.result).toBe(true);
    });
  });

  describe('MarketStateHistoryData', () => {
    it('should have all required fields', () => {
      const history: MarketStateHistoryData = {
        id: '1-market123-12345',
        chainId: 1,
        marketId: '1-market123',
        fromState: 'Active',
        toState: 'Resolved',
        changedAt: '2024-01-15T00:00:00Z',
        blockNumber: '12400',
        transactionHash: '0xtxhash',
        reason: null,
      };

      expect(history.fromState).toBe('Active');
      expect(history.toState).toBe('Resolved');
    });

    it('should allow reason for state change', () => {
      const history: MarketStateHistoryData = {
        id: '1-market123-12345',
        chainId: 1,
        marketId: '1-market123',
        fromState: 'Active',
        toState: 'Cancelled',
        changedAt: '2024-01-15T00:00:00Z',
        blockNumber: '12400',
        transactionHash: '0xtxhash',
        reason: 'Dealer cancelled the market',
      };

      expect(history.reason).toBe('Dealer cancelled the market');
    });
  });

  describe('MarketStatsData', () => {
    it('should have all required fields', () => {
      const stats: MarketStatsData = {
        total: 100,
        byStatus: {
          Active: 50,
          Resolved: 40,
          Cancelled: 5,
          Abandoned: 5,
        },
        byCategory: {
          sports: 30,
          crypto: 40,
          politics: 30,
        },
      };

      expect(stats.total).toBe(100);
      expect(stats.byStatus.Active).toBe(50);
    });
  });

  describe('HealthData', () => {
    it('should accept healthy status', () => {
      const health: HealthData = {
        status: 'healthy',
        timestamp: 1699000000,
      };

      expect(health.status).toBe('healthy');
    });

    it('should accept unhealthy status', () => {
      const health: HealthData = {
        status: 'unhealthy',
        timestamp: 1699000000,
      };

      expect(health.status).toBe('unhealthy');
    });
  });

  describe('SSEStatsData', () => {
    it('should have clients and subscriptions', () => {
      const stats: SSEStatsData = {
        clients: 10,
        subscriptions: 25,
      };

      expect(stats.clients).toBe(10);
      expect(stats.subscriptions).toBe(25);
    });
  });

  describe('WalletFavoriteData', () => {
    it('should have all required fields', () => {
      const favorite: WalletFavoriteData = {
        id: 1,
        walletAddress: '0xwallet',
        category: 'sports',
        subcategory: 'football',
        type: 'market',
        itemId: '1-market123',
        createdAt: 1699000000n,
      };

      expect(favorite.type).toBe('market');
    });
  });

  describe('CreateFavoriteRequest', () => {
    it('should have all required fields', () => {
      const request: CreateFavoriteRequest = {
        category: 'sports',
        subcategory: 'football',
        type: 'market',
        id: '1-market123',
      };

      expect(request.category).toBe('sports');
      expect(request.id).toBe('1-market123');
    });
  });

  describe('PaginationMeta', () => {
    it('should have count, limit, and offset', () => {
      const meta: PaginationMeta = {
        count: 100,
        limit: 20,
        offset: 0,
      };

      expect(meta.count).toBe(100);
      expect(meta.limit).toBe(20);
      expect(meta.offset).toBe(0);
    });
  });
});
