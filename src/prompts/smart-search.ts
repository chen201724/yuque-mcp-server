import type { PromptDefinition } from './types.js';

export const smartSearchPrompt: PromptDefinition = {
  name: 'smart-search',
  description: '智能搜索与问答 — 用自然语言搜索语雀文档并总结要点',
  arguments: [
    {
      name: 'query',
      description: '搜索关键词或问题',
      required: true,
    },
  ],
  getMessages: (args: Record<string, string>) => [
    {
      role: 'user' as const,
      content: {
        type: 'text' as const,
        text: `请帮我在语雀中搜索并回答以下问题：「${args.query}」

请按照以下步骤操作：

1. **搜索文档**：使用 yuque_search 工具，搜索关键词「${args.query}」，type 设为 "doc"。
2. **筛选结果**：从搜索结果中挑选最相关的 1-3 篇文档。
3. **读取内容**：对每篇相关文档，使用 yuque_get_doc 工具获取完整内容。
4. **总结回答**：基于文档内容，用清晰的结构化格式回答用户的问题。

输出格式要求：
- 先给出简明的直接回答
- 然后列出关键要点（使用 bullet points）
- 最后附上参考文档的标题和链接
- 如果搜索结果中没有找到相关内容，请如实告知`,
      },
    },
  ],
};
