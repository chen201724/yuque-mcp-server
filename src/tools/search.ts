import { z } from 'zod';
import type { YuqueClient } from '../services/yuque-client.js';

export const searchTools = {
  yuque_search: {
    description: 'Search for documents, repos, or users in Yuque',
    inputSchema: z.object({
      query: z.string().describe('Search query string'),
      type: z.string().optional().describe('Search type: doc, repo, user (optional)'),
    }),
    handler: async (client: YuqueClient, args: { query: string; type?: string }) => {
      const result = await client.search(args.query, args.type);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    },
  },
};
