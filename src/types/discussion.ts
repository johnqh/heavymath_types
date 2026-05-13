/**
 * Discussion and comment types for threaded discussions on sports entities.
 * Supports games/matches/fixtures/races, tournament+year, and teams.
 */

import type { Optional } from './common';

// ============================================================================
// Const value objects (compatible with erasableSyntaxOnly)
// ============================================================================

export const SubjectTypeValues = ['game', 'tournament_season', 'team'] as const;
export type SubjectType = (typeof SubjectTypeValues)[number];

export function isSubjectType(value: string): value is SubjectType {
  return (SubjectTypeValues as readonly string[]).includes(value);
}

export const ModerationStatusValues = [
  'approved',
  'flagged',
  'rejected',
] as const;
export type ModerationStatus = (typeof ModerationStatusValues)[number];

export function isModerationStatus(value: string): value is ModerationStatus {
  return (ModerationStatusValues as readonly string[]).includes(value);
}

// ============================================================================
// Database Entity Types (bigint fields for DB/indexer code)
// ============================================================================

export interface DiscussionEntity {
  id: number;
  subjectType: SubjectType;
  subjectId: string;
  sport: string;
  lockedAt: Optional<bigint>;
  commentCount: number;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface DiscussionCommentEntity {
  id: number;
  discussionId: number;
  parentId: Optional<number>;
  authorAddress: string;
  content: string;
  mentionedAddress: Optional<string>;
  isDeleted: boolean;
  deletedBy: Optional<string>;
  moderationStatus: ModerationStatus;
  moderationReason: Optional<string>;
  createdAt: bigint;
  updatedAt: bigint;
}

// ============================================================================
// API Response Types (serialized, string fields)
// ============================================================================

export interface DiscussionData {
  id: number;
  subjectType: SubjectType;
  subjectId: string;
  sport: string;
  lockedAt: Optional<string>;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommentData {
  id: number;
  discussionId: number;
  parentId: Optional<number>;
  authorAddress: string;
  content: string;
  mentionedAddress: Optional<string>;
  isDeleted: boolean;
  moderationStatus: ModerationStatus;
  createdAt: string;
  updatedAt: string;
  replies?: CommentData[];
}

export interface DiscussionCommentsResponse {
  discussion: DiscussionData;
  comments: CommentData[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// ============================================================================
// Request Types
// ============================================================================

export interface PostCommentRequest {
  subjectType: SubjectType;
  sport: string;
  subjectId: string;
  content: string;
  parentId?: number;
  mentionedAddress?: string;
}

export interface ModerateCommentRequest {
  moderationStatus: 'approved' | 'flagged';
  moderationReason?: string;
}

// ============================================================================
// Auth Types (SIWE)
// ============================================================================

export interface AuthNonceResponse {
  nonce: string;
}

export interface AuthVerifyRequest {
  message: string;
  signature: string;
}

export interface AuthVerifyResponse {
  token: string;
  address: string;
  expiresAt: string;
}
