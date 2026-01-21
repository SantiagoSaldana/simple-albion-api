/**
 * Type definitions for Albion Online API
 * Ported from albion-api-client by Patrick Roelke
 */

export type ServerType = 'americas' | 'europe' | 'asia';

export type RangeType = 'week' | 'lastWeek' | 'month' | 'lastMonth';

export type SortType = 'recent' | 'topfame';

export type ServerStatusType = 'live' | 'staging';

export interface ServerConfig {
  americas: string;
  europe: string;
  asia: string;
}

export interface SearchResult {
  players: Array<{
    Id: string;
    Name: string;
    GuildId?: string;
    GuildName?: string;
    AllianceId?: string;
    AllianceName?: string;
    Avatar?: string;
    AvatarRing?: string;
    KillFame?: number;
    DeathFame?: number;
  }>;
  guilds: Array<{
    Id: string;
    Name: string;
    AllianceId?: string;
    AllianceName?: string;
    killFame?: number;
    DeathFame?: number;
  }>;
}

export interface PlayerInfo {
  Id: string;
  Name: string;
  GuildId?: string;
  GuildName?: string;
  AllianceId?: string;
  AllianceName?: string;
  Avatar?: string;
  AvatarRing?: string;
  KillFame?: number;
  DeathFame?: number;
  FameRatio?: number;
  LifetimeStatistics?: {
    PvE?: {
      Total: number;
      Royal?: number;
      Outlands?: number;
      Avalon?: number;
      Hellgate?: number;
    };
    Gathering?: {
      Fiber?: number;
      Hide?: number;
      Ore?: number;
      Rock?: number;
      Wood?: number;
      All?: number;
    };
    Crafting?: {
      Total?: number;
    };
    FishingFame?: number;
    FarmingFame?: number;
  };
}

export interface GuildInfo {
  Id: string;
  Name: string;
  FounderId?: string;
  FounderName?: string;
  Founded?: string;
  AllianceId?: string;
  AllianceName?: string;
  AllianceTag?: string;
  killFame?: number;
  DeathFame?: number;
  AttacksWon?: number;
  DefensesWon?: number;
  MemberCount?: number;
}

export interface GuildMember {
  Id: string;
  Name: string;
  Avatar?: string;
  AvatarRing?: string;
  KillFame?: number;
  DeathFame?: number;
}

export interface Event {
  EventId: number;
  TimeStamp: string;
  Version?: number;
  Killer?: {
    Id?: string;
    Name?: string;
    GuildId?: string;
    GuildName?: string;
    AllianceId?: string;
    AllianceName?: string;
    Avatar?: string;
    AvatarRing?: string;
    Equipment?: Record<string, any>;
    Inventory?: any[];
  };
  Victim?: {
    Id?: string;
    Name?: string;
    GuildId?: string;
    GuildName?: string;
    AllianceId?: string;
    AllianceName?: string;
    Avatar?: string;
    AvatarRing?: string;
    Equipment?: Record<string, any>;
    Inventory?: any[];
    DeathFame?: number;
  };
  TotalVictimKillFame?: number;
  Participants?: number;
  GroupMemberCount?: number;
  numberOfParticipants?: number;
  BattleId?: number;
  Type?: string;
}

export interface Battle {
  id: number;
  name?: string;
  startTime?: string;
  endTime?: string;
  totalFame?: number;
  totalKills?: number;
  players?: {
    [key: string]: any;
  };
  guilds?: {
    [key: string]: any;
  };
  alliances?: {
    [key: string]: any;
  };
}

export interface AlbionAPIConfig {
  server?: ServerType;
}
