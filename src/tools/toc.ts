import { z } from 'zod';
import type { YuqueClient } from '../services/yuque-client.js';
import { formatToc } from '../utils/format.js';

export const tocTools = {
  yuque_get_toc: {
    description: 'Get the table of contents (TOC) for a repo/book',
    inputSchema: z.object({
      repo_id: z
        .union([z.string(), z.number()])
        .describe('Repo ID or namespace (e.g., "mygroup/mybook")'),
    }),
    handler: async (client: YuqueClient, args: { repo_id: string | number }) => {
      const toc = await client.getToc(args.repo_id);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(formatToc(toc), null, 2),
          },
        ],
      };
    },
  },

  yuque_update_toc: {
    description:
      'Update the table of contents (TOC) for a repo/book. The toc_data must be a single-operation JSON object (not an array). Required fields: "action" (e.g. "appendNode"), "action_mode" ("child" or "sibling"), "target_uuid" (empty string for root level). For new nodes: include "type" ("TITLE" or "DOC") and "title". To move existing nodes: use "node_uuid" instead. Example: {"action":"appendNode","action_mode":"child","target_uuid":"","type":"TITLE","title":"New Section"}',
    inputSchema: z.object({
      repo_id: z
        .union([z.string(), z.number()])
        .describe('Repo ID or namespace (e.g., "mygroup/mybook")'),
      toc_data: z
        .string()
        .describe(
          'Single-operation JSON object. Must include "action" (e.g. "appendNode"), "action_mode" ("child"|"sibling"), "target_uuid" (empty string = root). For new nodes add "type"+"title"; to move existing nodes use "node_uuid".'
        ),
    }),
    handler: async (client: YuqueClient, args: { repo_id: string | number; toc_data: string }) => {
      const toc = await client.updateToc(args.repo_id, args.toc_data);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(formatToc(toc), null, 2),
          },
        ],
      };
    },
  },
};
