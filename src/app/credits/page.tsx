import { Metadata } from "next";
import { Header } from "@/components/customui/header";
import { Footer } from "@/components/customui/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Star } from "lucide-react";
import { createPageMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Credits - AI Agent Sources & Attributions",
  description: "Acknowledgments and credits for the open-source AI agent collection from Contains Studio Agents repository. Learn about the sources and contributors behind our curated AI tools.",
  path: "/credits",
  keywords: ["credits", "acknowledgments", "open source", "contains studio", "ai agents", "attributions", "sources"],
});

export default function CreditsPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "https://plugai.vercel.app" },
    { name: "Credits", url: "https://plugai.vercel.app/credits" },
  ]);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Contains Studio",
    description: "A comprehensive collection of specialized AI agents designed to accelerate and enhance every aspect of rapid development.",
    url: "https://github.com/contains-studio/agents",
    logo: "https://github.com/contains-studio.png",
    sameAs: [
      "https://github.com/contains-studio/agents",
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Credits
              </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The AI agent prompts on this platform are inspired by the amazing work from the open-source community.
            </p>
          </div>

          {/* Main Repository */}
          <div className="flex justify-center">
            <Card className="w-full max-w-2xl hover:shadow-lg hover:shadow-primary/5 transition-all duration-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Github className="w-6 h-6" />
                      Contains Studio Agents
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-mono">
                      contains-studio/agents
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">1.2k+</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  A comprehensive collection of specialized AI agents designed to accelerate and enhance every aspect of rapid development. Each agent is an expert in their domain, ready to be invoked when needed.
                </p>
                
                <Button variant="outline" asChild className="w-full">
                  <a
                    href="https://github.com/contains-studio/agents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Repository
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>


        </div>
      </main>

      <Footer />
    </div>
    </>
  );
}