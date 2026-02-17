import { describe, it, expect } from 'vitest';
import { allPrompts, promptsByName } from '../src/prompts/index.js';
import type { PromptDefinition } from '../src/prompts/types.js';

describe('prompts', () => {
  const expectedPromptNames = [
    'smart-search',
    'meeting-notes',
    'weekly-report',
    'tech-design',
    'onboarding-guide',
    'knowledge-report',
  ];

  describe('allPrompts', () => {
    it('should export exactly 6 prompts', () => {
      expect(allPrompts).toHaveLength(6);
    });

    it('should contain all expected prompt names', () => {
      const names = allPrompts.map((p) => p.name);
      expect(names).toEqual(expectedPromptNames);
    });

    it('should have valid structure for each prompt', () => {
      for (const prompt of allPrompts) {
        expect(prompt.name).toBeTruthy();
        expect(prompt.description).toBeTruthy();
        expect(Array.isArray(prompt.arguments)).toBe(true);
        expect(typeof prompt.getMessages).toBe('function');
      }
    });
  });

  describe('promptsByName', () => {
    it('should have entries for all 6 prompts', () => {
      expect(Object.keys(promptsByName)).toHaveLength(6);
      for (const name of expectedPromptNames) {
        expect(promptsByName[name]).toBeDefined();
      }
    });
  });

  describe('smart-search', () => {
    let prompt: PromptDefinition;

    it('should have correct metadata', () => {
      prompt = promptsByName['smart-search'];
      expect(prompt.name).toBe('smart-search');
      expect(prompt.arguments).toHaveLength(1);
      expect(prompt.arguments[0].name).toBe('query');
      expect(prompt.arguments[0].required).toBe(true);
    });

    it('should generate messages with query interpolated', () => {
      prompt = promptsByName['smart-search'];
      const messages = prompt.getMessages({ query: 'API 设计规范' });
      expect(messages).toHaveLength(1);
      expect(messages[0].role).toBe('user');
      expect(messages[0].content.type).toBe('text');
      expect(messages[0].content.text).toContain('API 设计规范');
      expect(messages[0].content.text).toContain('yuque_search');
      expect(messages[0].content.text).toContain('yuque_get_doc');
    });
  });

  describe('meeting-notes', () => {
    let prompt: PromptDefinition;

    it('should have correct metadata', () => {
      prompt = promptsByName['meeting-notes'];
      expect(prompt.name).toBe('meeting-notes');
      expect(prompt.arguments).toHaveLength(2);
      expect(prompt.arguments[0].name).toBe('content');
      expect(prompt.arguments[0].required).toBe(true);
      expect(prompt.arguments[1].name).toBe('repo_id');
      expect(prompt.arguments[1].required).toBe(true);
    });

    it('should generate messages with content and repo_id interpolated', () => {
      prompt = promptsByName['meeting-notes'];
      const messages = prompt.getMessages({
        content: '讨论了新功能上线计划',
        repo_id: 'team/meetings',
      });
      expect(messages).toHaveLength(1);
      expect(messages[0].content.text).toContain('讨论了新功能上线计划');
      expect(messages[0].content.text).toContain('team/meetings');
      expect(messages[0].content.text).toContain('yuque_create_doc');
    });
  });

  describe('weekly-report', () => {
    let prompt: PromptDefinition;

    it('should have correct metadata', () => {
      prompt = promptsByName['weekly-report'];
      expect(prompt.name).toBe('weekly-report');
      expect(prompt.arguments).toHaveLength(2);
      expect(prompt.arguments[0].name).toBe('login');
      expect(prompt.arguments[0].required).toBe(true);
      expect(prompt.arguments[1].name).toBe('repo_id');
      expect(prompt.arguments[1].required).toBe(true);
    });

    it('should generate messages with login and repo_id interpolated', () => {
      prompt = promptsByName['weekly-report'];
      const messages = prompt.getMessages({
        login: 'my-team',
        repo_id: 'my-team/weekly',
      });
      expect(messages).toHaveLength(1);
      expect(messages[0].content.text).toContain('my-team');
      expect(messages[0].content.text).toContain('my-team/weekly');
      expect(messages[0].content.text).toContain('yuque_group_doc_stats');
      expect(messages[0].content.text).toContain('yuque_group_member_stats');
      expect(messages[0].content.text).toContain('yuque_create_doc');
    });
  });

  describe('tech-design', () => {
    let prompt: PromptDefinition;

    it('should have correct metadata', () => {
      prompt = promptsByName['tech-design'];
      expect(prompt.name).toBe('tech-design');
      expect(prompt.arguments).toHaveLength(3);
      expect(prompt.arguments[0].name).toBe('title');
      expect(prompt.arguments[1].name).toBe('requirements');
      expect(prompt.arguments[2].name).toBe('repo_id');
      for (const arg of prompt.arguments) {
        expect(arg.required).toBe(true);
      }
    });

    it('should generate messages with all args interpolated', () => {
      prompt = promptsByName['tech-design'];
      const messages = prompt.getMessages({
        title: '用户权限系统',
        requirements: '实现 RBAC 权限模型',
        repo_id: 'team/designs',
      });
      expect(messages).toHaveLength(1);
      expect(messages[0].content.text).toContain('用户权限系统');
      expect(messages[0].content.text).toContain('实现 RBAC 权限模型');
      expect(messages[0].content.text).toContain('team/designs');
      expect(messages[0].content.text).toContain('yuque_create_doc');
    });
  });

  describe('onboarding-guide', () => {
    let prompt: PromptDefinition;

    it('should have correct metadata', () => {
      prompt = promptsByName['onboarding-guide'];
      expect(prompt.name).toBe('onboarding-guide');
      expect(prompt.arguments).toHaveLength(2);
      expect(prompt.arguments[0].name).toBe('login');
      expect(prompt.arguments[1].name).toBe('repo_id');
    });

    it('should generate messages referencing correct tools', () => {
      prompt = promptsByName['onboarding-guide'];
      const messages = prompt.getMessages({
        login: 'dev-team',
        repo_id: 'dev-team/onboarding',
      });
      expect(messages).toHaveLength(1);
      expect(messages[0].content.text).toContain('dev-team');
      expect(messages[0].content.text).toContain('yuque_list_repos');
      expect(messages[0].content.text).toContain('yuque_get_toc');
      expect(messages[0].content.text).toContain('yuque_create_doc');
    });
  });

  describe('knowledge-report', () => {
    let prompt: PromptDefinition;

    it('should have correct metadata', () => {
      prompt = promptsByName['knowledge-report'];
      expect(prompt.name).toBe('knowledge-report');
      expect(prompt.arguments).toHaveLength(2);
      expect(prompt.arguments[0].name).toBe('login');
      expect(prompt.arguments[1].name).toBe('repo_id');
    });

    it('should generate messages referencing all stats tools', () => {
      prompt = promptsByName['knowledge-report'];
      const messages = prompt.getMessages({
        login: 'org-team',
        repo_id: 'org-team/reports',
      });
      expect(messages).toHaveLength(1);
      expect(messages[0].content.text).toContain('org-team');
      expect(messages[0].content.text).toContain('yuque_group_stats');
      expect(messages[0].content.text).toContain('yuque_group_member_stats');
      expect(messages[0].content.text).toContain('yuque_group_book_stats');
      expect(messages[0].content.text).toContain('yuque_group_doc_stats');
      expect(messages[0].content.text).toContain('yuque_create_doc');
    });
  });
});
