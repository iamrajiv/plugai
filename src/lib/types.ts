export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  prompt: string;
  featured: boolean;
  usageCount: number;
  rating: number;
}

export interface AgentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}