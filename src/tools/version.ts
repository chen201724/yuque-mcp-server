import { z } from 'zod';
import type { YuqueClient } from '../services/yuque-client.js';
import { formatDocVersion } from '../utils/format.js';

export const versionTools = {
  yuque_list_doc_versions: {
    description: 'List all versions of a document',
    inputSchema: z.object({
      doc_id: z.number().describe('Document ID'),
    }),
    handler: async (client: YuqueClient, args: { doc_id: number }) => {
      const versions = await client.listDocVersions(args.doc_id);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(versions.map(formatDocVersion), null, 2),
          },
        ],
      };
    },
  },

  yuque_get_doc_version: {
    description: 'Get a specific version of a document',
    inputSchema: z.object({
      version_id: z.number().describe('Version ID'),
    }),
    handler: async (client: YuqueClient, args: { version_id: number }) => {
      const version = await client.getDocVersion(args.version_id);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(formatDocVersion(version), null, 2),
          },
        ],
      };
    },
  },

  yuque_hello: {
    description: 'Test API connectivity with Yuque',
    inputSchema: z.object({}),
    handler: async (client: YuqueClient, _args: Record<string, never>) => {
      const result = await client.hello();
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
