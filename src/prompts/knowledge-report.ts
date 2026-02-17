import type { PromptDefinition } from './types.js';

export const knowledgeReportPrompt: PromptDefinition = {
  name: 'knowledge-report',
  description: '团队知识月报 — 全面分析团队知识管理数据并生成月报',
  arguments: [
    {
      name: 'login',
      description: '团队 login 名称',
      required: true,
    },
    {
      name: 'repo_id',
      description: '月报存放的知识库 ID 或命名空间',
      required: true,
    },
  ],
  getMessages: (args: Record<string, string>) => [
    {
      role: 'user' as const,
      content: {
        type: 'text' as const,
        text: `请为团队「${args.login}」生成本月知识管理月报，并保存到语雀知识库。

## 操作步骤

1. **获取团队总览数据**：使用 yuque_group_stats 工具，参数 login 为「${args.login}」，获取团队整体统计数据。
2. **获取成员统计**：使用 yuque_group_member_stats 工具，参数 login 为「${args.login}」，获取成员活跃度和贡献数据。
3. **获取知识库统计**：使用 yuque_group_book_stats 工具，参数 login 为「${args.login}」，获取各知识库的使用情况。
4. **获取文档统计**：使用 yuque_group_doc_stats 工具，参数 login 为「${args.login}」，获取文档创建和更新数据。

5. **生成月报**：基于以上全面数据，生成结构化的知识管理月报，包含：

   - 📊 **月度概览**
     - 关键指标摘要（文档总数、新增数、活跃成员数等）
     - 与上月对比的增长率

   - 👥 **成员贡献分析**
     - 活跃成员排行榜（Top 10）
     - 新增贡献者
     - 成员活跃度分布

   - 📚 **知识库分析**
     - 各知识库文档数量和增长
     - 最活跃的知识库 Top 5
     - 知识库健康度评估

   - 📝 **文档分析**
     - 本月新增文档列表
     - 热门文档（阅读量/点赞最多）
     - 文档更新频率分析

   - 📈 **趋势与洞察**
     - 知识沉淀趋势图（文字描述）
     - 团队知识管理成熟度评估
     - 值得关注的亮点和问题

   - 🎯 **改进建议**
     - 基于数据的具体改进建议
     - 下月重点关注方向

6. **创建文档**：使用 yuque_create_doc 工具，将月报保存到知识库 \`${args.repo_id}\` 中。
   - title：「知识管理月报 - YYYY年MM月 - ${args.login}」
   - body：生成的月报 markdown 内容
   - format：设为 "markdown"

输出格式要求：
- 数据驱动，所有结论都要有数据支撑
- 使用表格展示排名和对比数据
- 趋势用箭头符号标注（📈 📉 ➡️）
- 建议要具体可执行，避免空泛
- 语言专业但易读
- 创建成功后告知文档标题和链接`,
      },
    },
  ],
};
