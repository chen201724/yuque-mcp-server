import type { PromptDefinition } from './types.js';

export const onboardingGuidePrompt: PromptDefinition = {
  name: 'onboarding-guide',
  description: '新人入职知识包 — 自动整理团队核心文档生成入职阅读指南',
  arguments: [
    {
      name: 'login',
      description: '团队 login 名称',
      required: true,
    },
    {
      name: 'repo_id',
      description: '入职指南存放的知识库 ID 或命名空间',
      required: true,
    },
  ],
  getMessages: (args: Record<string, string>) => [
    {
      role: 'user' as const,
      content: {
        type: 'text' as const,
        text: `请为团队「${args.login}」整理一份新人入职知识包，并保存到语雀知识库。

## 操作步骤

1. **获取团队知识库列表**：使用 yuque_list_repos 工具，参数 login 为「${args.login}」，type 为 "group"，列出团队所有知识库。
2. **获取各库目录**：对每个知识库，使用 yuque_get_toc 工具获取目录结构，了解文档组织方式。
3. **筛选核心文档**：从目录中筛选出新人必读的核心文档，重点关注：
   - 团队介绍 / 组织架构
   - 开发规范 / 编码规范
   - 环境搭建 / 工具配置
   - 产品文档 / 业务介绍
   - 流程规范（发布流程、代码审查等）
   - FAQ / 常见问题

4. **生成入职指南**：整理为结构化的入职阅读指南，包含：
   - 🎯 阅读指南说明（预计阅读时间、建议顺序）
   - 📚 必读文档清单（按优先级排序，附文档链接）
     - 第一周必读
     - 第二周推荐
     - 进阶阅读
   - 🗺️ 知识库导航（各知识库简介和用途）
   - 💡 新人 Tips（常见问题和建议）

5. **创建文档**：使用 yuque_create_doc 工具，将入职指南保存到知识库 \`${args.repo_id}\` 中。
   - title：「新人入职知识包 - ${args.login} 团队」
   - body：生成的入职指南 markdown 内容
   - format：设为 "markdown"

输出格式要求：
- 文档链接使用语雀的文档路径格式
- 每篇推荐文档附简短说明（1-2 句话）
- 按阅读优先级分层，避免信息过载
- 语气友好、鼓励性，适合新人阅读
- 创建成功后告知文档标题和链接`,
      },
    },
  ],
};
