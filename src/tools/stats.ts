import { z } from 'zod';
import type { YuqueClient } from '../services/yuque-client.js';

export const statsTools = {
  yuque_group_stats: {
    description: 'Get overall statistics for a group/team',
    inputSchema: z.object({
      login: z.string().describe('Group login name'),
    }),
    handler: async (client: YuqueClient, args: { login: string }) => {
      const stats = await client.getGroupStats(args.login);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(stats, null, 2),
          },
        ],
      };
    },
  },

  yuque_group_member_stats: {
    description: 'Get member statistics for a group/team',
    inputSchema: z.object({
      login: z.string().describe('Group login name'),
    }),
    handler: async (client: YuqueClient, args: { login: string }) => {
      const stats = await client.getGroupMemberStats(args.login);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(stats, null, 2),
          },
        ],
      };
    },
  },

  yuque_group_book_stats: {
    description: 'Get book/repo statistics for a group/team',
    inputSchema: z.object({
      login: z.string().describe('Group login name'),
    }),
    handler: async (client: YuqueClient, args: { login: string }) => {
      const stats = await client.getGroupBookStats(args.login);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(stats, null, 2),
          },
        ],
      };
    },
  },

  yuque_group_doc_stats: {
    description: 'Get document statistics for a group/team',
    inputSchema: z.object({
      login: z.string().describe('Group login name'),
    }),
    handler: async (client: YuqueClient, args: { login: string }) => {
      const stats = await client.getGroupDocStats(args.login);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(stats, null, 2),
          },
        ],
      };
    },
  },
};
