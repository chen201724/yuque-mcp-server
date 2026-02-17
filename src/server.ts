import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { YuqueClient } from './services/yuque-client.js';
import { userTools } from './tools/user.js';
import { repoTools } from './tools/repo.js';
import { docTools } from './tools/doc.js';
import { tocTools } from './tools/toc.js';
import { searchTools } from './tools/search.js';
import { groupTools } from './tools/group.js';
import { statsTools } from './tools/stats.js';
import { versionTools } from './tools/version.js';
import { allPrompts, promptsByName } from './prompts/index.js';

export function createServer(token: string) {
  const client = new YuqueClient(token);
  const server = new Server(
    {
      name: 'yuque-mcp',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
        prompts: {},
      },
    }
  );

  // Combine all tools
  const allTools = {
    ...userTools,
    ...repoTools,
    ...docTools,
    ...tocTools,
    ...searchTools,
    ...groupTools,
    ...statsTools,
    ...versionTools,
  };

  // Register list_tools handler
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
      tools: Object.entries(allTools).map(([name, tool]) => ({
        name,
        description: tool.description,
        inputSchema: zodToJsonSchema(tool.inputSchema),
      })),
    };
  });

  // Register call_tool handler
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const toolName = request.params.name;
    const tool = allTools[toolName as keyof typeof allTools];

    if (!tool) {
      throw new Error(`Unknown tool: ${toolName}`);
    }

    try {
      // Validate arguments with zod
      const args = tool.inputSchema.parse(request.params.arguments);
      // Call the tool handler
      return await tool.handler(client, args as never);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Tool execution failed: ${error.message}`);
      }
      throw error;
    }
  });

  // Register prompts/list handler
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    return {
      prompts: allPrompts.map((p) => ({
        name: p.name,
        description: p.description,
        arguments: p.arguments,
      })),
    };
  });

  // Register prompts/get handler
  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const promptName = request.params.name;
    const prompt = promptsByName[promptName];

    if (!prompt) {
      throw new Error(`Unknown prompt: ${promptName}`);
    }

    // Validate required arguments
    const args = request.params.arguments ?? {};
    for (const arg of prompt.arguments) {
      if (arg.required && !(arg.name in args)) {
        throw new Error(`Missing required argument: ${arg.name}`);
      }
    }

    return {
      description: prompt.description,
      messages: prompt.getMessages(args),
    };
  });

  return server;
}

export async function runStdioServer(token: string) {
  const server = createServer(token);
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Yuque MCP Server running on stdio');
}
