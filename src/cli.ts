#!/usr/bin/env node
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

  runStdioServer(token).catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
