import type { PromptDefinition } from './types.js';
import { smartSearchPrompt } from './smart-search.js';
import { meetingNotesPrompt } from './meeting-notes.js';
import { weeklyReportPrompt } from './weekly-report.js';
import { techDesignPrompt } from './tech-design.js';
import { onboardingGuidePrompt } from './onboarding-guide.js';
import { knowledgeReportPrompt } from './knowledge-report.js';

export type { PromptDefinition, PromptArgument, PromptMessage } from './types.js';

export const allPrompts: PromptDefinition[] = [
  smartSearchPrompt,
  meetingNotesPrompt,
  weeklyReportPrompt,
  techDesignPrompt,
  onboardingGuidePrompt,
  knowledgeReportPrompt,
];

export const promptsByName: Record<string, PromptDefinition> = Object.fromEntries(
  allPrompts.map((p) => [p.name, p])
);
