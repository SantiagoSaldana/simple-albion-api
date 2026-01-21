/**
 * Unit tests for AlbionAPI class
 */

import { AlbionAPI } from '../src/AlbionAPI';

describe('AlbionAPI', () => {
  describe('Constructor', () => {
    it('should create an instance with default server (americas)', () => {
      const client = new AlbionAPI();
      expect(client).toBeInstanceOf(AlbionAPI);
    });

    it('should create an instance with europe server', () => {
      const client = new AlbionAPI({ server: 'europe' });
      expect(client).toBeInstanceOf(AlbionAPI);
    });

    it('should create an instance with asia server', () => {
      const client = new AlbionAPI({ server: 'asia' });
      expect(client).toBeInstanceOf(AlbionAPI);
    });

    it('should throw error for invalid server', () => {
      expect(() => {
        // @ts-expect-error - Testing invalid server
        new AlbionAPI({ server: 'invalid' });
      }).toThrow("Invalid server 'invalid'");
    });
  });

  describe('URL generation', () => {
    it('should generate correct base URL for americas server', () => {
      const client = new AlbionAPI({ server: 'americas' });
      // Access private method through any for testing
      const url = (client as any).url('/test');
      expect(url).toBe('https://gameinfo.albiononline.com/api/gameinfo/test');
    });

    it('should generate correct base URL for europe server', () => {
      const client = new AlbionAPI({ server: 'europe' });
      const url = (client as any).url('/test');
      expect(url).toBe('https://gameinfo-ams.albiononline.com/api/gameinfo/test');
    });

    it('should generate correct base URL for asia server', () => {
      const client = new AlbionAPI({ server: 'asia' });
      const url = (client as any).url('/test');
      expect(url).toBe('https://gameinfo-sgp.albiononline.com/api/gameinfo/test');
    });
  });

  describe('API Methods', () => {
    let client: AlbionAPI;

    beforeEach(() => {
      client = new AlbionAPI();
    });

    // Note: These are integration tests that require network access
    // In a production environment, you'd want to mock axios responses

    it('should have search method', () => {
      expect(typeof client.search).toBe('function');
    });

    it('should have getPlayerId method', () => {
      expect(typeof client.getPlayerId).toBe('function');
    });

    it('should have getPlayerInfo method', () => {
      expect(typeof client.getPlayerInfo).toBe('function');
    });

    it('should have getGuildId method', () => {
      expect(typeof client.getGuildId).toBe('function');
    });

    it('should have getGuildMembers method', () => {
      expect(typeof client.getGuildMembers).toBe('function');
    });

    it('should have getGuildInfo method', () => {
      expect(typeof client.getGuildInfo).toBe('function');
    });

    it('should have getRecentEvents method', () => {
      expect(typeof client.getRecentEvents).toBe('function');
    });

    it('should have getBattles method', () => {
      expect(typeof client.getBattles).toBe('function');
    });
  });

  describe('Server Status', () => {
    let client: AlbionAPI;

    beforeEach(() => {
      client = new AlbionAPI();
    });

    it('should throw error for invalid server status type', async () => {
      await expect(async () => {
        // @ts-expect-error - Testing invalid server type
        await client.getServerStatus('invalid');
      }).rejects.toThrow("Server must be 'live' or 'staging'");
    });
  });
});
