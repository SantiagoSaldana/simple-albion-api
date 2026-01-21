# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-20

### Added
- Initial release of simple-albion-api
- TypeScript port of albion-api-client by Patrick Roelke
- Full API coverage for Albion Online game information endpoints
- Support for all three servers (Americas, Europe, Asia)
- Complete TypeScript type definitions
- Dual module support (CommonJS and ES Modules)
- Player-related methods:
  - `getPlayerId()`, `getPlayerInfo()`, `getPlayerTopkills()`, `getPlayerSolokills()`, `getPlayerDeath()`
- Guild-related methods:
  - `getGuildId()`, `getGuildInfo()`, `getGuildMembers()`, `getGuildStats()`, `getGuildTopKills()`
- Event methods:
  - `getEvent()`, `getRecentEvents()`, `getEventsBetween()`
- Battle methods:
  - `getBattles()`
- Ranking methods:
  - `topPlayerKillFame()`, `topGuildKillFame()`, `topGuildsByAttack()`, `topGuildsByDefense()`, `playerWeaponRanking()`
- Search functionality with `search()`
- Server status checking with `getServerStatus()`
- Jest testing framework setup
- Comprehensive documentation and examples
- MIT License (matching original library)

### Notes
- This is a direct port from the Python library [albion-api-client](https://github.com/proelke/albion-api-client)
- All credit for the original design and implementation goes to Patrick Roelke
