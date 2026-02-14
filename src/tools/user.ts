import { z } from 'zod';
import type { YuqueClient } from '../services/yuque-client.js';
import { formatUser, formatGroup } from '../utils/format.js';

export const userTools = {
  yuque_get_user: {
    description: 'Get current authenticated user information',
    inputSchema: z.object({}),
    handler: async (client: YuqueClient, _args: Record<string, never>) => {
      const user = await client.getUser();
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(formatUser(user), null, 2),
          },
        ],
      };
    },
  },

  yuque_list_groups: {
    description: 'List all groups/teams that the user belongs to',
    inputSchema: z.object({
      user_id: z.number().describe('User ID to list groups for'),
    }),
    handler: async (client: YuqueClient, args: { user_id: number }) => {
      const groups = await client.listGroups(args.user_id);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(groups.map(formatGroup), null, 2),
          },
        ],
      };
    },
  },
};
