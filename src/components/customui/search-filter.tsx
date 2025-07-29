"use client";

import { useState, useMemo, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X, Filter } from "lucide-react";
import { Agent } from "@/lib/types";
import { categories } from "@/lib/data";
import { filterAgents, extractUniqueTags, createFilterState, hasActiveFilters } from "@/lib/filtering";
import { cn } from "@/lib/utils";

interface SearchFilterProps {
  agents: Agent[];
  onFilteredAgents: (filtered: Agent[]) => void;
  className?: string;
}

export function SearchFilter({ agents, onFilteredAgents, className }: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => extractUniqueTags(agents), [agents]);

  const applyFilters = useCallback((query: string, category: string | null, tags: string[]) => {
    const filterOptions = createFilterState(query, category, tags);
    const filtered = filterAgents(agents, filterOptions);
    onFilteredAgents(filtered);
  }, [agents, onFilteredAgents]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    applyFilters(value, selectedCategory, selectedTags);
  }, [selectedCategory, selectedTags, applyFilters]);

  const handleCategorySelect = useCallback((categoryId: string) => {
    const newCategory = selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newCategory);
    applyFilters(searchQuery, newCategory, selectedTags);
  }, [searchQuery, selectedCategory, selectedTags, applyFilters]);

  const handleTagToggle = useCallback((tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    applyFilters(searchQuery, selectedCategory, newTags);
  }, [searchQuery, selectedCategory, selectedTags, applyFilters]);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory(null);
    setSelectedTags([]);
    onFilteredAgents(agents);
  }, [agents, onFilteredAgents]);

  const activeFilters = useMemo(() => 
    hasActiveFilters(createFilterState(searchQuery, selectedCategory, selectedTags)), 
    [searchQuery, selectedCategory, selectedTags]
  );

  return (
    <div className={cn("space-y-4 sm:space-y-6", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search agents..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 text-sm w-full"
        />
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm font-medium text-foreground">Categories</span>
          </div>
          {activeFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs h-7 flex-shrink-0"
            >
              <X className="w-3 h-3 mr-1" />
              <span className="hidden xs:inline">Clear all</span>
              <span className="xs:hidden">Clear</span>
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground text-xs px-2 py-1",
                selectedCategory === category.id && "bg-primary text-primary-foreground"
              )}
              onClick={() => handleCategorySelect(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="space-y-2">
          <span className="text-sm font-medium text-foreground">Selected Tags</span>
          <div className="flex flex-wrap gap-1.5">
            {selectedTags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer bg-secondary/80 hover:bg-secondary text-xs px-2 py-1 max-w-full"
                onClick={() => handleTagToggle(tag)}
              >
                <span className="truncate">{tag}</span>
                <X className="w-3 h-3 ml-1 flex-shrink-0" />
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <span className="text-sm font-medium text-foreground">Popular Tags</span>
        <div className="flex flex-wrap gap-1.5">
          {allTags.slice(0, 12).map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground text-xs px-2 py-1 max-w-full",
                selectedTags.includes(tag) && "bg-primary text-primary-foreground"
              )}
              onClick={() => handleTagToggle(tag)}
            >
              <span className="truncate">{tag}</span>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}