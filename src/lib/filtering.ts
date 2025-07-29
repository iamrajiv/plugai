import { Agent } from "./types";

export interface FilterOptions {
  searchQuery?: string;
  category?: string | null;
  tags?: string[];
}

export function filterAgents(agents: Agent[], options: FilterOptions): Agent[] {
  let filtered = agents;

  if (options.searchQuery) {
    const lowercaseQuery = options.searchQuery.toLowerCase();
    filtered = filtered.filter(agent =>
      agent.name.toLowerCase().includes(lowercaseQuery) ||
      agent.description.toLowerCase().includes(lowercaseQuery) ||
      agent.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  if (options.category) {
    filtered = filtered.filter(agent => agent.category === options.category);
  }

  if (options.tags && options.tags.length > 0) {
    filtered = filtered.filter(agent =>
      options.tags!.every(tag => agent.tags.includes(tag))
    );
  }

  return filtered;
}

export function sortAgents(agents: Agent[]): Agent[] {
  return agents.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.rating - a.rating;
  });
}

export function extractUniqueTags(agents: Agent[]): string[] {
  return Array.from(
    new Set(agents.flatMap(agent => agent.tags))
  ).sort();
}

export function createFilterState(
  searchQuery: string,
  selectedCategory: string | null,
  selectedTags: string[]
): FilterOptions {
  return {
    searchQuery: searchQuery || undefined,
    category: selectedCategory,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
  };
}

export function hasActiveFilters(options: FilterOptions): boolean {
  return !!(options.searchQuery || options.category || (options.tags && options.tags.length > 0));
}