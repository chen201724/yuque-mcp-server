import type { PromptDefinition } from './types.js';

export const techDesignPrompt: PromptDefinition = {
  name: 'tech-design',
  description: '技术方案撰写 — 按标准模板生成技术方案文档',
  arguments: [
    {
      name: 'title',
      description: '技术方案标题',
      required: true,
    },
    {
      name: 'requirements',
      description: '需求描述',
      required: true,
    },
    {
      name: 'repo_id',
      description: '目标知识库 ID 或命名空间',
      required: true,
    },
  ],
  getMessages: (args: Record<string, string>) => [
    {
      role: 'user' as const,
      content: {
        type: 'text' as const,
        text: `请为以下需求撰写技术方案文档，并保存到语雀知识库。

## 方案标题
${args.title}

## 需求描述
${args.requirements}

## 操作步骤

1. **撰写技术方案**：按照以下标准模板生成完整的技术方案文档：

   ### 文档结构
   - **1. 背景与现状**：描述当前状况和面临的问题
   - **2. 目标与范围**：明确本方案要达成的目标和边界
   - **3. 方案设计**
     - 3.1 整体架构：系统架构图和模块划分
     - 3.2 核心流程：关键业务流程描述
     - 3.3 数据模型：核心数据结构设计
     - 3.4 接口设计：关键 API 接口定义
   - **4. 技术选型**：技术栈选择及理由
   - **5. 排期计划**：里程碑和时间节点
   - **6. 风险评估**：潜在风险和应对措施
   - **7. 参考资料**：相关文档和链接

2. **创建文档**：使用 yuque_create_doc 工具，将技术方案保存到知识库 \`${args.repo_id}\` 中。
   - title：「技术方案 - ${args.title}」
   - body：生成的技术方案 markdown 内容
   - format：设为 "markdown"

输出格式要求：
- 使用 Markdown 格式，层级清晰
- 架构部分可以用文字描述或 ASCII 图
- 接口设计使用代码块展示
- 排期使用表格格式
- 风险评估标注严重程度（高/中/低）
- 内容要专业、具体，避免空泛描述
- 创建成功后告知文档标题和链接`,
      },
    },
  ],
};
