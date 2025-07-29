"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/customui/theme-toggle";
import { Github, ExternalLink, Star } from "lucide-react";
import { AuroraText } from "@/components/magicui/aurora-text";

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <Link href="/" className="no-underline">
              <span className="font-bold text-xl sm:text-2xl truncate hover:opacity-80 transition-opacity">
                Plug
              </span>
            </Link>
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-black dark:bg-white rounded-sm flex items-center justify-center flex-shrink-0">
              <span className="text-white dark:text-black font-bold text-xs sm:text-sm">AI</span>
            </div>
          </div>
          <Badge variant="outline" className="text-xs bg-secondary/50 hidden xs:flex">
            Beta
          </Badge>
        </div>

        <nav className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          
          <Button variant="ghost" size="sm" asChild>
            <a
              href="/credits"
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3"
            >
              <span className="text-sm">Credits</span>
            </a>
          </Button>
          
          <Button variant="ghost" size="sm" asChild>
            <a
              href="https://github.com/iamrajiv/plugai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3"
            >
              <Github className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline text-sm">GitHub</span>
            </a>
          </Button>
          
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com/iamrajiv/plugai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3"
              title="Star this repository on GitHub"
            >
              <Star className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline text-sm">Star</span>
            </a>
          </Button>
          
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://claude.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3"
            >
              <ExternalLink className="w-4 h-4 flex-shrink-0" />
              <span className="hidden sm:inline text-sm">Claude AI</span>
            </a>
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}