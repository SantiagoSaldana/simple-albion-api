/**
 * Example: Basic usage of the Albion Online API client
 *
 * This example demonstrates common API operations including:
 * - Searching for players and guilds
 * - Fetching player information
 * - Getting recent events
 * - Fetching battle data
 */

import { AlbionAPI } from 'simple-albion-api';

async function basicExample() {
  // Create a new API client (defaults to Americas server)
  const client = new AlbionAPI();

  console.log('Albion Online API - Basic Usage Examples\n');
  console.log('='.repeat(60));

  try {
    // Example 1: Search for a player or guild
    console.log('\n1. Searching for "TEMPLARS_ORDER":');
    console.log('-'.repeat(60));
    const searchResults = await client.search('TEMPLARS_ORDER');
    console.log(`Found ${searchResults.guilds.length} guild(s)`);
    console.log(`Found ${searchResults.players.length} player(s)`);

    if (searchResults.guilds.length > 0) {
      const guild = searchResults.guilds[0];
      console.log(`\nGuild: ${guild.Name} (ID: ${guild.Id})`);
      if (guild.AllianceName) {
        console.log(`Alliance: ${guild.AllianceName}`);
      }
    }

    // Example 2: Get guild information
    if (searchResults.guilds.length > 0) {
      const guildId = searchResults.guilds[0].Id;

      console.log('\n2. Fetching guild information:');
      console.log('-'.repeat(60));
      const guildInfo = await client.getGuildInfo(guildId);
      console.log(`Name: ${guildInfo.Name}`);
      console.log(`Founded: ${guildInfo.Founded}`);
      console.log(`Members: ${guildInfo.MemberCount}`);
      console.log(`Kill Fame: ${guildInfo.killFame}`);
      console.log(`Death Fame: ${guildInfo.DeathFame}`);
    }

    // Example 3: Get recent events
    console.log('\n3. Fetching recent events (limit 5):');
    console.log('-'.repeat(60));
    const events = await client.getRecentEvents(5, 0);
    console.log(`Retrieved ${events.length} recent events`);

    events.forEach((event, index) => {
      console.log(`\nEvent ${index + 1}:`);
      console.log(`  ID: ${event.EventId}`);
      console.log(`  Type: ${event.Type || 'Unknown'}`);
      if (event.Killer) {
        console.log(`  Killer: ${event.Killer.Name || 'Unknown'}`);
      }
      if (event.Victim) {
        console.log(`  Victim: ${event.Victim.Name || 'Unknown'}`);
      }
    });

    // Example 4: Get recent battles
    console.log('\n4. Fetching recent battles (limit 3):');
    console.log('-'.repeat(60));
    const battles = await client.getBattles(0, 3);
    console.log(`Retrieved ${battles.length} battles`);

    battles.forEach((battle, index) => {
      console.log(`\nBattle ${index + 1}:`);
      console.log(`  ID: ${battle.id}`);
      console.log(`  Total Fame: ${battle.totalFame}`);
      console.log(`  Total Kills: ${battle.totalKills}`);
    });

  } catch (error: any) {
    console.error('\nError:', error.message);
  }

  console.log('\n' + '='.repeat(60));
}

// Run the example
basicExample().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
