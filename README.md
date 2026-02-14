# Yuque MCP Server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-1.0-green.svg)](https://modelcontextprotocol.io/)

Official-quality MCP (Model Context Protocol) server for Yuque (语雀) API. This server exposes Yuque's knowledge base capabilities to AI assistants through the standardized MCP interface.

[中文文档](./README.zh-CN.md)

## Features

- **Complete API Coverage**: All 25 Yuque API endpoints implemented
- **Dual Transport**: Supports both stdio and streamable-http transports
- **Type-Safe**: Full TypeScript implementation with strict mode
- **AI-Optimized**: Response formatting designed to minimize token usage
- **Flexible Auth**: Environment variable or CLI argument authentication
- **Well-Tested**: Comprehensive test coverage with vitest
- **Production-Ready**: Follows Ant Design open-source standards

## Installation

```bash
npm install -g yuque-mcp-server
```

Or use directly with npx:

```bash
npx yuque-mcp-server --token=YOUR_TOKEN
```

## Quick Start

### 1. Get Your Yuque API Token

Visit [Yuque Settings](https://www.yuque.com/settings/tokens) to generate your API token.

### 2. Run the Server

**Stdio mode (for MCP clients):**

```bash
export YUQUE_TOKEN=your_token_here
yuque-mcp-server
```

Or with CLI argument:

```bash
yuque-mcp-server --token=your_token_here
```

**HTTP mode (for testing):**

```bash
export YUQUE_TOKEN=your_token_here
npm start
```

The server will run on `http://localhost:3000` by default.

## Available Tools

### User & Groups (2 tools)
- `yuque_get_user` - Get current user information
- `yuque_list_groups` - List user's groups/teams

### Search (1 tool)
- `yuque_search` - Search documents, repos, or users

### Repositories (5 tools)
- `yuque_list_repos` - List repos for user or group
- `yuque_get_repo` - Get repo details
- `yuque_create_repo` - Create new repo
- `yuque_update_repo` - Update repo
- `yuque_delete_repo` - Delete repo

### Documents (5 tools)
- `yuque_list_docs` - List documents in repo
- `yuque_get_doc` - Get document with full content
- `yuque_create_doc` - Create new document
- `yuque_update_doc` - Update document
- `yuque_delete_doc` - Delete document

### Table of Contents (2 tools)
- `yuque_get_toc` - Get repo TOC
- `yuque_update_toc` - Update repo TOC

### Document Versions (2 tools)
- `yuque_list_doc_versions` - List document versions
- `yuque_get_doc_version` - Get specific version

### Group Management (3 tools)
- `yuque_list_group_members` - List group members
- `yuque_update_group_member` - Update member role
- `yuque_remove_group_member` - Remove member

### Statistics (4 tools)
- `yuque_group_stats` - Group statistics
- `yuque_group_member_stats` - Member statistics
- `yuque_group_book_stats` - Book statistics
- `yuque_group_doc_stats` - Document statistics

### Utility (1 tool)
- `yuque_hello` - Test API connectivity

## Configuration

### Environment Variables

- `YUQUE_TOKEN` - Your Yuque API token (required)
- `PORT` - HTTP server port (default: 3000, HTTP mode only)

### MCP Client Configuration

Add to your MCP client configuration (e.g., Claude Desktop):

```json
{
  "mcpServers": {
    "yuque": {
      "command": "yuque-mcp-server",
      "env": {
        "YUQUE_TOKEN": "your_token_here"
      }
    }
  }
}
```

## Development

```bash
# Clone the repository
git clone https://github.com/yourusername/yuque-mcp-server.git
cd yuque-mcp-server

# Install dependencies
npm install

# Run tests
npm test

# Run with coverage
npm run test:coverage

# Build
npm run build

# Development mode with hot reload
npm run dev

# Lint
npm run lint

# Format
npm run format
```

## Architecture

```
src/
├── index.ts              — HTTP server entry
├── cli.ts                — CLI entry (stdio)
├── server.ts             — MCP server core
├── tools/                — Tool implementations
│   ├── user.ts
│   ├── repo.ts
│   ├── doc.ts
│   ├── toc.ts
│   ├── search.ts
│   ├── group.ts
│   ├── stats.ts
│   └── version.ts
├── services/
│   ├── yuque-client.ts   — Yuque API client
│   └── types.ts          — Type definitions
└── utils/
    ├── format.ts         — Response formatting
    └── error.ts          — Error handling
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## Security

For security issues, please see [SECURITY.md](./SECURITY.md).

## License

[MIT](./LICENSE)

## Links

- [Yuque API Documentation](https://www.yuque.com/yuque/developer/api)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Yuque Official Website](https://www.yuque.com/)

## Acknowledgments

This project is inspired by the [Notion MCP Server](https://github.com/makenotion/notion-mcp-server) and follows Ant Design open-source standards.
