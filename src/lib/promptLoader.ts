const AGENT_CATEGORY_MAP: Record<string, string> = {
  "brand-guardian": "design",
  "ui-designer": "design",
  "ux-researcher": "design",
  "visual-storyteller": "design",
  "whimsy-injector": "design",
  
  "ai-engineer": "engineering",
  "backend-architect": "engineering",
  "devops-automator": "engineering",
  "frontend-developer": "engineering",
  "mobile-app-builder": "engineering",
  "rapid-prototyper": "engineering",
  "test-writer-fixer": "engineering",
  
  "app-store-optimizer": "marketing",
  "content-creator": "marketing",
  "growth-hacker": "marketing",
  "instagram-curator": "marketing",
  "reddit-community-builder": "marketing",
  "tiktok-strategist": "marketing",
  "twitter-engager": "marketing",
  
  "feedback-synthesizer": "product",
  "sprint-prioritizer": "product",
  "trend-researcher": "product",
  
  "experiment-tracker": "project-management",
  "project-shipper": "project-management",
  "studio-producer": "project-management",
};

export async function loadPrompt(promptId: string): Promise<string> {
  try {
    const category = AGENT_CATEGORY_MAP[promptId];
    if (!category) {
      throw new Error(`Unknown agent ID: ${promptId}`);
    }
    
    const response = await fetch(`/claude-agents/${category}/${promptId}.md`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const content = await response.text();
    return content;
  } catch (error) {
    console.error(`Failed to load prompt for ${promptId}:`, error);
    return `Prompt for ${promptId} not found. Please check the prompt file.`;
  }
}

export async function loadAllPrompts(agentIds: string[]): Promise<Record<string, string>> {
  const prompts: Record<string, string> = {};
  
  await Promise.all(
    agentIds.map(async (id) => {
      prompts[id] = await loadPrompt(id);
    })
  );
  
  return prompts;
}