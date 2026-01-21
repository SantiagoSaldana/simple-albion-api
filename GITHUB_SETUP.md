# Setting Up GitHub Repository

Your git repository has been initialized! Here's how to push it to GitHub and publish to npm.

## Current Status

✅ Git repository initialized
✅ Initial commit created (commit: 23f24bd)
✅ 21 files committed
✅ Working tree clean
✅ Branch: `main`

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and log in
2. Click the **+** icon in the top right, then **New repository**
3. Fill in the details:
   - **Repository name**: `simple-albion-api`
   - **Description**: `TypeScript/Node.js API client for Albion Online. Port of albion-api-client by Patrick Roelke.`
   - **Public** (so others can use it)
   - **Don't** initialize with README, .gitignore, or license (we already have these)
4. Click **Create repository**

## Step 2: Connect Local Repository to GitHub

After creating the repository on GitHub, run these commands in the `simple-albion-api` directory:

```bash
# Add GitHub as remote
git remote add origin https://github.com/SantiagoSaldana/simple-albion-api.git

# Push to GitHub
git push -u origin main
```

**Or if you prefer SSH:**

```bash
# Add GitHub as remote via SSH
git remote add origin git@github.com:SantiagoSaldana/simple-albion-api.git

# Push to GitHub
git push -u origin main
```

## Step 3: Repository URLs

✅ The repository URLs in `package.json` are already configured:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/SantiagoSaldana/simple-albion-api.git"
  },
  "bugs": {
    "url": "https://github.com/SantiagoSaldana/simple-albion-api/issues"
  }
}
```

You're all set! These will be committed in the next step.

## Step 4: Add Topics to GitHub Repository

On your GitHub repository page:
1. Click the ⚙️ gear icon next to "About"
2. Add topics/tags:
   - `albion-online`
   - `albion`
   - `api-client`
   - `typescript`
   - `nodejs`
   - `gaming`
   - `api`
3. Click **Save changes**

## Step 5: Star the Original Repository

Don't forget to show appreciation to the original author:

Visit and star: https://github.com/proelke/albion-api-client

## Step 6: Publish to npm (Optional)

Once your code is on GitHub, you can publish to npm:

### First time setup:

```bash
# Login to npm (you'll need an npm account from https://www.npmjs.com)
npm login
```

### Publish:

```bash
# Make sure everything builds
npm run build
npm test

# Publish to npm
npm publish
```

Your package will be available at: `https://www.npmjs.com/package/simple-albion-api`

Users can then install it with:
```bash
npm install simple-albion-api
```

## Quick Reference Commands

```bash
# Check current status
git status

# View commit history
git log --oneline

# View remote repositories
git remote -v

# Push changes
git push

# Pull changes
git pull
```

## Repository Structure

Your repository includes:

- ✅ Source code (`src/`)
- ✅ Tests (`tests/`)
- ✅ Examples (`examples/`)
- ✅ Documentation (`README.md`, `CONTRIBUTING.md`, etc.)
- ✅ License (`LICENSE`)
- ✅ Build configuration (`tsconfig*.json`)
- ✅ Package configuration (`package.json`)

## .gitignore

The following are already ignored:
- `node_modules/`
- `dist/` (build output)
- `package-lock.json` (included but some prefer to ignore)
- IDE files (`.vscode/`, `.idea/`)
- Test coverage (`coverage/`)
- Logs and temp files

## Need Help?

- [GitHub documentation](https://docs.github.com)
- [npm publishing guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Git basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)

---

Once published, consider:
- Adding a GitHub Actions workflow for CI/CD
- Setting up automated testing
- Creating GitHub releases for versions
- Adding badges to README (build status, npm version, downloads, etc.)
