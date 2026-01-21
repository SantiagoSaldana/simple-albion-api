# Setup Guide for simple-albion-api

This guide covers the important setup details for using the simple-albion-api library, especially when working with TypeScript and modern ES modules.

## Quick Start

```bash
npm install simple-albion-api
```

## Important: Top-Level Await Support

The examples and most TypeScript usage of this library use **top-level await** (calling `await` outside of an async function). This is a modern JavaScript feature that requires specific configuration.

### Problem

If you see this error:
```
SyntaxError: Cannot use import statement outside a module
```

Or this error:
```
ERROR: Top-level await is currently not supported with the "cjs" output format
```

You need to configure your project for ES modules.

## Solutions

### Option 1: Use tsx (Recommended) ⭐

The easiest solution is to use `tsx`, which automatically handles TypeScript, ES modules, and top-level await:

```bash
# Install tsx (optional - npx will download it automatically)
npm install -D tsx

# Run your script
npx tsx your-script.ts
```

**Pros:**
- No configuration needed
- Works immediately
- Handles all module formats
- Supports top-level await out of the box

### Option 2: Configure for ES Modules

Add this to your `package.json`:

```json
{
  "type": "module"
}
```

Then run with ts-node:
```bash
npx ts-node your-script.ts
```

**Pros:**
- Standard ES module setup
- Works with ts-node

**Cons:**
- Requires package.json modification
- Affects your entire project

### Option 3: Wrap Code in Async Function

Modify your code to wrap everything in an async function:

```typescript
import { AlbionAPI } from 'simple-albion-api';

async function main() {
  const client = new AlbionAPI();

  const guildId = await client.getGuildId('TEMPLARS_ORDER');
  const members = await client.getGuildMembers(guildId);
  console.log(members);
}

main().catch(console.error);
```

Then run normally:
```bash
npx ts-node your-script.ts
```

**Pros:**
- No configuration changes needed
- Works with any setup

**Cons:**
- Requires code modification
- Extra boilerplate

## Running the Included Examples

### After npm install

The examples are included in the package:

```bash
# Copy examples to your project
cp node_modules/simple-albion-api/examples/*.ts .

# Run with tsx
npx tsx guild-members.ts
```

### From Source Repository

If you've cloned the repository:

```bash
# Install dependencies
npm install

# Run using npm scripts
npm run example:guild
npm run example:basic

# Or run directly
npx ts-node --project tsconfig.examples.json examples/guild-members.ts
```

## CommonJS (JavaScript) Projects

If you're using plain JavaScript with CommonJS (no TypeScript), you don't need any special setup:

```javascript
const { AlbionAPI } = require('simple-albion-api');

async function main() {
  const client = new AlbionAPI();
  const results = await client.search('TEMPLARS_ORDER');
  console.log(results);
}

main().catch(console.error);
```

Run with:
```bash
node your-script.js
```

## Summary

| Scenario | Solution | Command |
|----------|----------|---------|
| TypeScript with top-level await | Use tsx | `npx tsx script.ts` |
| TypeScript, configured project | Add `"type": "module"` | `npx ts-node script.ts` |
| TypeScript, no config changes | Wrap in async function | `npx ts-node script.ts` |
| JavaScript (CommonJS) | No special setup | `node script.js` |
| JavaScript (ES modules) | Add `"type": "module"` | `node script.js` |

## Additional Resources

- [TypeScript ES Modules Documentation](https://www.typescriptlang.org/docs/handbook/esm-node.html)
- [Node.js ES Modules](https://nodejs.org/api/esm.html)
- [tsx on npm](https://www.npmjs.com/package/tsx)
- [Top-level await proposal](https://github.com/tc39/proposal-top-level-await)

## Troubleshooting

### "Module not found: 'simple-albion-api'"

Make sure you've installed the package:
```bash
npm install simple-albion-api
```

### "Cannot find module '../src'"

This error occurs when trying to run the examples directly from node_modules. Either:
1. Copy the examples to your project directory
2. Update the import path to use `'simple-albion-api'` instead of `'../src'`

### API timeout or connection errors

- Check your internet connection
- Try a different server: `americas`, `europe`, or `asia`
- The Albion Online API servers might be temporarily unavailable

## Project Changes Made

The following changes were made to the project to support better developer experience:

1. **Added `examples` folder to npm package** - Examples are now included when you `npm install` the package
2. **Updated README.md** - Added comprehensive documentation about ES modules and top-level await
3. **Created SETUP_GUIDE.md** - Detailed setup instructions for different scenarios
4. **Documented tsx usage** - Recommended `tsx` as the easiest way to run TypeScript examples

These changes ensure that users can easily run the examples and understand the module system requirements without frustration.
