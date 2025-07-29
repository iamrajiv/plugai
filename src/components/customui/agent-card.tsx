"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Agent } from "@/lib/types";
import { Copy, Star, Users, ChevronDown, ChevronUp, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { loadPrompt } from "@/lib/promptLoader";
import { 
  PromptLoadingState, 
  initialPromptState, 
  createLoadingState, 
  loadPromptWithState 
} from "@/lib/prompt-loading";

interface AgentCardProps {
  agent: Agent;
  className?: string;
}

export function AgentCard({ agent, className }: AgentCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [promptState, setPromptState] = useState<PromptLoadingState>(initialPromptState);

  const handleCopyPrompt = useCallback(async () => {
    let contentToCopy = promptState.content;
    
    // If no content loaded yet, load it first
    if (!contentToCopy && !promptState.isLoading) {
      setPromptState(createLoadingState());
      const result = await loadPromptWithState(agent.id, loadPrompt);
      setPromptState(result);
      contentToCopy = result.content;
    }
    
    // If we have content, copy it
    if (contentToCopy) {
      try {
        await navigator.clipboard.writeText(contentToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy prompt:", err);
      }
    }
  }, [promptState.content, promptState.isLoading, agent.id]);

  const handleExpandPrompt = useCallback(async () => {
    if (!isExpanded && !promptState.content && !promptState.isLoading) {
      setPromptState(createLoadingState());
      const result = await loadPromptWithState(agent.id, loadPrompt);
      setPromptState(result);
    }
    setIsExpanded(!isExpanded);
  }, [isExpanded, promptState.content, promptState.isLoading, agent.id]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("group", className)}
    >
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/5 border-border/50 hover:border-border">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <CardTitle className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {agent.name}
                </CardTitle>
                {agent.featured && (
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-primary/20 flex-shrink-0">
                    Featured
                  </Badge>
                )}
              </div>
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                {agent.description}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyPrompt}
              className="flex-shrink-0 h-8 px-2 ml-2"
              title="Copy prompt"
              disabled={promptState.isLoading}
            >
              {promptState.isLoading ? (
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
              ) : (
                <Copy className="w-3 h-3 mr-1" />
              )}
              <span className="text-xs font-medium">
                {promptState.isLoading ? "Loading..." : copied ? "Copied!" : "Copy Agent Prompt"}
              </span>
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-muted-foreground mt-3">
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{agent.rating}</span>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Users className="w-3 h-3" />
              <span className="hidden xs:inline">{agent.usageCount.toLocaleString()} uses</span>
              <span className="xs:hidden">{agent.usageCount > 999 ? `${Math.floor(agent.usageCount/1000)}k` : agent.usageCount}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {agent.tags.slice(0, 6).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs px-2 py-0.5 bg-secondary/50 hover:bg-secondary transition-colors max-w-full"
                >
                  <span className="truncate">{tag}</span>
                </Badge>
              ))}
              {agent.tags.length > 6 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5 bg-secondary/30">
                  +{agent.tags.length - 6}
                </Badge>
              )}
            </div>


            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleExpandPrompt}
                className="w-full justify-between text-sm"
                disabled={promptState.isLoading}
              >
                {promptState.isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Loading Prompt...
                  </>
                ) : promptState.error ? (
                  <>
                    <AlertCircle className="w-4 h-4 mr-2 text-destructive" />
                    Retry Loading
                  </>
                ) : (
                  <>
                    {isExpanded ? "Hide Prompt" : "View Prompt"}
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </>
                )}
              </Button>

              <motion.div
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="bg-muted/30 rounded-lg p-3 text-xs leading-relaxed">
                  {promptState.isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin mr-2" />
                      <span className="text-muted-foreground">Loading prompt...</span>
                    </div>
                  ) : promptState.error ? (
                    <div className="flex items-center justify-center py-8 text-destructive">
                      <AlertCircle className="w-6 h-6 mr-2" />
                      <span>{promptState.error}</span>
                    </div>
                  ) : (
                    <>
                      <pre className="whitespace-pre-wrap font-mono text-muted-foreground overflow-x-auto max-w-full">
                        {promptState.content}
                      </pre>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopyPrompt}
                        className="mt-2 h-7 px-2 text-xs w-full sm:w-auto"
                        disabled={!promptState.content}
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        {copied ? "Copied!" : "Copy Prompt"}
                      </Button>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}