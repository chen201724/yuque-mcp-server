# Yuque MCP Server

[![CI](https://github.com/chen201724/yuque-mcp-server/actions/workflows/ci.yml/badge.svg)](https://github.com/chen201724/yuque-mcp-server/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/yuque-mcp)](https://www.npmjs.com/package/yuque-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MCP server for [Yuque (语雀)](https://www.yuque.com/) — expose your knowledge base to AI assistants through the [Model Context Protocol](https://modelcontextprotocol.io/).

🌐 **[Website](https://chen201724.github.io/yuque-ecosystem/)** · [中文文档](./README.zh-CN.md)

## Quick Start

### 1. Get Your Yuque API Token

Visit [Yuque Developer Settings](https://www.yuque.com/settings/tokens) to create a personal token.

### 2. Add to Your MCP Client

#### Claude Code

```bash
claude mcp add yuque-mcp -- npx -y yuque-mcp --token=YOUR_TOKEN
```

### 3. Done!

Ask your AI assistant to search your Yuque docs, create documents, or manage repos.

## Available Tools (25)

| Category | Tools |
|----------|-------|
| **User** | `yuque_get_user`, `yuque_list_groups` |
| **Search** | `yuque_search` |
| **Repos** | `yuque_list_repos`, `yuque_get_repo`, `yuque_create_repo`, `yuque_update_repo`, `yuque_delete_repo` |
| **Docs** | `yuque_list_docs`, `yuque_get_doc`, `yuque_create_doc`, `yuque_update_doc`, `yuque_delete_doc` |
| **TOC** | `yuque_get_toc`, `yuque_update_toc` |
| **Versions** | `yuque_list_doc_versions`, `yuque_get_doc_version` |
| **Groups** | `yuque_list_group_members`, `yuque_update_group_member`, `yuque_remove_group_member` |
| **Stats** | `yuque_group_stats`, `yuque_group_member_stats`, `yuque_group_book_stats`, `yuque_group_doc_stats` |
| **Utility** | `yuque_hello` |

## Troubleshooting

| Error | Solution |
|-------|----------|
| `YUQUE_TOKEN is required` | Pass `--token=YOUR_TOKEN` or set `YUQUE_TOKEN` env var |
| `401 Unauthorized` | Token is invalid or expired — regenerate at [Yuque Settings](https://www.yuque.com/settings/tokens) |
| `429 Rate Limited` | Wait a moment and retry |
| Tool not found | Update to latest: `npx -y yuque-mcp@latest` |

## Development

```bash
git clone https://github.com/chen201724/yuque-mcp-server.git
cd yuque-mcp-server
npm install
npm test              # run tests (57 tests)
npm run build         # compile TypeScript
npm run dev           # dev mode with hot reload
```

## License

[MIT](./LICENSE)

## Links

- [Website](https://chen201724.github.io/yuque-ecosystem/) · [Yuque API Docs](https://www.yuque.com/yuque/developer/api) · [MCP Protocol](https://modelcontextprotocol.io/) · [Contributing](./CONTRIBUTING.md)
