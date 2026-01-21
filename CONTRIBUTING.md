# Contributing to Simple Albion API

Thank you for your interest in contributing to Simple Albion API! This document provides guidelines for contributing to this project.

## 🙏 About This Project

This library is a TypeScript port of the [albion-api-client](https://github.com/proelke/albion-api-client) by Patrick Roelke. When contributing, please keep in mind that we aim to maintain API compatibility with the original Python library while providing idiomatic TypeScript/Node.js implementations.

## 🐛 Reporting Bugs

If you find a bug, please create an issue with:

1. **Clear title** - Briefly describe the issue
2. **Description** - Detailed description of the problem
3. **Steps to reproduce** - How to reproduce the bug
4. **Expected behavior** - What you expected to happen
5. **Actual behavior** - What actually happened
6. **Environment** - Node.js version, OS, etc.
7. **Code sample** - Minimal code to reproduce the issue

## 💡 Suggesting Enhancements

We welcome suggestions! Please create an issue with:

1. **Clear title** - Briefly describe the enhancement
2. **Use case** - Why this enhancement would be useful
3. **Proposed solution** - How you think it could be implemented
4. **Alternatives** - Other solutions you've considered

**Note**: Please check if the enhancement exists in the original Python library first. If it doesn't, consider whether it fits the scope of this port.

## 🔧 Development Setup

### Prerequisites

- Node.js 16.0.0 or higher
- npm, yarn, or pnpm

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/yourusername/simple-albion-api.git
   cd simple-albion-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Run tests:
   ```bash
   npm test
   ```

## 📝 Pull Request Process

1. **Create a branch** - Use a descriptive name:
   ```bash
   git checkout -b feature/add-new-method
   git checkout -b fix/api-timeout-issue
   ```

2. **Make your changes**:
   - Write clear, readable code
   - Follow the existing code style
   - Add/update TypeScript types as needed
   - Add tests for new functionality
   - Update documentation (README, JSDoc comments)

3. **Test your changes**:
   ```bash
   npm run build
   npm test
   ```

4. **Commit your changes**:
   - Use clear, descriptive commit messages
   - Follow conventional commit format:
     ```
     feat: add new guild ranking method
     fix: correct parameter type in getPlayerInfo
     docs: update README with new examples
     test: add tests for event methods
     ```

5. **Push to your fork**:
   ```bash
   git push origin feature/add-new-method
   ```

6. **Create a Pull Request**:
   - Provide a clear title and description
   - Reference any related issues
   - Describe what your changes do and why

## 🎨 Code Style

- **TypeScript**: Use TypeScript for all source code
- **Formatting**: The project uses standard TypeScript conventions
- **Naming**:
  - Use camelCase for variables and functions
  - Use PascalCase for classes and types
  - Use UPPER_CASE for constants
- **Types**: Always provide explicit types, avoid `any` when possible
- **Comments**: Use JSDoc for public APIs
- **Async**: Prefer async/await over promises chains

### Example

```typescript
/**
 * Get guild members by guild ID
 * @param guildId The guild ID to fetch members for
 * @returns Promise resolving to array of guild members
 */
async getGuildMembers(guildId: string): Promise<GuildMember[]> {
  const response = await this.client.get<GuildMember[]>(`/guilds/${guildId}/members`);
  return response.data;
}
```

## 🧪 Testing

- Write tests for new functionality
- Ensure all tests pass before submitting PR
- Aim for meaningful test coverage
- Tests are located in `tests/` directory

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## 📚 Documentation

- Update README.md if adding new features
- Add JSDoc comments to all public methods
- Update examples if behavior changes
- Keep the CHANGELOG.md updated

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Assume good intentions

## ❓ Questions?

If you have questions about contributing:

1. Check existing issues and discussions
2. Review the original [albion-api-client](https://github.com/proelke/albion-api-client) documentation
3. Create a new issue with the "question" label

## 📜 License

By contributing, you agree that your contributions will be licensed under the same MIT License that covers this project.

---

Thank you for contributing to Simple Albion API! 🎉
