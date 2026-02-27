#!/usr/bin/env node
import { runStdioServer } from './server.js';

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
