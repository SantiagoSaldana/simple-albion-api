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
import type { RangeType, SortType, ServerStatusType, SearchResult, PlayerInfo, GuildInfo, GuildMember, Event, Battle, AlbionAPIConfig } from './types';
export declare class AlbionAPI {
    private static readonly SERVERS;
    private baseUrl;
    private client;
    /**
     * Creates a new Albion Online API client
     * @param config Configuration object with optional server selection
     */
    constructor(config?: AlbionAPIConfig);
    private url;
    /**
     * Get player ID by player name
     * @param playerName The name of the player to search for
     * @returns The player ID
     */
    getPlayerId(playerName: string): Promise<string>;
    /**
     * Get player information by player ID
     * @param playerId The player ID
     * @returns Player information object
     */
    getPlayerInfo(playerId: string): Promise<PlayerInfo>;
    /**
     * Get player's top kills
     * @param playerId The player ID
     * @param offset Pagination offset (default: 0)
     * @param limit Number of results to return (default: 11)
     * @param range Time range filter (default: 'week')
     * @returns Array of kill events
     */
    getPlayerTopkills(playerId: string, offset?: number, limit?: number, range?: RangeType): Promise<Event[]>;
    /**
     * Get player's solo kills
     * @param playerId The player ID
     * @param offset Pagination offset (default: 0)
     * @param limit Number of results to return (default: 11)
     * @param range Time range filter (default: 'week')
     * @returns Array of kill events
     */
    getPlayerSolokills(playerId: string, offset?: number, limit?: number, range?: RangeType): Promise<Event[]>;
    /**
     * Get player's deaths
     * @param playerId The player ID
     * @returns Array of death events
     */
    getPlayerDeath(playerId: string): Promise<Event[]>;
    /**
     * Get guild ID by guild name
     * @param guildName The name of the guild to search for
     * @returns The guild ID
     */
    getGuildId(guildName: string): Promise<string>;
    /**
     * Get guild information by guild ID
     * @param guildId The guild ID
     * @returns Guild information object
     */
    getGuildInfo(guildId: string): Promise<GuildInfo>;
    /**
     * Get guild data by guild ID
     * @param guildId The guild ID
     * @returns Guild data object
     */
    getGuildData(guildId: string): Promise<any>;
    /**
     * Get guild's top kills
     * @param guildId The guild ID
     * @param offset Pagination offset (default: 0)
     * @param limit Number of results to return (default: 11)
     * @param range Time range filter (default: 'week')
     * @returns Array of top kills
     */
    getGuildTopKills(guildId: string, offset?: number, limit?: number, range?: RangeType): Promise<any>;
    /**
     * Get guild statistics
     * @param guildId The guild ID
     * @returns Guild statistics object
     */
    getGuildStats(guildId: string): Promise<any>;
    /**
     * Get guild members
     * @param guildId The guild ID
     * @returns Array of guild members
     */
    getGuildMembers(guildId: string): Promise<GuildMember[]>;
    /**
     * Get guild feud information
     * @param guildId The guild ID
     * @param rivalGuildId The rival guild ID
     * @returns Feud information
     */
    getGuildFeud(guildId: string, rivalGuildId: string): Promise<any>;
    /**
     * Get server status
     * @param server Server type ('live' or 'staging', default: 'live')
     * @returns Server status object
     */
    getServerStatus(server?: ServerStatusType): Promise<any>;
    /**
     * Get event by ID
     * @param eventId The event ID
     * @returns Event information
     */
    getEvent(eventId: number): Promise<Event>;
    /**
     * Get recent events
     * @param limit Number of results to return (default: 50)
     * @param offset Pagination offset (default: 0)
     * @returns Array of events
     */
    getRecentEvents(limit?: number, offset?: number): Promise<Event[]>;
    /**
     * Get events between two event IDs
     * @param startEvent Starting event ID
     * @param endEvent Ending event ID
     * @returns Array of events
     */
    getEventsBetween(startEvent: number, endEvent: number): Promise<Event[]>;
    /**
     * Get guild matches
     * @param matchId The match ID
     * @param offset Pagination offset (default: 0)
     * @param limit Number of results to return (default: 6)
     * @returns Guild match data
     */
    getGuildmatches(matchId: string, offset?: number, limit?: number): Promise<any>;
    /**
     * Get top guild matches
     * @returns Top guild matches
     */
    getGuildmatchesTop(): Promise<any>;
    /**
     * Get next guild matches
     * @param offset Pagination offset (default: 0)
     * @param limit Number of results to return (default: 11)
     * @returns Array of upcoming matches
     */
    getGuildmatchesNext(offset?: number, limit?: number): Promise<any>;
    /**
     * Get past guild matches
     * @param offset Pagination offset (default: 0)
     * @param limit Number of results to return (default: 51)
     * @returns Array of past matches
     */
    getGuildmatchesPast(offset?: number, limit?: number): Promise<any>;
    /**
     * Get guild match history between two guilds
     * @param guildId The guild ID
     * @param rivalGuildId The rival guild ID
     * @returns Match history
     */
    getGuildmatchesHistory(guildId: string, rivalGuildId: string): Promise<any>;
    /**
     * Search for players and guilds
     * @param query The search query
     * @returns Search results containing players and guilds
     */
    search(query: string): Promise<SearchResult>;
    /**
     * Get top players by kill fame
     * @param offset Pagination offset (default: 0)
     * @param limit Number of results to return (default: 11)
     * @param range Time range filter (default: 'week')
     * @returns Array of top players
     */
    topPlayerKillFame(offset?: number, limit?: number, range?: RangeType): Promise<any>;
    /**
     * Get top guilds by kill fame
     * @param offset Pagination offset (default: 0)
     * @param limit Number of results to return (default: 11)
     * @param range Time range filter (default: 'week')
     * @returns Array of top guilds
     */
    topGuildKillFame(offset?: number, limit?: number, range?: RangeType): Promise<any>;
    /**
     * Get top players by kill/death fame ratio
     * @param offset Pagination offset (default: 0)
     * @param limit Number of results to return (default: 11)
     * @param range Time range filter (default: 'week')
     * @returns Array of top players by ratio
     */
    topKillFameRatio(offset?: number, limit?: number, range?: RangeType): Promise<any>;
    /**
     * Get top guilds by attack points
     * @param offset Pagination offset (default: 0)
     * @param limit Number of results to return (default: 11)
     * @param range Time range filter (default: 'week')
     * @returns Array of top guilds by attack
     */
    topGuildsByAttack(offset?: number, limit?: number, range?: RangeType): Promise<any>;
    /**
     * Get top guilds by defense points
     * @param offset Pagination offset (default: 0)
     * @param limit Number of results to return (default: 11)
     * @param range Time range filter (default: 'week')
     * @returns Array of top guilds by defense
     */
    topGuildsByDefense(offset?: number, limit?: number, range?: RangeType): Promise<any>;
    /**
     * Get player weapon rankings
     * @param offset Pagination offset (default: 0)
     * @param limit Number of results to return (default: 11)
     * @param range Time range filter (default: 'week')
     * @returns Player weapon ranking data
     */
    playerWeaponRanking(offset?: number, limit?: number, range?: RangeType): Promise<any>;
    /**
     * Get battles
     * @param offset Pagination offset (default: 0)
     * @param limit Number of results to return (default: 51)
     * @param range Time range filter (optional)
     * @param sort Sort order ('recent' or 'topfame', default: 'recent')
     * @returns Array of battles
     */
    getBattles(offset?: number, limit?: number, range?: RangeType, sort?: SortType): Promise<Battle[]>;
    /**
     * Get weapon categories
     * @returns Array of weapon categories
     */
    getWeaponCategories(): Promise<string[]>;
}
//# sourceMappingURL=AlbionAPI.d.ts.map