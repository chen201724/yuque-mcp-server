export interface PromptArgument {
  name: string;
  description?: string;
  required?: boolean;
}

export interface PromptMessage {
  role: 'user' | 'assistant';
  content: {
    type: 'text';
    text: string;
  };
}

export interface PromptDefinition {
  name: string;
  description: string;
  arguments: PromptArgument[];
  getMessages: (args: Record<string, string>) => PromptMessage[];
}
