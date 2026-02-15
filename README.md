# Yuque MCP Server

[![CI](https://github.com/chen201724/yuque-mcp-server/actions/workflows/ci.yml/badge.svg)](https://github.com/chen201724/yuque-mcp-server/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-1.0-green.svg)](https://modelcontextprotocol.io/)

MCP server for [Yuque (语雀)](https://www.yuque.com/) — expose your Yuque knowledge base to AI assistants through the [Model Context Protocol](https://modelcontextprotocol.io/).

[中文文档](./README.zh-CN.md)

## Features

- **25 Tools** — Complete coverage of Yuque API (docs, repos, search, groups, stats, TOC, versions)
- **Stdio Transport** — Works with Claude Desktop, Cursor, Claude Code, Windsurf, and any MCP-compatible client
- **Type-Safe** — Full TypeScript with strict mode + Zod parameter validation
- **AI-Optimized** — Response formatting designed to minimize token usage
- **Well-Tested** — Unit tests with vitest, CI on Node 18/20/22

## Quick Start

### 1. Get Your Yuque API Token

Visit [Yuque Developer Settings](https://www.yuque.com/settings/tokens) to generate a personal API token.

### 2. Configure Your MCP Client

#### Claude Code

```bash
claude mcp add yuque -- npx -y yuque-mcp --token=YOUR_TOKEN
```

Or add to `~/.claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "yuque": {
      "command": "npx",
      "args": ["-y", "yuque-mcp"],
      "env": {
        "YUQUE_TOKEN": "YOUR_TOKEN"
      }
    }
  }
}
```

#### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "yuque": {
      "command": "npx",
      "args": ["-y", "yuque-mcp"],
      "env": {
        "YUQUE_TOKEN": "YOUR_TOKEN"
      }
    }
  }
}
```

#### Cursor

Add to `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "yuque": {
      "command": "npx",
      "args": ["-y", "yuque-mcp"],
      "env": {
        "YUQUE_TOKEN": "YOUR_TOKEN"
      }
    }
  }
}
```

#### Global Install (alternative)

```bash
npm install -g yuque-mcp
export YUQUE_TOKEN=your_token_here
yuque-mcp
```

## Available Tools

| Category | Tool | Description |
|----------|------|-------------|
| **User** | `yuque_get_user` | Get current user info |
| **User** | `yuque_list_groups` | List user's groups/teams |
| **Search** | `yuque_search` | Search docs, repos, or users |
| **Repos** | `yuque_list_repos` | List repos for user or group |
| **Repos** | `yuque_get_repo` | Get repo details |
| **Repos** | `yuque_create_repo` | Create new repo |
| **Repos** | `yuque_update_repo` | Update repo settings |
| **Repos** | `yuque_delete_repo` | Delete repo |
| **Docs** | `yuque_list_docs` | List documents in repo |
| **Docs** | `yuque_get_doc` | Get document with full content |
| **Docs** | `yuque_create_doc` | Create new document |
| **Docs** | `yuque_update_doc` | Update document |
| **Docs** | `yuque_delete_doc` | Delete document |
| **TOC** | `yuque_get_toc` | Get repo table of contents |
| **TOC** | `yuque_update_toc` | Update repo TOC |
| **Versions** | `yuque_list_doc_versions` | List document versions |
| **Versions** | `yuque_get_doc_version` | Get specific version |
| **Groups** | `yuque_list_group_members` | List group members |
| **Groups** | `yuque_update_group_member` | Update member role |
| **Groups** | `yuque_remove_group_member` | Remove member |
| **Stats** | `yuque_group_stats` | Group statistics |
| **Stats** | `yuque_group_member_stats` | Member statistics |
| **Stats** | `yuque_group_book_stats` | Book statistics |
| **Stats** | `yuque_group_doc_stats` | Document statistics |
| **Utility** | `yuque_hello` | Test API connectivity |

## Docker

```bash
docker build -t yuque-mcp .
docker run --rm -i -e YUQUE_TOKEN=your_token yuque-mcp
```

MCP client config with Docker:

```json
{
  "mcpServers": {
    "yuque": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "-e", "YUQUE_TOKEN", "yuque-mcp"],
      "env": {
        "YUQUE_TOKEN": "your_token_here"
      }
    }
  }
}
```

## Development

```bash
git clone https://github.com/chen201724/yuque-mcp-server.git
cd yuque-mcp-server
npm install
npm test              # run tests
npm run test:coverage # with coverage
npm run build         # compile TypeScript
npm run dev           # dev mode with hot reload
npm run lint          # lint
npm run format        # format
```

## Architecture

```
src/
├── cli.ts                — CLI entry (stdio transport)
├── index.ts              — HTTP entry (self-hosted, optional)
├── server.ts             — MCP server core
├── tools/                — Tool implementations (25 tools)
│   ├── user.ts           — User & group listing
│   ├── repo.ts           — Repository CRUD
│   ├── doc.ts            — Document CRUD
│   ├── toc.ts            — Table of contents
│   ├── search.ts         — Full-text search
│   ├── group.ts          — Group member management
│   ├── stats.ts          — Analytics & statistics
│   └── version.ts        — Document version history
├── services/
│   ├── yuque-client.ts   — Yuque API HTTP client
│   └── types.ts          — Type definitions
└── utils/
    ├── format.ts         — AI-optimized response formatting
    └── error.ts          — Error handling & user-friendly messages
```

## Troubleshooting

**"YUQUE_TOKEN is required"**
Set the token via environment variable or `--token` argument. Get yours at [Yuque Settings](https://www.yuque.com/settings/tokens).

**"Request failed with status 401"**
Your token is invalid or expired. Generate a new one from Yuque settings.

**"Request failed with status 429"**
Rate limited by Yuque API. Wait a moment and retry.

**Tool not found**
Make sure you're using the latest version: `npx -y yuque-mcp@latest`

## Contributing

Contributions welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md).

## Security

For security issues, see [SECURITY.md](./SECURITY.md).

## License

[MIT](./LICENSE)

## Links

- [Yuque API Documentation](https://www.yuque.com/yuque/developer/api)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
