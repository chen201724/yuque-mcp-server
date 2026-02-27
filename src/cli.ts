#!/usr/bin/env node
import { createRequire } from 'node:module';
import { handleCliSubcommands } from './cli-install.js';
import { runStdioServer } from './server.js';

// Handle install/setup subcommands before starting the MCP server
if (handleCliSubcommands(process.argv)) {
  // Subcommand was handled — do not start the server.
  // For async subcommands (setup), the process will exit when done.
} else {
  // Normal MCP server startup
  const token =
    process.env.YUQUE_PERSONAL_TOKEN ||
    process.env.YUQUE_GROUP_TOKEN ||
    process.env.YUQUE_TOKEN ||
    process.argv.find((arg) => arg.startsWith('--token='))?.split('=')[1];

  if (!token) {
    console.error('Error: YUQUE_PERSONAL_TOKEN, YUQUE_GROUP_TOKEN, or YUQUE_TOKEN environment variable (or --token argument) is required');
    process.exit(1);
  }

  // If running directly in a terminal (not piped by an MCP client),
  // show a helpful guide instead of silently waiting on stdio.
  if (process.stdin.isTTY) {
    const require = createRequire(import.meta.url);
    const { version } = require('../package.json');
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║  🍃 Yuque MCP Server v${version.padEnd(39)}║
╚══════════════════════════════════════════════════════════════╝

  ⚠️  MCP Server 需要通过 MCP 客户端启动，不能直接在终端运行。

  🚀 快速安装到你的编辑器:

    npx yuque-mcp install --client=vscode --token=YOUR_TOKEN
    npx yuque-mcp install --client=cursor --token=YOUR_TOKEN

  🔧 交互式引导安装:

    npx yuque-mcp setup

  📖 支持的客户端: vscode, cursor, windsurf, claude-desktop, trae, cline

  🔗 更多信息: https://github.com/yuque/yuque-mcp-server
`);
    process.exit(0);
  }

  runStdioServer(token).catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
