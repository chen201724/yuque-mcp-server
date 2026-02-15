import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchTools } from '../../src/tools/search.js';
import { tocTools } from '../../src/tools/toc.js';
import { groupTools } from '../../src/tools/group.js';
import { statsTools } from '../../src/tools/stats.js';
import { versionTools } from '../../src/tools/version.js';
import type { YuqueClient } from '../../src/services/yuque-client.js';

const mockClient = {
  search: vi.fn(),
  getToc: vi.fn(),
  updateToc: vi.fn(),
  listGroupMembers: vi.fn(),
  updateGroupMember: vi.fn(),
  removeGroupMember: vi.fn(),
  getGroupStats: vi.fn(),
  getGroupMemberStats: vi.fn(),
  getGroupBookStats: vi.fn(),
  getGroupDocStats: vi.fn(),
  listDocVersions: vi.fn(),
  getDocVersion: vi.fn(),
  hello: vi.fn(),
} as unknown as YuqueClient;

beforeEach(() => vi.clearAllMocks());

describe('searchTools', () => {
  describe('yuque_search', () => {
    it('should search with query', async () => {
      (mockClient.search as ReturnType<typeof vi.fn>).mockResolvedValue({ items: [{ id: 1, type: 'doc', title: 'Result' }], total: 1 });
      const result = await searchTools.yuque_search.handler(mockClient, { query: 'test' } as never);
      expect(result.content[0].type).toBe('text');
      expect(mockClient.search).toHaveBeenCalledWith('test', undefined);
    });

    it('should search with type filter', async () => {
      (mockClient.search as ReturnType<typeof vi.fn>).mockResolvedValue({ items: [], total: 0 });
      await searchTools.yuque_search.handler(mockClient, { query: 'test', type: 'doc' } as never);
      expect(mockClient.search).toHaveBeenCalledWith('test', 'doc');
    });
  });
});

describe('tocTools', () => {
  describe('yuque_get_toc', () => {
    it('should get toc', async () => {
      (mockClient.getToc as ReturnType<typeof vi.fn>).mockResolvedValue([
        { title: 'Ch1', uuid: 'u1', url: '/ch1', prev_uuid: '', sibling_uuid: '', child_uuid: '', parent_uuid: '', doc_id: 1, level: 0, id: 1, open_window: 0, visible: 1 },
      ]);
      const result = await tocTools.yuque_get_toc.handler(mockClient, { repo_id: 1 } as never);
      const parsed = JSON.parse(result.content[0].text);
      expect(parsed).toHaveLength(1);
      expect(parsed[0]).toHaveProperty('title', 'Ch1');
    });
  });

  describe('yuque_update_toc', () => {
    it('should update toc', async () => {
      (mockClient.updateToc as ReturnType<typeof vi.fn>).mockResolvedValue([]);
      const result = await tocTools.yuque_update_toc.handler(mockClient, { repo_id: 1, toc: 'new toc' } as never);
      expect(result.content[0].type).toBe('text');
    });
  });
});

describe('groupTools', () => {
  describe('yuque_list_group_members', () => {
    it('should list members', async () => {
      (mockClient.listGroupMembers as ReturnType<typeof vi.fn>).mockResolvedValue([
        { id: 1, user: { id: 1, login: 'user1', name: 'User 1' }, role: 1 },
      ]);
      const result = await groupTools.yuque_list_group_members.handler(mockClient, { login: 'grp' } as never);
      expect(result.content[0].type).toBe('text');
      expect(mockClient.listGroupMembers).toHaveBeenCalledWith('grp');
    });
  });

  describe('yuque_update_group_member', () => {
    it('should update member role', async () => {
      (mockClient.updateGroupMember as ReturnType<typeof vi.fn>).mockResolvedValue({
        id: 1, user: { id: 1, login: 'user1', name: 'User 1' }, role: 1,
      });
      const result = await groupTools.yuque_update_group_member.handler(mockClient, { login: 'grp', user_id: 1, role: 1 } as never);
      expect(result.content[0].type).toBe('text');
    });
  });

  describe('yuque_remove_group_member', () => {
    it('should remove member', async () => {
      (mockClient.removeGroupMember as ReturnType<typeof vi.fn>).mockResolvedValue(undefined);
      const result = await groupTools.yuque_remove_group_member.handler(mockClient, { login: 'grp', user_id: 1 } as never);
      expect(result.content[0].text).toContain('removed');
    });
  });
});

describe('statsTools', () => {
  it('yuque_group_stats should return stats', async () => {
    (mockClient.getGroupStats as ReturnType<typeof vi.fn>).mockResolvedValue({ members: 10, books: 5, docs: 100 });
    const result = await statsTools.yuque_group_stats.handler(mockClient, { group_login: 'grp' } as never);
    expect(result.content[0].type).toBe('text');
  });

  it('yuque_group_member_stats should return stats', async () => {
    (mockClient.getGroupMemberStats as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    const result = await statsTools.yuque_group_member_stats.handler(mockClient, { group_login: 'grp' } as never);
    expect(result.content[0].type).toBe('text');
  });

  it('yuque_group_book_stats should return stats', async () => {
    (mockClient.getGroupBookStats as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    const result = await statsTools.yuque_group_book_stats.handler(mockClient, { group_login: 'grp' } as never);
    expect(result.content[0].type).toBe('text');
  });

  it('yuque_group_doc_stats should return stats', async () => {
    (mockClient.getGroupDocStats as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    const result = await statsTools.yuque_group_doc_stats.handler(mockClient, { group_login: 'grp' } as never);
    expect(result.content[0].type).toBe('text');
  });
});

describe('versionTools', () => {
  describe('yuque_list_doc_versions', () => {
    it('should list versions', async () => {
      (mockClient.listDocVersions as ReturnType<typeof vi.fn>).mockResolvedValue([
        { id: 1, slug: 'v1', title: 'Version 1', created_at: '2024-01-01', updated_at: '2024-01-01' },
      ]);
      const result = await versionTools.yuque_list_doc_versions.handler(mockClient, { repo_id: 1, doc_id: 1 } as never);
      expect(result.content[0].type).toBe('text');
    });
  });

  describe('yuque_get_doc_version', () => {
    it('should get specific version', async () => {
      (mockClient.getDocVersion as ReturnType<typeof vi.fn>).mockResolvedValue({
        id: 1, slug: 'v1', title: 'Version 1', body: 'Content', created_at: '2024-01-01', updated_at: '2024-01-01',
      });
      const result = await versionTools.yuque_get_doc_version.handler(mockClient, { version_id: 1 } as never);
      expect(result.content[0].type).toBe('text');
    });
  });

  describe('yuque_hello', () => {
    it('should test connectivity', async () => {
      (mockClient.hello as ReturnType<typeof vi.fn>).mockResolvedValue({ message: 'Hello' });
      const result = await versionTools.yuque_hello.handler(mockClient, {} as never);
      expect(JSON.parse(result.content[0].text)).toHaveProperty('message', 'Hello');
    });
  });
});
