"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/customui/header";
import { HeroSection } from "@/components/customui/hero-section";
import { SearchFilter } from "@/components/customui/search-filter";
import { AgentCard } from "@/components/customui/agent-card";
import { Footer } from "@/components/customui/footer";
import { agents as allAgents } from "@/lib/data";
import { sortAgents } from "@/lib/filtering";
import { Agent } from "@/lib/types";

export default function Home() {
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>(allAgents);

  const sortedAgents = useMemo(() => {
    return sortAgents(filteredAgents);
  }, [filteredAgents]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <HeroSection />
        
        <div id="agents-section" className="container mx-auto px-4 pb-20 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <SearchFilter
                  agents={allAgents}
                  onFilteredAgents={setFilteredAgents}
                  className="lg:max-w-none"
                />
              </div>
            </aside>

            <div className="lg:col-span-3 space-y-8 sm:space-y-12 min-w-0">
              {sortedAgents.length > 0 ? (
                <section>
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold truncate">AI Agents</h2>
                    <div className="h-px bg-border flex-1 min-w-4" />
                    <span className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                      {sortedAgents.length} {sortedAgents.length === 1 ? 'agent' : 'agents'}
                    </span>
                  </div>

                  <motion.div
                    layout
                    className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6"
                  >
                    {sortedAgents.map((agent, index) => (
                      <motion.div
                        key={agent.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="min-w-0"
                      >
                        <AgentCard agent={agent} />
                      </motion.div>
                    ))}
                  </motion.div>
                </section>
              ) : (
                <div className="text-center py-12 px-4">
                  <p className="text-muted-foreground text-base sm:text-lg">
                    No agents found matching your criteria.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try adjusting your search or filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}