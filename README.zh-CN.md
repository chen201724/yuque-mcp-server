# 语雀 MCP 服务器

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-1.0-green.svg)](https://modelcontextprotocol.io/)

语雀 API 的官方品质 MCP (Model Context Protocol) 服务器。该服务器通过标准化的 MCP 接口向 AI 助手暴露语雀的知识库能力。

[English Documentation](./README.md)

## 特性

- **完整 API 覆盖**：实现了全部 25 个语雀 API 端点
- **双传输模式**：支持 stdio 和 streamable-http 两种传输方式
- **类型安全**：完整的 TypeScript 实现，启用严格模式
- **AI 优化**：响应格式设计旨在最小化 token 使用
- **灵活认证**：支持环境变量或 CLI 参数认证
- **完善测试**：使用 vitest 进行全面测试覆盖
- **生产就绪**：遵循 Ant Design 开源标准

## 安装

```bash
npm install -g yuque-mcp-server
```

或直接使用 npx:

```bash
npx yuque-mcp-server --token=YOUR_TOKEN
```

## 快速开始

### 1. 获取语雀 API Token

访问 [语雀设置](https://www.yuque.com/settings/tokens) 生成你的 API token。

### 2. 运行服务器

**Stdio 模式（用于 MCP 客户端）：**

```bash
export YUQUE_TOKEN=your_token_here
yuque-mcp-server
```

或使用 CLI 参数:

```bash
yuque-mcp-server --token=your_token_here
```

**HTTP 模式（用于测试）：**

```bash
export YUQUE_TOKEN=your_token_here
npm start
```

服务器默认运行在 `http://localhost:3000`。

## 可用工具

### 用户与团队 (2 个工具)
- `yuque_get_user` - 获取当前用户信息
- `yuque_list_groups` - 列出用户的团队

### 搜索 (1 个工具)
- `yuque_search` - 搜索文档、知识库或用户

### 知识库 (5 个工具)
- `yuque_list_repos` - 列出用户或团队的知识库
- `yuque_get_repo` - 获取知识库详情
- `yuque_create_repo` - 创建新知识库
- `yuque_update_repo` - 更新知识库
- `yuque_delete_repo` - 删除知识库

### 文档 (5 个工具)
- `yuque_list_docs` - 列出知识库中的文档
- `yuque_get_doc` - 获取文档完整内容
- `yuque_create_doc` - 创建新文档
- `yuque_update_doc` - 更新文档
- `yuque_delete_doc` - 删除文档

### 目录 (2 个工具)
- `yuque_get_toc` - 获取知识库目录
- `yuque_update_toc` - 更新知识库目录

### 文档版本 (2 个工具)
- `yuque_list_doc_versions` - 列出文档版本
- `yuque_get_doc_version` - 获取特定版本

### 团队管理 (3 个工具)
- `yuque_list_group_members` - 列出团队成员
- `yuque_update_group_member` - 更新成员角色
- `yuque_remove_group_member` - 移除成员

### 统计 (4 个工具)
- `yuque_group_stats` - 团队统计
- `yuque_group_member_stats` - 成员统计
- `yuque_group_book_stats` - 知识库统计
- `yuque_group_doc_stats` - 文档统计

### 工具 (1 个工具)
- `yuque_hello` - 测试 API 连接

## Docker

```bash
# 构建镜像
docker build -t yuque-mcp-server .

# 运行（stdio 模式）
docker run --rm -i -e YUQUE_TOKEN=your_token yuque-mcp-server
```

Docker 方式的 MCP 客户端配置：

```json
{
  "mcpServers": {
    "yuque": {
      "command": "docker",
      "args": ["run", "--rm", "-i", "-e", "YUQUE_TOKEN", "yuque-mcp-server"],
      "env": {
        "YUQUE_TOKEN": "your_token_here"
      }
    }
  }
}
```

## 配置

### 环境变量

- `YUQUE_TOKEN` - 你的语雀 API token（必需）
- `PORT` - HTTP 服务器端口（默认：3000，仅 HTTP 模式）

### MCP 客户端配置

添加到你的 MCP 客户端配置（例如 Claude Desktop）：

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

## 开发

```bash
# 克隆仓库
git clone https://github.com/chen201724/yuque-mcp-server.git
cd yuque-mcp-server

# 安装依赖
npm install

# 运行测试
npm test

# 运行测试覆盖率
npm run test:coverage

# 构建
npm run build

# 开发模式（热重载）
npm run dev

# 代码检查
npm run lint

# 代码格式化
npm run format
```

## 架构

```
src/
├── index.ts              — HTTP 服务器入口
├── cli.ts                — CLI 入口（stdio）
├── server.ts             — MCP 服务器核心
├── tools/                — 工具实现（按领域划分）
│   ├── user.ts
│   ├── repo.ts
│   ├── doc.ts
│   ├── toc.ts
│   ├── search.ts
│   ├── group.ts
│   ├── stats.ts
│   └── version.ts
├── services/
│   ├── yuque-client.ts   — 语雀 API 客户端
│   └── types.ts          — 类型定义
└── utils/
    ├── format.ts         — 响应格式化
    └── error.ts          — 错误处理
```

## 贡献

我们欢迎贡献！详情请参阅 [CONTRIBUTING.md](./CONTRIBUTING.md)。

## 安全

安全问题请参阅 [SECURITY.md](./SECURITY.md)。

## 许可证

[MIT](./LICENSE)

## 链接

- [语雀 API 文档](https://www.yuque.com/yuque/developer/api)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [语雀官网](https://www.yuque.com/)

## 致谢

本项目受 [Notion MCP Server](https://github.com/makenotion/notion-mcp-server) 启发，遵循 Ant Design 开源标准。
