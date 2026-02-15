# Yuque MCP Server

[![CI](https://github.com/chen201724/yuque-mcp-server/actions/workflows/ci.yml/badge.svg)](https://github.com/chen201724/yuque-mcp-server/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/yuque-mcp)](https://www.npmjs.com/package/yuque-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[语雀](https://www.yuque.com/) MCP Server — 通过 [Model Context Protocol](https://modelcontextprotocol.io/) 让 AI 助手访问你的语雀知识库。

[English](./README.md)

## 快速开始

### 1. 获取语雀 API Token

前往 [语雀开发者设置](https://www.yuque.com/settings/tokens) 创建个人 Token。

### 2. 添加到 MCP 客户端

#### Claude Code

```bash
claude mcp add yuque-mcp -- npx -y yuque-mcp --token=YOUR_TOKEN
```

### 3. 开始使用！

让 AI 助手搜索语雀文档、创建文档、管理知识库。

## 可用工具（25 个）

| 分类 | 工具 |
|------|------|
| **用户** | `yuque_get_user`、`yuque_list_groups` |
| **搜索** | `yuque_search` |
| **知识库** | `yuque_list_repos`、`yuque_get_repo`、`yuque_create_repo`、`yuque_update_repo`、`yuque_delete_repo` |
| **文档** | `yuque_list_docs`、`yuque_get_doc`、`yuque_create_doc`、`yuque_update_doc`、`yuque_delete_doc` |
| **目录** | `yuque_get_toc`、`yuque_update_toc` |
| **版本** | `yuque_list_doc_versions`、`yuque_get_doc_version` |
| **团队** | `yuque_list_group_members`、`yuque_update_group_member`、`yuque_remove_group_member` |
| **统计** | `yuque_group_stats`、`yuque_group_member_stats`、`yuque_group_book_stats`、`yuque_group_doc_stats` |
| **工具** | `yuque_hello` |

## 常见问题

| 错误 | 解决方案 |
|------|----------|
| `YUQUE_TOKEN is required` | 传入 `--token=YOUR_TOKEN` 或设置 `YUQUE_TOKEN` 环境变量 |
| `401 Unauthorized` | Token 无效或过期 — 到[语雀设置](https://www.yuque.com/settings/tokens)重新生成 |
| `429 Rate Limited` | 请求过于频繁，等待后重试 |

## 开发

```bash
git clone https://github.com/chen201724/yuque-mcp-server.git
cd yuque-mcp-server
npm install
npm test              # 运行测试（57 个测试用例）
npm run build         # 编译 TypeScript
npm run dev           # 开发模式
```

## 许可证

[MIT](./LICENSE)

## 链接

- [语雀 API 文档](https://www.yuque.com/yuque/developer/api) · [MCP 协议](https://modelcontextprotocol.io/) · [贡献指南](./CONTRIBUTING.md)
