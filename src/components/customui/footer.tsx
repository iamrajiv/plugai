"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Linkedin, Twitter, Globe } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Portfolio",
      url: "https://iamrajiv.me/",
      icon: Globe
    },
    {
      name: "GitHub",
      url: "https://github.com/iamrajiv",
      icon: Github
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/iamrajivranjansingh",
      icon: Linkedin
    },
    {
      name: "Twitter",
      url: "https://twitter.com/therajiv",
      icon: Twitter
    }
  ];

  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg">Plug</h3>
                    <div className="w-8 h-8 bg-black dark:bg-white rounded-sm flex items-center justify-center">
                      <span className="text-white dark:text-black font-bold text-sm">AI</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Discover the best of AI. All in one place.</p>
                </div>
              </div>
              
              <div className="text-left">
                <p className="text-sm text-muted-foreground">
                  © {currentYear} PlugAI. All rights reserved.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Created by{" "}
                  <a
                    href="https://x.com/therajiv"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground hover:text-primary transition-colors"
                  >
                    Rajiv Singh
                  </a>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {socialLinks.slice(0, -1).map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {link.name}
                  </span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}