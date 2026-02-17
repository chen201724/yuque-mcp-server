import type { PromptDefinition } from './types.js';

export const meetingNotesPrompt: PromptDefinition = {
  name: 'meeting-notes',
  description: '会议纪要归档 — 整理会议内容并归档到语雀知识库',
  arguments: [
    {
      name: 'content',
      description: '会议内容（原始记录或要点）',
      required: true,
    },
    {
      name: 'repo_id',
      description: '目标知识库 ID 或命名空间（如 "mygroup/meeting-notes"）',
      required: true,
    },
  ],
  getMessages: (args: Record<string, string>) => [
    {
      role: 'user' as const,
      content: {
        type: 'text' as const,
        text: `请将以下会议内容整理为标准会议纪要，并归档到语雀知识库。

## 原始会议内容
${args.content}

## 操作步骤

1. **整理格式**：将上述会议内容整理为标准会议纪要格式，包含以下部分：
   - 📅 会议基本信息（日期、时间、地点/方式）
   - 👥 参会人员
   - 📋 会议议题
   - 💬 讨论要点（按议题分类）
   - ✅ 决议事项
   - 📌 待办事项（明确责任人和截止日期）
   - 📝 备注

2. **创建文档**：使用 yuque_create_doc 工具，将整理好的会议纪要创建到知识库 \`${args.repo_id}\` 中。
   - title：使用格式「会议纪要 - YYYY-MM-DD - 主题」
   - body：整理好的 markdown 内容
   - format：设为 "markdown"

输出格式要求：
- 使用 Markdown 格式
- 待办事项使用 checkbox 格式（- [ ]）
- 语言简洁专业
- 创建成功后告知文档标题和链接`,
      },
    },
  ],
};
