"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { HyperText } from "@/components/magicui/hyper-text";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { Sparkles, Code, Zap, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 px-4 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto space-y-6 sm:space-y-8"
      >
        <div className="space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              <AnimatedShinyText className="text-xs sm:text-sm font-medium text-primary">
                AI-Powered Development
              </AnimatedShinyText>
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Discover{" "}
            <AuroraText className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Powerful
            </AuroraText>
            <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Claude{" "}
              <HyperText 
                className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold inline"
                duration={1500}
                delay={0}
                animateOnHover={false}
                startOnView={false}
                as="span"
              >
                Code
              </HyperText>
              {" "}Agents
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Enhance your development workflow with ready-to-use AI agents. 
            From code reviews to debugging, find the perfect assistant for every coding task.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <RainbowButton 
            size="lg" 
            className="group"
            onClick={() => document.getElementById('agents-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Agents
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </RainbowButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">Production Ready</span>
          </div>
          <Separator orientation="vertical" className="h-4 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">Copy & Use</span>
          </div>
          <Separator orientation="vertical" className="h-4 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">Expert Crafted</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}