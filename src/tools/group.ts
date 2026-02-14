import { z } from 'zod';
import type { YuqueClient } from '../services/yuque-client.js';
import { formatGroupMember } from '../utils/format.js';

export const groupTools = {
  yuque_list_group_members: {
    description: 'List all members of a group/team',
    inputSchema: z.object({
      login: z.string().describe('Group login name'),
    }),
    handler: async (client: YuqueClient, args: { login: string }) => {
      const members = await client.listGroupMembers(args.login);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(members.map(formatGroupMember), null, 2),
          },
        ],
      };
    },
  },

  yuque_update_group_member: {
    description: 'Update a group member role',
    inputSchema: z.object({
      login: z.string().describe('Group login name'),
      user_id: z.number().describe('User ID to update'),
      role: z.number().describe('Role: 0 (member), 1 (admin), 2 (owner)'),
    }),
    handler: async (
      client: YuqueClient,
      args: { login: string; user_id: number; role: number }
    ) => {
      const member = await client.updateGroupMember(args.login, args.user_id, { role: args.role });
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(formatGroupMember(member), null, 2),
          },
        ],
      };
    },
  },

  yuque_remove_group_member: {
    description: 'Remove a member from a group/team',
    inputSchema: z.object({
      login: z.string().describe('Group login name'),
      user_id: z.number().describe('User ID to remove'),
    }),
    handler: async (client: YuqueClient, args: { login: string; user_id: number }) => {
      await client.removeGroupMember(args.login, args.user_id);
      return {
        content: [
          {
            type: 'text' as const,
            text: 'Group member removed successfully',
          },
        ],
      };
    },
  },
};
