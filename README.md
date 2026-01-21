# Simple Albion API

A TypeScript/Node.js API client for Albion Online, providing easy access to game information including players, guilds, events, and battles.

## 🙏 Attribution

This library is a **TypeScript port** of the original Python library [**albion-api-client**](https://github.com/proelke/albion-api-client) created by **Patrick Roelke** ([@proelke](https://github.com/proelke)).

All credit for the API design and original implementation goes to Patrick Roelke. This port maintains the same API interface and functionality while adapting it for the TypeScript/Node.js ecosystem.

- **Original Python Library**: [albion-api-client](https://github.com/proelke/albion-api-client)
- **Original Author**: Patrick Roelke (proelke@gmail.com)
- **License**: MIT

## ✨ Features

- **Full TypeScript Support** - Complete type definitions for all API responses
- **Dual Module Support** - Works with both CommonJS (`require`) and ES Modules (`import`)
- **Multi-Server Support** - Access data from Americas, Europe, and Asia servers
- **Comprehensive API Coverage** - Player stats, guild information, events, battles, and more
- **Promise-Based** - Modern async/await syntax
- **Lightweight** - Minimal dependencies (only axios)

## 📦 Installation

### Install from npm

```bash
npm install simple-albion-api
```

### Install from GitHub

```bash
npm install github:SantiagoSaldana/simple-albion-api
```

After installing from GitHub, you can run the included examples:

```bash
# Run the guild members example
npx tsx node_modules/simple-albion-api/examples/guild-members.ts

# Or run the basic usage example
npx tsx node_modules/simple-albion-api/examples/basic-usage.ts
```

> **📘 New to TypeScript or ES Modules?** Check out the [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions on running TypeScript code with top-level await and ES modules.

## 🚀 Quick Start

### TypeScript / ES Modules with Top-Level Await

To use top-level await (without wrapping in an async function), you need ES module support:

```typescript
// my-script.ts
import { AlbionAPI } from 'simple-albion-api';

const client = new AlbionAPI();

// Search for a guild
const searchResults = await client.search('TEMPLARS_ORDER');
console.log(searchResults.guilds);

// Get guild members
const guildId = await client.getGuildId('TEMPLARS_ORDER');
const members = await client.getGuildMembers(guildId);
console.log(members);
```

**To run with top-level await, use one of these methods:**

```bash
# Method 1: Using tsx (recommended)
npx tsx my-script.ts

# Method 2: Using ts-node with module config
# Add "type": "module" to package.json, then:
npx ts-node my-script.ts
```

### TypeScript / ES Modules with Async Function

Alternatively, wrap your code in an async function (works without special configuration):

```typescript
import { AlbionAPI } from 'simple-albion-api';

async function main() {
  const client = new AlbionAPI();

  const searchResults = await client.search('TEMPLARS_ORDER');
  console.log(searchResults.guilds);

  const guildId = await client.getGuildId('TEMPLARS_ORDER');
  const members = await client.getGuildMembers(guildId);
  console.log(members);
}

main().catch(console.error);
```

**Run this version:**
```bash
npx ts-node my-script.ts
```

### JavaScript / CommonJS

```javascript
const { AlbionAPI } = require('simple-albion-api');

async function main() {
  const client = new AlbionAPI();

  // Search for a player
  const results = await client.search('PlayerName');
  console.log(results.players);
}

main().catch(console.error);
```

## 🌍 Server Selection

The library supports all three Albion Online servers:

```typescript
import { AlbionAPI } from 'simple-albion-api';

// Americas (default)
const americasClient = new AlbionAPI({ server: 'americas' });

// Europe
const europeClient = new AlbionAPI({ server: 'europe' });

// Asia
const asiaClient = new AlbionAPI({ server: 'asia' });
```

## 📖 API Documentation

### Player Methods

#### `getPlayerId(playerName: string): Promise<string>`
Get player ID by player name.

```typescript
const playerId = await client.getPlayerId('PlayerName');
```

#### `getPlayerInfo(playerId: string): Promise<PlayerInfo>`
Get detailed player information.

```typescript
const playerInfo = await client.getPlayerInfo(playerId);
console.log(playerInfo.Name, playerInfo.KillFame);
```

#### `getPlayerTopkills(playerId: string, offset?: number, limit?: number, range?: RangeType): Promise<Event[]>`
Get player's top kills.

```typescript
const topKills = await client.getPlayerTopkills(playerId, 0, 10, 'week');
```

#### `getPlayerSolokills(playerId: string, offset?: number, limit?: number, range?: RangeType): Promise<Event[]>`
Get player's solo kills.

```typescript
const soloKills = await client.getPlayerSolokills(playerId, 0, 10, 'month');
```

#### `getPlayerDeath(playerId: string): Promise<Event[]>`
Get player's deaths.

```typescript
const deaths = await client.getPlayerDeath(playerId);
```

### Guild Methods

#### `getGuildId(guildName: string): Promise<string>`
Get guild ID by guild name.

```typescript
const guildId = await client.getGuildId('GuildName');
```

#### `getGuildInfo(guildId: string): Promise<GuildInfo>`
Get detailed guild information.

```typescript
const guildInfo = await client.getGuildInfo(guildId);
console.log(guildInfo.Name, guildInfo.MemberCount);
```

#### `getGuildMembers(guildId: string): Promise<GuildMember[]>`
Get list of guild members.

```typescript
const members = await client.getGuildMembers(guildId);
members.forEach(member => console.log(member.Name));
```

#### `getGuildStats(guildId: string): Promise<any>`
Get guild statistics.

```typescript
const stats = await client.getGuildStats(guildId);
```

#### `getGuildTopKills(guildId: string, offset?: number, limit?: number, range?: RangeType): Promise<any>`
Get guild's top kills.

```typescript
const topKills = await client.getGuildTopKills(guildId, 0, 20, 'week');
```

### Event Methods

#### `getEvent(eventId: number): Promise<Event>`
Get specific event by ID.

```typescript
const event = await client.getEvent(123456);
```

#### `getRecentEvents(limit?: number, offset?: number): Promise<Event[]>`
Get recent events.

```typescript
const events = await client.getRecentEvents(50, 0);
```

#### `getEventsBetween(startEvent: number, endEvent: number): Promise<Event[]>`
Get events between two event IDs.

```typescript
const events = await client.getEventsBetween(100000, 100100);
```

### Battle Methods

#### `getBattles(offset?: number, limit?: number, range?: RangeType, sort?: SortType): Promise<Battle[]>`
Get battles with optional filtering.

```typescript
const battles = await client.getBattles(0, 20, 'week', 'topfame');
```

### Search Methods

#### `search(query: string): Promise<SearchResult>`
Search for players and guilds.

```typescript
const results = await client.search('SearchTerm');
console.log(results.players);
console.log(results.guilds);
```

### Ranking Methods

#### `topPlayerKillFame(offset?: number, limit?: number, range?: RangeType): Promise<any>`
Get top players by kill fame.

```typescript
const topPlayers = await client.topPlayerKillFame(0, 50, 'month');
```

#### `topGuildKillFame(offset?: number, limit?: number, range?: RangeType): Promise<any>`
Get top guilds by kill fame.

```typescript
const topGuilds = await client.topGuildKillFame(0, 50, 'week');
```

#### `topGuildsByAttack(offset?: number, limit?: number, range?: RangeType): Promise<any>`
Get top guilds by attack points.

#### `topGuildsByDefense(offset?: number, limit?: number, range?: RangeType): Promise<any>`
Get top guilds by defense points.

#### `playerWeaponRanking(offset?: number, limit?: number, range?: RangeType): Promise<any>`
Get player weapon rankings.

### Other Methods

#### `getServerStatus(server?: ServerStatusType): Promise<any>`
Get Albion Online server status.

```typescript
const status = await client.getServerStatus('live');
```

#### `getWeaponCategories(): Promise<string[]>`
Get list of weapon categories.

```typescript
const categories = await client.getWeaponCategories();
```

## 📝 Types

The library exports TypeScript types for all API responses:

```typescript
import type {
  ServerType,
  RangeType,
  SortType,
  SearchResult,
  PlayerInfo,
  GuildInfo,
  GuildMember,
  Event,
  Battle,
} from 'simple-albion-api';
```

### Available Types

- `ServerType`: `'americas' | 'europe' | 'asia'`
- `RangeType`: `'week' | 'lastWeek' | 'month' | 'lastMonth'`
- `SortType`: `'recent' | 'topfame'`
- `ServerStatusType`: `'live' | 'staging'`

## 🧪 Running Tests

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🔨 Building from Source

```bash
# Install dependencies
npm install

# Build the library
npm run build

# This will create:
# - dist/cjs/     - CommonJS modules
# - dist/esm/     - ES modules
# - dist/types/   - TypeScript definitions
```

## 📄 Examples

The library includes example scripts demonstrating API usage.

### Available Examples

- `basic-usage.ts` - Comprehensive API usage examples
- `guild-members.ts` - Fetch guild members across all servers

### Running Examples

Install from GitHub and run examples:

```bash
# 1. Install from GitHub
npm install github:SantiagoSaldana/simple-albion-api

# 2. Run examples
npx tsx node_modules/simple-albion-api/examples/basic-usage.ts
npx tsx node_modules/simple-albion-api/examples/guild-members.ts
```

### Running from Source Repository

If you've cloned the repository:

```bash
npm install
npm run build
npx tsx examples/basic-usage.ts
npx tsx examples/guild-members.ts
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

MIT License - see the [LICENSE](LICENSE) file for details.

This project maintains the same MIT license as the original [albion-api-client](https://github.com/proelke/albion-api-client) by Patrick Roelke.

## 🔗 Links

- **Original Python Library**: [albion-api-client](https://github.com/proelke/albion-api-client)
- **Albion Online**: [Official Website](https://albiononline.com/)
- **Albion Online API Documentation**: [Developer Portal](https://albiononline.com/developers)

## ⚠️ Disclaimer

This is an unofficial API client. It is not affiliated with or endorsed by Sandbox Interactive GmbH or Albion Online.

## 💬 Support

If you encounter any issues or have questions:

1. Check the [examples](./examples) directory
2. Review the [original Python library documentation](https://github.com/proelke/albion-api-client)
3. Open an issue on GitHub

---

**Made with ❤️ for the Albion Online community**

*Ported from [albion-api-client](https://github.com/proelke/albion-api-client) by Patrick Roelke*
