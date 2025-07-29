import { Metadata } from "next";

export const siteConfig = {
  name: "PlugAI",
  title: "Discover the best of AI. All in one place.",
  description: "Discover and explore a comprehensive collection of specialized AI agents designed to accelerate development, enhance creativity, and streamline workflows across design, engineering, marketing, product, and project management.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://plugai.vercel.app",
  creator: "@therajiv",
  keywords: [
    "AI agents",
    "artificial intelligence",
    "AI tools",
    "development tools",
    "design agents",
    "engineering AI",
    "marketing automation",
    "product management",
    "project management",
    "specialized AI",
    "AI prompts",
    "agent collection",
    "rapid development",
    "AI workflow",
    "machine learning",
    "automation tools"
  ] as string[],
  authors: [
    {
      name: "PlugAI Team",
      url: "https://plugai.vercel.app",
    },
  ],
};

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  publisher: siteConfig.name,
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: siteConfig.title,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.creator,
    creator: siteConfig.creator,
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  category: "Technology",
  classification: "AI Tools Directory",
  other: {
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
};

export const defaultViewport = {
  width: "device-width",
  initialScale: 1,
};

export function createPageMetadata({
  title,
  description,
  path = "",
  keywords = [],
  images = [],
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  images?: Array<{ url: string; width?: number; height?: number; alt?: string }>;
}): Metadata {
  const url = `${siteConfig.url}${path}`;
  const combinedKeywords = [...siteConfig.keywords, ...keywords];
  const ogImages = images.length > 0 ? images : [{ url: "/og-image.png", width: 1200, height: 630, alt: title }];
  
  return {
    title,
    description,
    keywords: combinedKeywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.creator,
      creator: siteConfig.creator,
      title,
      description,
      images: ogImages.map(img => img.url),
    },
  };
}

export function createAgentMetadata(agent: {
  name: string;
  description: string;
  category: string;
  tags: string[];
}): Metadata {
  const title = `${agent.name} - ${agent.category} AI Agent`;
  const description = `${agent.description} Specialized AI agent for ${agent.category.toLowerCase()} tasks. ${agent.tags.join(", ")}.`;
  
  return createPageMetadata({
    title,
    description,
    path: `/agent/${agent.name.toLowerCase().replace(/\s+/g, "-")}`,
    keywords: [agent.category, ...agent.tags, "ai agent", `${agent.category} ai`],
  });
}

export function createCategoryMetadata(category: {
  name: string;
  description: string;
  id: string;
}): Metadata {
  const title = `${category.name} AI Agents - Specialized Tools for ${category.name}`;
  const description = `${category.description} Explore our curated collection of ${category.name.toLowerCase()} AI agents designed to enhance your workflow.`;
  
  return createPageMetadata({
    title,
    description,
    path: `/category/${category.id}`,
    keywords: [category.name.toLowerCase(), `${category.name.toLowerCase()} ai`, `${category.name.toLowerCase()} agents`, "specialized ai"],
  });
}

export function generateWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    alternateName: "PlugAI Platform",
    description: siteConfig.description,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    foundingDate: "2024",
    sameAs: [
      "https://github.com/contains-studio/agents",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: siteConfig.url,
    },
  };
}

export function generateSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      ratingCount: "100",
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function generateBreadcrumbJsonLd(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumb.name,
      item: breadcrumb.url,
    })),
  };
}