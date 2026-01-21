# Running Examples

This guide shows you how to run the example scripts included with simple-albion-api.

## Quick Start

### Using npm scripts (Easiest)

```bash
# Run the guild members example (port of test_albion.py)
npm run example:guild

# Run the basic usage example
npm run example:basic
```

## Available Examples

### 1. Guild Members Example (`examples/guild-members.ts`)

This is a direct port of the original `test_albion.py` Python script. It fetches TEMPLARS_ORDER guild members from all three servers (Americas, Europe, and Asia).

**Run it:**
```bash
npm run example:guild
```

**Expected output:**
```
TEMPLARS_ORDER Guild Members by Server

============================================================

Americas (Washington):
------------------------------------------------------------
Total members: 64

  - AlexanderMilan
  - Kugnir
  - Azrendor
  ...
```

### 2. Basic Usage Example (`examples/basic-usage.ts`)

Demonstrates common API operations including searching, fetching player/guild info, getting events, and battles.

**Run it:**
```bash
npm run example:basic
```

## Alternative Methods

### Method 1: Using npx ts-node

```bash
npx ts-node --project tsconfig.examples.json examples/guild-members.ts
npx ts-node --project tsconfig.examples.json examples/basic-usage.ts
```

### Method 2: Compile and run

```bash
# Compile TypeScript to JavaScript
npx tsc examples/guild-members.ts --outDir examples/compiled --module commonjs --esModuleInterop

# Run the compiled JavaScript
node examples/compiled/guild-members.js
```

### Method 3: Using the built library

After building the library with `npm run build`, you can create a simple JavaScript file:

```javascript
// test.js
const { AlbionAPI } = require('./dist/cjs/index.js');

async function test() {
  const client = new AlbionAPI({ server: 'americas' });
  const results = await client.search('TEMPLARS_ORDER');
  console.log(results);
}

test();
```

Then run it:
```bash
node test.js
```

## Creating Your Own Examples

Create a new TypeScript file in the `examples/` directory:

```typescript
// examples/my-example.ts
import { AlbionAPI } from '../src';

async function myExample() {
  const client = new AlbionAPI({ server: 'americas' });

  // Your code here
  const guildId = await client.getGuildId('GuildName');
  const members = await client.getGuildMembers(guildId);

  console.log(members);
}

myExample();
```

Run it:
```bash
npx ts-node --project tsconfig.examples.json examples/my-example.ts
```

Or add a script to `package.json`:
```json
"scripts": {
  "example:my": "ts-node --project tsconfig.examples.json examples/my-example.ts"
}
```

Then run:
```bash
npm run example:my
```

## Troubleshooting

### "Cannot use import statement outside a module"

Make sure you're using the `--project tsconfig.examples.json` flag:
```bash
ts-node --project tsconfig.examples.json examples/guild-members.ts
```

### "Module not found"

Make sure you've installed dependencies:
```bash
npm install
```

### API errors or timeouts

- Check your internet connection
- The Albion Online API servers might be temporarily unavailable
- Try with a different server (americas, europe, asia)

## Next Steps

- Check out the full API documentation in [README.md](./README.md)
- Explore the [src/AlbionAPI.ts](./src/AlbionAPI.ts) file to see all available methods
- Read the TypeScript type definitions in [src/types.ts](./src/types.ts)
