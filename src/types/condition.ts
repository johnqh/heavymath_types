/**
 * @fileoverview Market Condition Types for Prediction Markets
 * @description Condition types encode resolution logic into a bytes32 field stored on-chain.
 *
 * On-chain `conditionData` bytes32 layout:
 *
 * Byte 0:  conditionType (uint8)
 *            0x00 = WinLoss (legacy default — bytes32(0) is backward-compatible)
 *            0x01 = MatchScore
 *            0x02 = Tournament
 *
 * --- WinLoss (0x00) ---
 * Bytes 1-4:   positiveTeamId (uint32)
 * Bytes 5-31:  reserved (zero)
 *
 * --- MatchScore (0x01) ---
 * Byte 1:      scoreType (uint8): 0=absolute, 1=relative
 * Byte 2:      team (uint8): 0=home, 1=away
 * Byte 3:      operator (uint8): 0=>=, 1=>, 2===, 3=<, 4=<=, 5=!=
 * Bytes 4-7:   expectation (int32, signed big-endian)
 * Bytes 8-31:  reserved (zero)
 *
 * --- Tournament (0x02) ---
 * Bytes 1-4:   teamId (uint32)
 * Byte 5:      expectation (uint8): 1=team wins→positive, 0=team doesn't win→positive
 * Bytes 6-31:  reserved (zero)
 */

// ============================================================================
// Enums (as const objects per project convention)
// ============================================================================

export const ConditionType = {
  WinLoss: 0,
  MatchScore: 1,
  Tournament: 2,
} as const;

export type ConditionTypeValue =
  (typeof ConditionType)[keyof typeof ConditionType];

export const ScoreType = {
  Absolute: 0,
  Relative: 1,
} as const;

export type ScoreTypeValue = (typeof ScoreType)[keyof typeof ScoreType];

export const TeamSide = {
  Home: 0,
  Away: 1,
} as const;

export type TeamSideValue = (typeof TeamSide)[keyof typeof TeamSide];

export const ComparisonOperator = {
  GreaterOrEqual: 0,
  Greater: 1,
  Equal: 2,
  Less: 3,
  LessOrEqual: 4,
  NotEqual: 5,
} as const;

export type ComparisonOperatorValue =
  (typeof ComparisonOperator)[keyof typeof ComparisonOperator];

// ============================================================================
// Discriminated Union
// ============================================================================

export type WinLossCondition = {
  type: typeof ConditionType.WinLoss;
  positiveTeamId: number;
};

export type MatchScoreCondition = {
  type: typeof ConditionType.MatchScore;
  scoreType: ScoreTypeValue;
  team: TeamSideValue;
  operator: ComparisonOperatorValue;
  expectation: number;
};

export type TournamentCondition = {
  type: typeof ConditionType.Tournament;
  teamId: number;
  expectation: boolean;
};

export type ConditionData =
  | WinLossCondition
  | MatchScoreCondition
  | TournamentCondition;

// ============================================================================
// Encoding / Decoding
// ============================================================================

const ZERO_BYTES32 =
  '0x0000000000000000000000000000000000000000000000000000000000000000';

/**
 * Encode a ConditionData into a bytes32 hex string.
 */
export function encodeConditionData(condition: ConditionData): string {
  const buf = new Uint8Array(32);

  switch (condition.type) {
    case ConditionType.WinLoss: {
      buf[0] = 0x00;
      writeUint32(buf, 1, condition.positiveTeamId);
      break;
    }
    case ConditionType.MatchScore: {
      buf[0] = 0x01;
      buf[1] = condition.scoreType;
      buf[2] = condition.team;
      buf[3] = condition.operator;
      writeInt32(buf, 4, condition.expectation);
      break;
    }
    case ConditionType.Tournament: {
      buf[0] = 0x02;
      writeUint32(buf, 1, condition.teamId);
      buf[5] = condition.expectation ? 1 : 0;
      break;
    }
  }

  return (
    '0x' +
    Array.from(buf)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  );
}

/**
 * Decode a bytes32 hex string into a ConditionData.
 * Returns a WinLoss with positiveTeamId=0 for null/zero input (legacy).
 */
export function decodeConditionData(hex: string): ConditionData {
  if (!hex || hex === '0x' || hex === '0x0' || hex === ZERO_BYTES32) {
    return { type: ConditionType.WinLoss, positiveTeamId: 0 };
  }

  const normalized = normalizeHex(hex);
  const buf = hexToBytes(normalized);

  const conditionType = buf[0];

  switch (conditionType) {
    case ConditionType.WinLoss: {
      return {
        type: ConditionType.WinLoss,
        positiveTeamId: readUint32(buf, 1),
      };
    }
    case ConditionType.MatchScore: {
      return {
        type: ConditionType.MatchScore,
        scoreType: buf[1] as ScoreTypeValue,
        team: buf[2] as TeamSideValue,
        operator: buf[3] as ComparisonOperatorValue,
        expectation: readInt32(buf, 4),
      };
    }
    case ConditionType.Tournament: {
      return {
        type: ConditionType.Tournament,
        teamId: readUint32(buf, 1),
        expectation: buf[5] === 1,
      };
    }
    default:
      throw new Error(`Unknown condition type: ${conditionType}`);
  }
}

// ============================================================================
// Formatting
// ============================================================================

const OPERATOR_SYMBOLS: Record<ComparisonOperatorValue, string> = {
  [ComparisonOperator.GreaterOrEqual]: '>=',
  [ComparisonOperator.Greater]: '>',
  [ComparisonOperator.Equal]: '=',
  [ComparisonOperator.Less]: '<',
  [ComparisonOperator.LessOrEqual]: '<=',
  [ComparisonOperator.NotEqual]: '!=',
};

/**
 * Format a ConditionData into a human-readable description.
 */
export function formatConditionDescription(
  condition: ConditionData,
  names?: { home?: string; away?: string; team?: string }
): string {
  switch (condition.type) {
    case ConditionType.WinLoss: {
      const teamName = names?.team ?? `Team #${condition.positiveTeamId}`;
      return condition.positiveTeamId === 0 ? 'Win/Loss' : `${teamName} wins`;
    }
    case ConditionType.MatchScore: {
      const teamName =
        condition.team === TeamSide.Home
          ? (names?.home ?? 'Home')
          : (names?.away ?? 'Away');
      const op = OPERATOR_SYMBOLS[condition.operator];
      if (condition.scoreType === ScoreType.Absolute) {
        return `${teamName} score ${op} ${condition.expectation}`;
      }
      return `${teamName} margin ${op} ${condition.expectation}`;
    }
    case ConditionType.Tournament: {
      const teamName = names?.team ?? `Team #${condition.teamId}`;
      return condition.expectation
        ? `${teamName} wins`
        : `${teamName} does not win`;
    }
  }
}

// ============================================================================
// Internal Helpers
// ============================================================================

function writeUint32(buf: Uint8Array, offset: number, value: number): void {
  buf[offset] = (value >>> 24) & 0xff;
  buf[offset + 1] = (value >>> 16) & 0xff;
  buf[offset + 2] = (value >>> 8) & 0xff;
  buf[offset + 3] = value & 0xff;
}

function readUint32(buf: Uint8Array, offset: number): number {
  return (
    ((buf[offset] << 24) |
      (buf[offset + 1] << 16) |
      (buf[offset + 2] << 8) |
      buf[offset + 3]) >>>
    0
  );
}

function writeInt32(buf: Uint8Array, offset: number, value: number): void {
  // Two's complement: works the same as uint32 at the byte level
  writeUint32(buf, offset, value);
}

function readInt32(buf: Uint8Array, offset: number): number {
  // Signed: use bitwise OR with 0 to convert to signed int32
  return (
    (buf[offset] << 24) |
    (buf[offset + 1] << 16) |
    (buf[offset + 2] << 8) |
    buf[offset + 3]
  );
}

function normalizeHex(hex: string): string {
  const stripped = hex.startsWith('0x') ? hex.slice(2) : hex;
  return '0x' + stripped.padEnd(64, '0');
}

function hexToBytes(hex: string): Uint8Array {
  const stripped = hex.startsWith('0x') ? hex.slice(2) : hex;
  const bytes = new Uint8Array(stripped.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(stripped.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}
