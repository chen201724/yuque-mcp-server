# CLAUDE.md

This file provides guidance for Claude Code when working with this repository.

## Project Overview

This is the Yuque MCP Server - an MCP (Model Context Protocol) server that exposes the Yuque API as MCP tools. It aims to be the official-quality MCP server for Yuque (语雀), following Ant Design open-source standards.

## Architecture

Reference: Notion MCP Server (https://github.com/makenotion/notion-mcp-server)

```
src/
├── index.ts              — Main entry (HTTP server, streamable-http transport)
├── cli.ts                — CLI entry (stdio transport)
├── server.ts             — MCP Server core (tool registration)
├── tools/                — Tool implementations (by domain)
│   ├── user.ts           — User tools (get_user, list_groups)
│   ├── repo.ts           — Repo/Book tools (list, get, create, update, delete)
│   ├── doc.ts            — Document tools (list, get, create, update, delete)
│   ├── toc.ts            — TOC tools (get, update)
│   ├── search.ts         — Search tool
│   ├── group.ts          — Group/Team tools (members, roles)
│   ├── stats.ts          — Statistics tools
│   └── version.ts        — Doc version tools
├── services/
│   ├── yuque-client.ts   — Yuque API HTTP client (axios)
│   └── types.ts          — TypeScript type definitions for Yuque API
└── utils/
    ├── format.ts         — AI-friendly data formatting
    └── error.ts          — Error handling utilities
scripts/
├── yuque-openapi.json    — Yuque OpenAPI 3.1 Spec (reference)
└── start-server.ts       — Dev server entry
tests/
├── tools/                — Tool tests
├── services/             — Service tests
└── __fixtures__/         — Test fixtures
```

## Yuque API

- Base URL: https://www.yuque.com/api/v2
- Auth: X-Auth-Token header
- OpenAPI Spec: https://app.swaggerhub.com/apiproxy/registry/Jeff-Tian/yuque-open_api/2.0.1
- Test token env var: YUQUE_API_KEY

## Tools to Implement (25 total)

### Priority 1 - Core (MVP)
1. yuque_get_user — GET /api/v2/user
2. yuque_search — GET /api/v2/search
3. yuque_list_repos — GET /api/v2/users/{login}/repos + /api/v2/groups/{login}/repos
4. yuque_get_repo — GET /api/v2/repos/{id} or /api/v2/repos/{namespace}
5. yuque_list_docs — GET /api/v2/repos/{id}/docs
6. yuque_get_doc — GET /api/v2/repos/{id}/docs/{doc_id}
7. yuque_create_doc — POST /api/v2/repos/{id}/docs
8. yuque_update_doc — PUT /api/v2/repos/{id}/docs/{doc_id}
9. yuque_delete_doc — DELETE /api/v2/repos/{id}/docs/{doc_id}
10. yuque_get_toc — GET /api/v2/repos/{id}/toc

### Priority 2 - Complete
11. yuque_create_repo — POST /api/v2/users/{login}/repos or /api/v2/groups/{login}/repos
12. yuque_update_repo — PUT /api/v2/repos/{id}
13. yuque_delete_repo — DELETE /api/v2/repos/{id}
14. yuque_update_toc — PUT /api/v2/repos/{id}/toc
15. yuque_list_doc_versions — GET /api/v2/doc_versions?doc_id=X
16. yuque_get_doc_version — GET /api/v2/doc_versions/{id}

### Priority 3 - Team
17. yuque_list_groups — GET /api/v2/users/{id}/groups
18. yuque_list_group_members — GET /api/v2/groups/{login}/users
19. yuque_update_group_member — PUT /api/v2/groups/{login}/users/{id}
20. yuque_remove_group_member — DELETE /api/v2/groups/{login}/users/{id}

### Priority 4 - Stats
21. yuque_group_stats — GET /api/v2/groups/{login}/statistics
22. yuque_group_member_stats — GET /api/v2/groups/{login}/statistics/members
23. yuque_group_book_stats — GET /api/v2/groups/{login}/statistics/books
24. yuque_group_doc_stats — GET /api/v2/groups/{login}/statistics/docs

### Utility
25. yuque_hello — GET /api/v2/hello

## Tech Stack
- TypeScript (strict mode)
- @modelcontextprotocol/sdk (official MCP SDK)
- zod (parameter validation)
- axios (HTTP client)
- vitest (testing)
- ESLint + Prettier (code quality)

## Key Design Decisions
- Support both stdio and streamable-http transports
- Auth via YUQUE_TOKEN env var or --token CLI arg
- AI-friendly response formatting (trim unnecessary fields, reduce token usage)
- Support both repo ID and namespace (group_login/book_slug) for all repo/doc operations
- Chinese + English README
- Follow Ant Design open-source standards (CONTRIBUTING, CODE_OF_CONDUCT, SECURITY, CHANGELOG, Issue/PR templates, CI/CD)

## Common Commands
```bash
npm run build      # TypeScript compilation + CLI bundling
npm test           # Run vitest tests
npm run dev        # Start dev server with hot reload
npm run lint       # ESLint check
npm run format     # Prettier format
```
