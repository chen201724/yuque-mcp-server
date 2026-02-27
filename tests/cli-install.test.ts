import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import { installToClient, getSupportedClients, getClientConfig } from '../src/cli-install.js';

// Use a temp directory for all file operations
let tmpDir: string;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'yuque-mcp-test-'));
});

afterEach(() => {
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

/**
 * Helper: override the config path for a client by monkey-patching getConfigPath
 */
function mockConfigPath(client: string, configPath: string) {
  const clientConfig = getClientConfig(client as never);
  if (!clientConfig) throw new Error(`Unknown client: ${client}`);
  clientConfig.getConfigPath = () => configPath;
}

describe('getSupportedClients', () => {
  it('should return all 6 supported clients', () => {
    const clients = getSupportedClients();
    expect(clients).toContain('claude-desktop');
    expect(clients).toContain('vscode');
    expect(clients).toContain('cursor');
    expect(clients).toContain('windsurf');
    expect(clients).toContain('cline');
    expect(clients).toContain('trae');
    expect(clients.length).toBe(6);
  });
});

describe('getClientConfig', () => {
  it('should return config for valid client', () => {
    const config = getClientConfig('cursor');
    expect(config).toBeDefined();
    expect(config?.name).toBe('Cursor');
    expect(config?.configKey).toBe('mcpServers');
  });

  it('should return config with servers key for vscode', () => {
    const config = getClientConfig('vscode');
    expect(config).toBeDefined();
    expect(config?.name).toBe('VS Code');
    expect(config?.configKey).toBe('servers');
  });

  it('should return undefined for unknown client', () => {
    const config = getClientConfig('nonexistent' as never);
    expect(config).toBeUndefined();
  });
});

describe('installToClient', () => {
  it('should create a new config file for cursor (mcpServers format)', () => {
    const configPath = path.join(tmpDir, 'cursor', 'mcp.json');
    mockConfigPath('cursor', configPath);

    const result = installToClient({ token: 'test-token-123', client: 'cursor' });

    expect(result).toBe(configPath);
    expect(fs.existsSync(configPath)).toBe(true);

    const content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(content).toEqual({
      mcpServers: {
        yuque: {
          command: 'npx',
          args: ['-y', 'yuque-mcp'],
          env: {
            YUQUE_PERSONAL_TOKEN: 'test-token-123',
          },
        },
      },
    });
  });

  it('should create a new config file for vscode (servers format)', () => {
    const configPath = path.join(tmpDir, '.vscode', 'mcp.json');
    mockConfigPath('vscode', configPath);

    const result = installToClient({ token: 'vsc-token', client: 'vscode' });

    expect(result).toBe(configPath);
    const content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(content).toEqual({
      servers: {
        yuque: {
          command: 'npx',
          args: ['-y', 'yuque-mcp'],
          env: {
            YUQUE_PERSONAL_TOKEN: 'vsc-token',
          },
        },
      },
    });
  });

  it('should merge with existing config (preserve other servers)', () => {
    const configPath = path.join(tmpDir, 'existing', 'mcp.json');
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
    fs.writeFileSync(
      configPath,
      JSON.stringify(
        {
          mcpServers: {
            'other-server': {
              command: 'other',
              args: ['--flag'],
            },
          },
        },
        null,
        2
      ),
      'utf-8'
    );

    mockConfigPath('cursor', configPath);
    installToClient({ token: 'merge-token', client: 'cursor' });

    const content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    // Original server should still be there
    expect(content.mcpServers['other-server']).toEqual({
      command: 'other',
      args: ['--flag'],
    });
    // New server should be added
    expect(content.mcpServers['yuque']).toEqual({
      command: 'npx',
      args: ['-y', 'yuque-mcp'],
      env: {
        YUQUE_PERSONAL_TOKEN: 'merge-token',
      },
    });
  });

  it('should update existing yuque entry without duplicating', () => {
    const configPath = path.join(tmpDir, 'update', 'mcp.json');
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
    fs.writeFileSync(
      configPath,
      JSON.stringify(
        {
          mcpServers: {
            yuque: {
              command: 'npx',
              args: ['-y', 'yuque-mcp'],
              env: {
                YUQUE_PERSONAL_TOKEN: 'old-token',
              },
            },
          },
        },
        null,
        2
      ),
      'utf-8'
    );

    mockConfigPath('cursor', configPath);
    installToClient({ token: 'new-token', client: 'cursor' });

    const content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(content.mcpServers['yuque'].env.YUQUE_PERSONAL_TOKEN).toBe('new-token');
    // Should only have one entry
    expect(Object.keys(content.mcpServers)).toEqual(['yuque']);
  });

  it('should preserve other top-level keys in the config', () => {
    const configPath = path.join(tmpDir, 'preserve', 'mcp.json');
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
    fs.writeFileSync(
      configPath,
      JSON.stringify(
        {
          someOtherSetting: true,
          mcpServers: {},
        },
        null,
        2
      ),
      'utf-8'
    );

    mockConfigPath('cursor', configPath);
    installToClient({ token: 'tok', client: 'cursor' });

    const content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(content.someOtherSetting).toBe(true);
    expect(content.mcpServers.yuque).toBeDefined();
  });

  it('should create parent directories recursively', () => {
    const configPath = path.join(tmpDir, 'deep', 'nested', 'dir', 'mcp.json');
    mockConfigPath('cursor', configPath);

    installToClient({ token: 'deep-token', client: 'cursor' });

    expect(fs.existsSync(configPath)).toBe(true);
    const content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(content.mcpServers.yuque.env.YUQUE_PERSONAL_TOKEN).toBe('deep-token');
  });

  it('should throw for unknown client', () => {
    expect(() => {
      installToClient({ token: 'tok', client: 'unknown-client' as never });
    }).toThrow('Unknown client');
  });

  it('should handle invalid JSON in existing file (backup and recreate)', () => {
    const configPath = path.join(tmpDir, 'invalid', 'mcp.json');
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
    fs.writeFileSync(configPath, '{ invalid json !!!', 'utf-8');

    mockConfigPath('cursor', configPath);
    installToClient({ token: 'fix-token', client: 'cursor' });

    // Backup should exist
    expect(fs.existsSync(configPath + '.backup')).toBe(true);
    // New valid config should exist
    const content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(content.mcpServers.yuque.env.YUQUE_PERSONAL_TOKEN).toBe('fix-token');
  });

  it('should work for claude-desktop client', () => {
    const configPath = path.join(tmpDir, 'claude', 'claude_desktop_config.json');
    mockConfigPath('claude-desktop', configPath);

    installToClient({ token: 'claude-tok', client: 'claude-desktop' });

    const content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(content.mcpServers.yuque).toBeDefined();
    expect(content.mcpServers.yuque.command).toBe('npx');
  });

  it('should work for windsurf client', () => {
    const configPath = path.join(tmpDir, 'windsurf', 'mcp.json');
    mockConfigPath('windsurf', configPath);

    installToClient({ token: 'wind-tok', client: 'windsurf' });

    const content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(content.mcpServers.yuque).toBeDefined();
  });

  it('should work for cline client', () => {
    const configPath = path.join(tmpDir, 'cline', 'settings.json');
    mockConfigPath('cline', configPath);

    installToClient({ token: 'cline-tok', client: 'cline' });

    const content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(content.mcpServers.yuque).toBeDefined();
  });

  it('should work for trae client', () => {
    const configPath = path.join(tmpDir, 'trae', 'settings.json');
    mockConfigPath('trae', configPath);

    installToClient({ token: 'trae-tok', client: 'trae' });

    const content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    expect(content.mcpServers.yuque).toBeDefined();
  });

  it('should merge into vscode config with existing servers', () => {
    const configPath = path.join(tmpDir, 'vscode-merge', 'mcp.json');
    fs.mkdirSync(path.dirname(configPath), { recursive: true });
    fs.writeFileSync(
      configPath,
      JSON.stringify(
        {
          servers: {
            'github-copilot': {
              command: 'gh-copilot',
              args: ['serve'],
            },
          },
        },
        null,
        2
      ),
      'utf-8'
    );

    mockConfigPath('vscode', configPath);
    installToClient({ token: 'vsc-merge-tok', client: 'vscode' });

    const content = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    // Original server preserved
    expect(content.servers['github-copilot']).toBeDefined();
    // Yuque added under 'servers' (not 'mcpServers')
    expect(content.servers['yuque']).toBeDefined();
    expect(content.servers['yuque'].env.YUQUE_PERSONAL_TOKEN).toBe('vsc-merge-tok');
    // No mcpServers key should exist
    expect(content.mcpServers).toBeUndefined();
  });
});
