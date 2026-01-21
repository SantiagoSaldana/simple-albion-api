/**
 * Example: Fetching guild members across all servers
 *
 * This example demonstrates how to use the simple-albion-api library
 * to fetch guild member information from all three Albion Online servers.
 *
 * Translated from the Python test program test_albion.py
 */

import { AlbionAPI, ServerType } from 'simple-albion-api';

// Test TEMPLARS_ORDER guild across all 3 servers
const servers: Record<ServerType, string> = {
  americas: 'Americas (Washington)',
  europe: 'Europe (Amsterdam)',
  asia: 'Asia (Singapore)',
};

async function fetchGuildMembers() {
  console.log('TEMPLARS_ORDER Guild Members by Server\n');
  console.log('='.repeat(60));

  for (const [serverKey, serverName] of Object.entries(servers)) {
    console.log(`\n${serverName}:`);
    console.log('-'.repeat(60));

    try {
      // Create client for this server
      const client = new AlbionAPI({ server: serverKey as ServerType });

      // Get guild ID and members
      const guildId = await client.getGuildId('TEMPLARS_ORDER');
      const guildMembers = await client.getGuildMembers(guildId);

      if (guildMembers && guildMembers.length > 0) {
        console.log(`Total members: ${guildMembers.length}\n`);
        for (const member of guildMembers) {
          console.log(`  - ${member.Name || 'Unknown'}`);
        }
      } else {
        console.log("No members found or guild doesn't exist on this server");
      }
    } catch (error: any) {
      console.log(`Error fetching data: ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(60));
}

// Run the example
fetchGuildMembers().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});
