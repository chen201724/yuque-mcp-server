import type { PromptDefinition } from './types.js';

export const weeklyReportPrompt: PromptDefinition = {
  name: 'weekly-report',
  description: '周报生成 — 基于团队本周数据自动生成周报',
  arguments: [
    {
      name: 'login',
      description: '团队 login 名称',
      required: true,
    },
    {
      name: 'repo_id',
      description: '周报存放的知识库 ID 或命名空间',
      required: true,
    },
  ],
  getMessages: (args: Record<string, string>) => [
    {
      role: 'user' as const,
      content: {
        type: 'text' as const,
        text: `请为团队「${args.login}」生成本周周报，并保存到语雀知识库。

## 操作步骤

1. **获取文档统计**：使用 yuque_group_doc_stats 工具，参数 login 为「${args.login}」，获取本周文档创建和更新数据。
2. **获取成员统计**：使用 yuque_group_member_stats 工具，参数 login 为「${args.login}」，获取成员活跃度数据。
3. **生成周报**：基于以上数据，生成结构化周报，包含以下部分：
   - 📊 本周概览（关键数字摘要）
   - 📝 文档动态（新增文档、更新文档、热门文档）
   - 👥 成员贡献（活跃成员排名、贡献亮点）
   - 📈 趋势分析（与上周对比，增长或下降趋势）
   - 🎯 下周建议（基于数据给出改进建议）

4. **创建文档**：使用 yuque_create_doc 工具，将周报保存到知识库 \`${args.repo_id}\` 中。
   - title：使用格式「周报 - YYYY年第N周（MM.DD - MM.DD）」
   - body：生成的周报 markdown 内容
   - format：设为 "markdown"

输出格式要求：
- 数据要有具体数字，避免模糊描述
- 使用表格展示排名数据
- 趋势用箭头符号标注（📈 📉 ➡️）
- 创建成功后告知文档标题和链接`,
      },
    },
  ],
};
