import { describe, it, expect } from 'vitest';
import {
  ConditionType,
  ScoreType,
  TeamSide,
  ComparisonOperator,
  encodeConditionData,
  decodeConditionData,
  formatConditionDescription,
} from './condition';
import type {
  ConditionData,
  WinLossCondition,
  MatchScoreCondition,
  TournamentCondition,
} from './condition';

describe('condition types', () => {
  describe('ConditionType', () => {
    it('should have correct numeric values', () => {
      expect(ConditionType.WinLoss).toBe(0);
      expect(ConditionType.MatchScore).toBe(1);
      expect(ConditionType.Tournament).toBe(2);
    });
  });

  describe('ScoreType', () => {
    it('should have correct numeric values', () => {
      expect(ScoreType.Absolute).toBe(0);
      expect(ScoreType.Relative).toBe(1);
    });
  });

  describe('TeamSide', () => {
    it('should have correct numeric values', () => {
      expect(TeamSide.Home).toBe(0);
      expect(TeamSide.Away).toBe(1);
    });
  });

  describe('ComparisonOperator', () => {
    it('should have correct numeric values', () => {
      expect(ComparisonOperator.GreaterOrEqual).toBe(0);
      expect(ComparisonOperator.Greater).toBe(1);
      expect(ComparisonOperator.Equal).toBe(2);
      expect(ComparisonOperator.Less).toBe(3);
      expect(ComparisonOperator.LessOrEqual).toBe(4);
      expect(ComparisonOperator.NotEqual).toBe(5);
    });
  });

  describe('encodeConditionData / decodeConditionData', () => {
    describe('WinLoss', () => {
      it('should roundtrip with positiveTeamId=0', () => {
        const condition: WinLossCondition = {
          type: ConditionType.WinLoss,
          positiveTeamId: 0,
        };
        const encoded = encodeConditionData(condition);
        expect(encoded).toBe(
          '0x0000000000000000000000000000000000000000000000000000000000000000'
        );
        const decoded = decodeConditionData(encoded);
        expect(decoded).toEqual(condition);
      });

      it('should roundtrip with a real team ID', () => {
        const condition: WinLossCondition = {
          type: ConditionType.WinLoss,
          positiveTeamId: 12345,
        };
        const encoded = encodeConditionData(condition);
        const decoded = decodeConditionData(encoded);
        expect(decoded).toEqual(condition);
      });

      it('should roundtrip with max uint32 team ID', () => {
        const condition: WinLossCondition = {
          type: ConditionType.WinLoss,
          positiveTeamId: 0xffffffff,
        };
        const encoded = encodeConditionData(condition);
        const decoded = decodeConditionData(encoded);
        expect(decoded).toEqual(condition);
      });
    });

    describe('MatchScore', () => {
      it('should roundtrip absolute score >= threshold', () => {
        const condition: MatchScoreCondition = {
          type: ConditionType.MatchScore,
          scoreType: ScoreType.Absolute,
          team: TeamSide.Home,
          operator: ComparisonOperator.GreaterOrEqual,
          expectation: 3,
        };
        const encoded = encodeConditionData(condition);
        const decoded = decodeConditionData(encoded);
        expect(decoded).toEqual(condition);
      });

      it('should roundtrip relative score with negative expectation', () => {
        const condition: MatchScoreCondition = {
          type: ConditionType.MatchScore,
          scoreType: ScoreType.Relative,
          team: TeamSide.Away,
          operator: ComparisonOperator.Less,
          expectation: -2,
        };
        const encoded = encodeConditionData(condition);
        const decoded = decodeConditionData(encoded);
        expect(decoded).toEqual(condition);
      });

      it('should roundtrip with zero expectation', () => {
        const condition: MatchScoreCondition = {
          type: ConditionType.MatchScore,
          scoreType: ScoreType.Absolute,
          team: TeamSide.Home,
          operator: ComparisonOperator.Equal,
          expectation: 0,
        };
        const encoded = encodeConditionData(condition);
        const decoded = decodeConditionData(encoded);
        expect(decoded).toEqual(condition);
      });

      it('should roundtrip with all operator values', () => {
        for (const op of [0, 1, 2, 3, 4, 5] as const) {
          const condition: MatchScoreCondition = {
            type: ConditionType.MatchScore,
            scoreType: ScoreType.Absolute,
            team: TeamSide.Home,
            operator: op,
            expectation: 10,
          };
          const decoded = decodeConditionData(encodeConditionData(condition));
          expect(decoded).toEqual(condition);
        }
      });
    });

    describe('Tournament', () => {
      it('should roundtrip with expectation=true', () => {
        const condition: TournamentCondition = {
          type: ConditionType.Tournament,
          teamId: 999,
          expectation: true,
        };
        const encoded = encodeConditionData(condition);
        const decoded = decodeConditionData(encoded);
        expect(decoded).toEqual(condition);
      });

      it('should roundtrip with expectation=false', () => {
        const condition: TournamentCondition = {
          type: ConditionType.Tournament,
          teamId: 42,
          expectation: false,
        };
        const encoded = encodeConditionData(condition);
        const decoded = decodeConditionData(encoded);
        expect(decoded).toEqual(condition);
      });

      it('should roundtrip with max uint32 team ID', () => {
        const condition: TournamentCondition = {
          type: ConditionType.Tournament,
          teamId: 0xffffffff,
          expectation: true,
        };
        const encoded = encodeConditionData(condition);
        const decoded = decodeConditionData(encoded);
        expect(decoded).toEqual(condition);
      });
    });

    describe('edge cases', () => {
      it('should decode null/empty as legacy WinLoss', () => {
        expect(decodeConditionData('')).toEqual({
          type: ConditionType.WinLoss,
          positiveTeamId: 0,
        });
        expect(decodeConditionData('0x')).toEqual({
          type: ConditionType.WinLoss,
          positiveTeamId: 0,
        });
        expect(decodeConditionData('0x0')).toEqual({
          type: ConditionType.WinLoss,
          positiveTeamId: 0,
        });
      });

      it('should decode all-zeros as legacy WinLoss', () => {
        const zeros =
          '0x0000000000000000000000000000000000000000000000000000000000000000';
        expect(decodeConditionData(zeros)).toEqual({
          type: ConditionType.WinLoss,
          positiveTeamId: 0,
        });
      });

      it('should throw on unknown condition type', () => {
        const badHex =
          '0xff00000000000000000000000000000000000000000000000000000000000000';
        expect(() => decodeConditionData(badHex)).toThrow(
          'Unknown condition type: 255'
        );
      });

      it('should produce 66-char hex string (0x + 64)', () => {
        const encoded = encodeConditionData({
          type: ConditionType.WinLoss,
          positiveTeamId: 1,
        });
        expect(encoded).toHaveLength(66);
        expect(encoded).toMatch(/^0x[0-9a-f]{64}$/);
      });

      it('should handle short hex input by zero-padding', () => {
        // Just the type byte 0x01 followed by minimal data
        const short = '0x0100010003';
        const decoded = decodeConditionData(short);
        expect(decoded.type).toBe(ConditionType.MatchScore);
      });
    });
  });

  describe('formatConditionDescription', () => {
    it('should format legacy WinLoss (positiveTeamId=0)', () => {
      const condition: ConditionData = {
        type: ConditionType.WinLoss,
        positiveTeamId: 0,
      };
      expect(formatConditionDescription(condition)).toBe('Win/Loss');
    });

    it('should format WinLoss with team name', () => {
      const condition: ConditionData = {
        type: ConditionType.WinLoss,
        positiveTeamId: 123,
      };
      expect(formatConditionDescription(condition, { team: 'Liverpool' })).toBe(
        'Liverpool wins'
      );
    });

    it('should format WinLoss with fallback team name', () => {
      const condition: ConditionData = {
        type: ConditionType.WinLoss,
        positiveTeamId: 123,
      };
      expect(formatConditionDescription(condition)).toBe('Team #123 wins');
    });

    it('should format MatchScore absolute', () => {
      const condition: ConditionData = {
        type: ConditionType.MatchScore,
        scoreType: ScoreType.Absolute,
        team: TeamSide.Home,
        operator: ComparisonOperator.GreaterOrEqual,
        expectation: 3,
      };
      expect(formatConditionDescription(condition, { home: 'Arsenal' })).toBe(
        'Arsenal score >= 3'
      );
    });

    it('should format MatchScore relative', () => {
      const condition: ConditionData = {
        type: ConditionType.MatchScore,
        scoreType: ScoreType.Relative,
        team: TeamSide.Away,
        operator: ComparisonOperator.Greater,
        expectation: -1,
      };
      expect(formatConditionDescription(condition, { away: 'Chelsea' })).toBe(
        'Chelsea margin > -1'
      );
    });

    it('should format Tournament wins', () => {
      const condition: ConditionData = {
        type: ConditionType.Tournament,
        teamId: 42,
        expectation: true,
      };
      expect(
        formatConditionDescription(condition, { team: 'Red Bull Racing' })
      ).toBe('Red Bull Racing wins');
    });

    it('should format Tournament does not win', () => {
      const condition: ConditionData = {
        type: ConditionType.Tournament,
        teamId: 42,
        expectation: false,
      };
      expect(formatConditionDescription(condition)).toBe(
        'Team #42 does not win'
      );
    });
  });
});
