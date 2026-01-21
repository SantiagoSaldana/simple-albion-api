/**
 * Albion Online API Client
 *
 * Ported to TypeScript from the Python library albion-api-client
 * Original Author: Patrick Roelke (proelke@gmail.com)
 * Original Repository: https://github.com/proelke/albion-api-client
 *
 * This is a TypeScript/Node.js port that maintains the same functionality
 * and API interface as the original Python library.
 */

import axios, { AxiosInstance } from 'axios';
import type {
  ServerType,
  ServerConfig,
  RangeType,
  SortType,
  ServerStatusType,
  SearchResult,
  PlayerInfo,
  GuildInfo,
  GuildMember,
  Event,
  Battle,
  AlbionAPIConfig,
} from './types';

export class AlbionAPI {
  private static readonly SERVERS: ServerConfig = {
    americas: 'https://gameinfo.albiononline.com/api/gameinfo',
    europe: 'https://gameinfo-ams.albiononline.com/api/gameinfo',
    asia: 'https://gameinfo-sgp.albiononline.com/api/gameinfo',
  };

  private baseUrl: string;
  private client: AxiosInstance;

  /**
   * Creates a new Albion Online API client
   * @param config Configuration object with optional server selection
   */
  constructor(config: AlbionAPIConfig = {}) {
    const server = config.server || 'americas';

    if (!(server in AlbionAPI.SERVERS)) {
      throw new Error(
        `Invalid server '${server}'. Must be one of: ${Object.keys(AlbionAPI.SERVERS).join(', ')}`
      );
    }

    this.baseUrl = AlbionAPI.SERVERS[server];
    this.client = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
    });
  }

  private url(endpoint: string): string {
    return this.baseUrl + endpoint;
  }

  /**
   * Get player ID by player name
   * @param playerName The name of the player to search for
   * @returns The player ID
   */
  async getPlayerId(playerName: string): Promise<string> {
    const result = await this.search(playerName);
    return result.players[0].Id;
  }

  /**
   * Get player information by player ID
   * @param playerId The player ID
   * @returns Player information object
   */
  async getPlayerInfo(playerId: string): Promise<PlayerInfo> {
    const response = await this.client.get<PlayerInfo>(`/players/${playerId}`);
    return response.data;
  }

  /**
   * Get player's top kills
   * @param playerId The player ID
   * @param offset Pagination offset (default: 0)
   * @param limit Number of results to return (default: 11)
   * @param range Time range filter (default: 'week')
   * @returns Array of kill events
   */
  async getPlayerTopkills(
    playerId: string,
    offset: number = 0,
    limit: number = 11,
    range: RangeType = 'week'
  ): Promise<Event[]> {
    const params: Record<string, any> = { offset, limit };

    if (range && ['week', 'lastWeek', 'month', 'lastMonth'].includes(range)) {
      params.range = range;
    }

    const response = await this.client.get<Event[]>(`/players/${playerId}/topkills`, { params });
    return response.data;
  }

  /**
   * Get player's solo kills
   * @param playerId The player ID
   * @param offset Pagination offset (default: 0)
   * @param limit Number of results to return (default: 11)
   * @param range Time range filter (default: 'week')
   * @returns Array of kill events
   */
  async getPlayerSolokills(
    playerId: string,
    offset: number = 0,
    limit: number = 11,
    range: RangeType = 'week'
  ): Promise<Event[]> {
    const params: Record<string, any> = { offset, limit };

    if (range && ['week', 'lastWeek', 'month', 'lastMonth'].includes(range)) {
      params.range = range;
    }

    const response = await this.client.get<Event[]>(`/players/${playerId}/solokills`, { params });
    return response.data;
  }

  /**
   * Get player's deaths
   * @param playerId The player ID
   * @returns Array of death events
   */
  async getPlayerDeath(playerId: string): Promise<Event[]> {
    const response = await this.client.get<Event[]>(`/players/${playerId}/deaths`);
    return response.data;
  }

  /**
   * Get guild ID by guild name
   * @param guildName The name of the guild to search for
   * @returns The guild ID
   */
  async getGuildId(guildName: string): Promise<string> {
    const result = await this.search(guildName);
    return result.guilds[0].Id;
  }

  /**
   * Get guild information by guild ID
   * @param guildId The guild ID
   * @returns Guild information object
   */
  async getGuildInfo(guildId: string): Promise<GuildInfo> {
    const response = await this.client.get<GuildInfo>(`/guilds/${guildId}`);
    return response.data;
  }

  /**
   * Get guild data by guild ID
   * @param guildId The guild ID
   * @returns Guild data object
   */
  async getGuildData(guildId: string): Promise<any> {
    const response = await this.client.get(`/guilds/${guildId}/data`);
    return response.data;
  }

  /**
   * Get guild's top kills
   * @param guildId The guild ID
   * @param offset Pagination offset (default: 0)
   * @param limit Number of results to return (default: 11)
   * @param range Time range filter (default: 'week')
   * @returns Array of top kills
   */
  async getGuildTopKills(
    guildId: string,
    offset: number = 0,
    limit: number = 11,
    range: RangeType = 'week'
  ): Promise<any> {
    const params: Record<string, any> = { offset, limit };

    if (range && ['week', 'lastWeek', 'month', 'lastMonth'].includes(range)) {
      params.range = range;
    }

    const response = await this.client.get(`/guilds/${guildId}/top`, { params });
    return response.data;
  }

  /**
   * Get guild statistics
   * @param guildId The guild ID
   * @returns Guild statistics object
   */
  async getGuildStats(guildId: string): Promise<any> {
    const response = await this.client.get(`/guilds/${guildId}/stats`);
    return response.data;
  }

  /**
   * Get guild members
   * @param guildId The guild ID
   * @returns Array of guild members
   */
  async getGuildMembers(guildId: string): Promise<GuildMember[]> {
    const response = await this.client.get<GuildMember[]>(`/guilds/${guildId}/members`);
    return response.data;
  }

  /**
   * Get guild feud information
   * @param guildId The guild ID
   * @param rivalGuildId The rival guild ID
   * @returns Feud information
   */
  async getGuildFeud(guildId: string, rivalGuildId: string): Promise<any> {
    const response = await this.client.get(`/guilds/${guildId}/fued/${rivalGuildId}`);
    return response.data;
  }

  /**
   * Get server status
   * @param server Server type ('live' or 'staging', default: 'live')
   * @returns Server status object
   */
  async getServerStatus(server: ServerStatusType = 'live'): Promise<any> {
    if (server !== 'live' && server !== 'staging') {
      throw new Error("Server must be 'live' or 'staging'");
    }

    try {
      const response = await axios.get(`http://${server}.albiononline.com/status.txt`);
      return response.data;
    } catch (error: any) {
      // Handle invalid JSON response
      if (error.response && error.response.data) {
        const text = error.response.data;
        if (typeof text === 'string' && text.startsWith('\ufeff')) {
          return JSON.parse(text.substring(3));
        }
      }
      throw error;
    }
  }

  /**
   * Get event by ID
   * @param eventId The event ID
   * @returns Event information
   */
  async getEvent(eventId: number): Promise<Event> {
    const response = await this.client.get<Event>(`/events/${eventId}`);
    return response.data;
  }

  /**
   * Get recent events
   * @param limit Number of results to return (default: 50)
   * @param offset Pagination offset (default: 0)
   * @returns Array of events
   */
  async getRecentEvents(limit: number = 50, offset: number = 0): Promise<Event[]> {
    const params = { limit, offset };
    const response = await this.client.get<Event[]>('/events', { params });
    return response.data;
  }

  /**
   * Get events between two event IDs
   * @param startEvent Starting event ID
   * @param endEvent Ending event ID
   * @returns Array of events
   */
  async getEventsBetween(startEvent: number, endEvent: number): Promise<Event[]> {
    const response = await this.client.get<Event[]>(`/events/${startEvent}/history/${endEvent}`);
    return response.data;
  }

  /**
   * Get guild matches
   * @param matchId The match ID
   * @param offset Pagination offset (default: 0)
   * @param limit Number of results to return (default: 6)
   * @returns Guild match data
   */
  async getGuildmatches(matchId: string, offset: number = 0, limit: number = 6): Promise<any> {
    const params = { offset, limit };
    const response = await this.client.get(`/guildmatches/${matchId}`, { params });
    return response.data;
  }

  /**
   * Get top guild matches
   * @returns Top guild matches
   */
  async getGuildmatchesTop(): Promise<any> {
    const response = await this.client.get('/guildmatches/top');
    return response.data;
  }

  /**
   * Get next guild matches
   * @param offset Pagination offset (default: 0)
   * @param limit Number of results to return (default: 11)
   * @returns Array of upcoming matches
   */
  async getGuildmatchesNext(offset: number = 0, limit: number = 11): Promise<any> {
    const params = { offset, limit };
    const response = await this.client.get('/guildmatches/next', { params });
    return response.data;
  }

  /**
   * Get past guild matches
   * @param offset Pagination offset (default: 0)
   * @param limit Number of results to return (default: 51)
   * @returns Array of past matches
   */
  async getGuildmatchesPast(offset: number = 0, limit: number = 51): Promise<any> {
    const params = { offset, limit };
    const response = await this.client.get('/guildmatches/past', { params });
    return response.data;
  }

  /**
   * Get guild match history between two guilds
   * @param guildId The guild ID
   * @param rivalGuildId The rival guild ID
   * @returns Match history
   */
  async getGuildmatchesHistory(guildId: string, rivalGuildId: string): Promise<any> {
    const response = await this.client.get(
      `/guildmatches/history/${guildId}/${rivalGuildId}`
    );
    return response.data;
  }

  /**
   * Search for players and guilds
   * @param query The search query
   * @returns Search results containing players and guilds
   */
  async search(query: string): Promise<SearchResult> {
    const params = { q: query };
    const response = await this.client.get<SearchResult>('/search', { params });
    return response.data;
  }

  /**
   * Get top players by kill fame
   * @param offset Pagination offset (default: 0)
   * @param limit Number of results to return (default: 11)
   * @param range Time range filter (default: 'week')
   * @returns Array of top players
   */
  async topPlayerKillFame(
    offset: number = 0,
    limit: number = 11,
    range: RangeType = 'week'
  ): Promise<any> {
    const params: Record<string, any> = { offset, limit };

    if (range && ['week', 'lastWeek', 'month', 'lastMonth'].includes(range)) {
      params.range = range;
    }

    const response = await this.client.get('/playerfame', { params });
    return response.data;
  }

  /**
   * Get top guilds by kill fame
   * @param offset Pagination offset (default: 0)
   * @param limit Number of results to return (default: 11)
   * @param range Time range filter (default: 'week')
   * @returns Array of top guilds
   */
  async topGuildKillFame(
    offset: number = 0,
    limit: number = 11,
    range: RangeType = 'week'
  ): Promise<any> {
    const params: Record<string, any> = { offset, limit };

    if (range && ['week', 'lastWeek', 'month', 'lastMonth'].includes(range)) {
      params.range = range;
    }

    const response = await this.client.get('/guildfame', { params });
    return response.data;
  }

  /**
   * Get top players by kill/death fame ratio
   * @param offset Pagination offset (default: 0)
   * @param limit Number of results to return (default: 11)
   * @param range Time range filter (default: 'week')
   * @returns Array of top players by ratio
   */
  async topKillFameRatio(
    offset: number = 0,
    limit: number = 11,
    range: RangeType = 'week'
  ): Promise<any> {
    const params: Record<string, any> = { offset, limit };

    if (range && ['week', 'lastWeek', 'month', 'lastMonth'].includes(range)) {
      params.range = range;
    }

    const response = await this.client.get('/fameratio', { params });
    return response.data;
  }

  /**
   * Get top guilds by attack points
   * @param offset Pagination offset (default: 0)
   * @param limit Number of results to return (default: 11)
   * @param range Time range filter (default: 'week')
   * @returns Array of top guilds by attack
   */
  async topGuildsByAttack(
    offset: number = 0,
    limit: number = 11,
    range: RangeType = 'week'
  ): Promise<any> {
    const params: Record<string, any> = { offset, limit };

    if (range && ['week', 'lastWeek', 'month', 'lastMonth'].includes(range)) {
      params.range = range;
    }

    const response = await this.client.get('/topguildsbyattack', { params });
    return response.data;
  }

  /**
   * Get top guilds by defense points
   * @param offset Pagination offset (default: 0)
   * @param limit Number of results to return (default: 11)
   * @param range Time range filter (default: 'week')
   * @returns Array of top guilds by defense
   */
  async topGuildsByDefense(
    offset: number = 0,
    limit: number = 11,
    range: RangeType = 'week'
  ): Promise<any> {
    const params: Record<string, any> = { offset, limit };

    if (range && ['week', 'lastWeek', 'month', 'lastMonth'].includes(range)) {
      params.range = range;
    }

    const response = await this.client.get('/topguildsbydefense', { params });
    return response.data;
  }

  /**
   * Get player weapon rankings
   * @param offset Pagination offset (default: 0)
   * @param limit Number of results to return (default: 11)
   * @param range Time range filter (default: 'week')
   * @returns Player weapon ranking data
   */
  async playerWeaponRanking(
    offset: number = 0,
    limit: number = 11,
    range: RangeType = 'week'
  ): Promise<any> {
    const params: Record<string, any> = { offset, limit };

    if (range && ['week', 'lastWeek', 'month', 'lastMonth'].includes(range)) {
      params.range = range;
    }

    const response = await this.client.get('/playerweaponfame', { params });
    return response.data;
  }

  /**
   * Get battles
   * @param offset Pagination offset (default: 0)
   * @param limit Number of results to return (default: 51)
   * @param range Time range filter (optional)
   * @param sort Sort order ('recent' or 'topfame', default: 'recent')
   * @returns Array of battles
   */
  async getBattles(
    offset: number = 0,
    limit: number = 51,
    range?: RangeType,
    sort: SortType = 'recent'
  ): Promise<Battle[]> {
    const params: Record<string, any> = { offset, limit };

    if (range && ['week', 'lastWeek', 'month', 'lastMonth'].includes(range)) {
      params.range = range;
    }

    if (sort && ['recent', 'topfame'].includes(sort)) {
      params.sort = sort;
    }

    const response = await this.client.get<Battle[]>('/battles', { params });
    return response.data;
  }

  /**
   * Get weapon categories
   * @returns Array of weapon categories
   */
  async getWeaponCategories(): Promise<string[]> {
    const response = await this.client.get<string[]>('/items/_weaponCategories');
    return response.data;
  }
}
