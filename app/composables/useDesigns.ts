export interface Design {
    slug: string;
    name: string;
    description: string;
    category: string;
    categoryKey: string;
    githubOrg?: string;
}

export const CATEGORIES = [
    "AI & LLM",
    "Developer Tools",
    "Backend & DB",
    "Productivity",
    "Design & Creative",
    "Fintech",
    "E-commerce & Retail",
    "Media & Consumer",
    "Automotive",
] as const;

export type Category = (typeof CATEGORIES)[number];

// i18n-safe category keys (used in translation lookups and filtering)
export const CATEGORY_KEYS = [
    "ai",
    "developerTools",
    "backend",
    "productivity",
    "design",
    "fintech",
    "ecommerce",
    "media",
    "automotive",
] as const;

export const DESIGNS: Design[] = [
    {
        slug: "claude",
        name: "Claude",
        description: "Anthropic's AI assistant. Warm terracotta accent, clean editorial layout.",
        category: "AI & LLM",
        categoryKey: "ai",
        githubOrg: "anthropics",
    },
    {
        slug: "cohere",
        name: "Cohere",
        description: "Enterprise AI platform. Vibrant gradients, data-rich dashboard aesthetic.",
        category: "AI & LLM",
        categoryKey: "ai",
        githubOrg: "cohere-ai",
    },
    {
        slug: "composio",
        name: "Composio",
        description: "Tool integration platform. Modern dark with colorful integration icons.",
        category: "AI & LLM",
        categoryKey: "ai",
        githubOrg: "ComposioHQ",
    },
    {
        slug: "cursor",
        name: "Cursor",
        description: "AI-first code editor. Sleek dark interface, gradient accents.",
        category: "AI & LLM",
        categoryKey: "ai",
    },
    {
        slug: "elevenlabs",
        name: "ElevenLabs",
        description: "AI voice platform. Dark cinematic UI, audio-waveform aesthetics.",
        category: "AI & LLM",
        categoryKey: "ai",
    },
    {
        slug: "lovable",
        name: "Lovable",
        description: "AI full-stack builder. Playful gradients, friendly dev aesthetic.",
        category: "AI & LLM",
        categoryKey: "ai",
        githubOrg: "lovablelabs",
    },
    {
        slug: "minimax",
        name: "MiniMax",
        description: "AI model provider. Bold dark interface with neon accents.",
        category: "AI & LLM",
        categoryKey: "ai",
        githubOrg: "MiniMax-AI",
    },
    {
        slug: "mistral.ai",
        name: "Mistral AI",
        description: "Open-weight LLM. French-engineered minimalism, purple-toned.",
        category: "AI & LLM",
        categoryKey: "ai",
        githubOrg: "mistralai",
    },
    {
        slug: "ollama",
        name: "Ollama",
        description: "Run LLMs locally. Terminal-first, monochrome simplicity.",
        category: "AI & LLM",
        categoryKey: "ai",
    },
    {
        slug: "opencode.ai",
        name: "OpenCode",
        description: "AI coding platform. Developer-centric dark theme.",
        category: "AI & LLM",
        categoryKey: "ai",
        githubOrg: "opencode-ai",
    },
    {
        slug: "together.ai",
        name: "Together AI",
        description: "Open-source AI infrastructure. Technical, blueprint-style design.",
        category: "AI & LLM",
        categoryKey: "ai",
        githubOrg: "togethercomputer",
    },
    {
        slug: "x.ai",
        name: "xAI",
        description: "Elon Musk's AI lab. Stark monochrome, futuristic minimalism.",
        category: "AI & LLM",
        categoryKey: "ai",
        githubOrg: "xai-org",
    },
    {
        slug: "expo",
        name: "Expo",
        description: "React Native platform. Dark theme, tight letter-spacing, code-centric.",
        category: "Developer Tools",
        categoryKey: "developerTools",
    },
    {
        slug: "framer",
        name: "Framer",
        description: "Website builder. Bold black and blue, motion-first, design-forward.",
        category: "Developer Tools",
        categoryKey: "developerTools",
    },
    {
        slug: "hashicorp",
        name: "HashiCorp",
        description: "Infrastructure automation. Enterprise-clean, black and white.",
        category: "Developer Tools",
        categoryKey: "developerTools",
    },
    {
        slug: "linear.app",
        name: "Linear",
        description: "Project management. Ultra-minimal, precise, purple accent.",
        category: "Developer Tools",
        categoryKey: "developerTools",
    },
    {
        slug: "mintlify",
        name: "Mintlify",
        description: "Documentation platform. Clean, green-accented, reading-optimized.",
        category: "Developer Tools",
        categoryKey: "developerTools",
    },
    {
        slug: "raycast",
        name: "Raycast",
        description: "Productivity launcher. Sleek dark chrome, vibrant gradient accents.",
        category: "Developer Tools",
        categoryKey: "developerTools",
    },
    {
        slug: "warp",
        name: "Warp",
        description: "Modern terminal. Dark IDE-like interface, block-based command UI.",
        category: "Developer Tools",
        categoryKey: "developerTools",
        githubOrg: "warpdotdev",
    },
    {
        slug: "clickhouse",
        name: "ClickHouse",
        description: "Fast analytics database. Yellow-accented, technical documentation style.",
        category: "Backend & DB",
        categoryKey: "backend",
        githubOrg: "ClickHouse",
    },
    {
        slug: "mongodb",
        name: "MongoDB",
        description: "Document database. Green leaf branding, developer documentation focus.",
        category: "Backend & DB",
        categoryKey: "backend",
    },
    {
        slug: "posthog",
        name: "PostHog",
        description: "Product analytics. Playful hedgehog branding, developer-friendly dark UI.",
        category: "Backend & DB",
        categoryKey: "backend",
        githubOrg: "PostHog",
    },
    {
        slug: "replicate",
        name: "Replicate",
        description: "Run ML models via API. Clean white canvas, code-forward.",
        category: "Backend & DB",
        categoryKey: "backend",
    },
    {
        slug: "resend",
        name: "Resend",
        description: "Email API. Minimal dark theme, monospace accents.",
        category: "Backend & DB",
        categoryKey: "backend",
    },
    {
        slug: "runwayml",
        name: "Runway",
        description: "AI video generation. Cinematic dark UI, media-rich layout.",
        category: "Backend & DB",
        categoryKey: "backend",
    },
    {
        slug: "sanity",
        name: "Sanity",
        description: "Headless CMS. Red accent, content-first editorial layout.",
        category: "Backend & DB",
        categoryKey: "backend",
        githubOrg: "sanity-io",
    },
    {
        slug: "supabase",
        name: "Supabase",
        description: "Open-source Firebase alternative. Dark emerald theme, code-first.",
        category: "Backend & DB",
        categoryKey: "backend",
    },
    {
        slug: "airtable",
        name: "Airtable",
        description: "Spreadsheet-database hybrid. Colorful, friendly, structured data aesthetic.",
        category: "Productivity",
        categoryKey: "productivity",
        githubOrg: "Airtable",
    },
    {
        slug: "cal",
        name: "Cal.com",
        description: "Open-source scheduling. Clean neutral UI, developer-oriented simplicity.",
        category: "Productivity",
        categoryKey: "productivity",
        githubOrg: "calcom",
    },
    {
        slug: "intercom",
        name: "Intercom",
        description: "Customer messaging. Friendly blue palette, conversational UI patterns.",
        category: "Productivity",
        categoryKey: "productivity",
    },
    {
        slug: "miro",
        name: "Miro",
        description: "Visual collaboration. Bright yellow accent, infinite canvas aesthetic.",
        category: "Productivity",
        categoryKey: "productivity",
        githubOrg: "miroapp",
    },
    {
        slug: "notion",
        name: "Notion",
        description: "All-in-one workspace. Warm minimalism, serif headings, soft surfaces.",
        category: "Productivity",
        categoryKey: "productivity",
        githubOrg: "makenotion",
    },
    {
        slug: "superhuman",
        name: "Superhuman",
        description: "Fast email client. Premium dark UI, keyboard-first, purple glow.",
        category: "Productivity",
        categoryKey: "productivity",
    },
    {
        slug: "zapier",
        name: "Zapier",
        description: "Automation platform. Warm orange, friendly illustration-driven.",
        category: "Productivity",
        categoryKey: "productivity",
    },
    {
        slug: "clay",
        name: "Clay",
        description: "Creative agency. Organic shapes, soft gradients, art-directed layout.",
        category: "Design & Creative",
        categoryKey: "design",
        githubOrg: "clay-run",
    },
    {
        slug: "figma",
        name: "Figma",
        description: "Collaborative design tool. Vibrant multi-color, playful yet professional.",
        category: "Design & Creative",
        categoryKey: "design",
    },
    {
        slug: "ibm",
        name: "IBM",
        description: "Enterprise technology. Carbon design system, structured blue palette.",
        category: "Design & Creative",
        categoryKey: "design",
    },
    {
        slug: "sentry",
        name: "Sentry",
        description: "Error monitoring. Dark dashboard, data-dense, pink-purple accent.",
        category: "Design & Creative",
        categoryKey: "design",
        githubOrg: "getsentry",
    },
    {
        slug: "vercel",
        name: "Vercel",
        description: "Deployment platform. Ultra-minimal black and white, geometric precision.",
        category: "Developer Tools",
        categoryKey: "developerTools",
        githubOrg: "vercel",
    },
    {
        slug: "voltagent",
        name: "VoltAgent",
        description: "AI agent framework. Void-black canvas, emerald accent, terminal-native.",
        category: "Design & Creative",
        categoryKey: "design",
        githubOrg: "VoltAgent",
    },
    {
        slug: "webflow",
        name: "Webflow",
        description: "Visual web builder. Blue-accented, polished marketing site aesthetic.",
        category: "Design & Creative",
        categoryKey: "design",
    },
    {
        slug: "binance",
        name: "Binance",
        description: "Crypto exchange. Bold yellow accent on monochrome, trading-floor urgency.",
        category: "Fintech",
        categoryKey: "fintech",
    },
    {
        slug: "coinbase",
        name: "Coinbase",
        description: "Crypto exchange. Clean blue identity, trust-focused, institutional feel.",
        category: "Fintech",
        categoryKey: "fintech",
    },
    {
        slug: "kraken",
        name: "Kraken",
        description: "Crypto trading. Purple-accented dark UI, data-dense dashboards.",
        category: "Fintech",
        categoryKey: "fintech",
    },
    {
        slug: "revolut",
        name: "Revolut",
        description: "Digital banking. Sleek dark interface, gradient cards, fintech precision.",
        category: "Fintech",
        categoryKey: "fintech",
    },
    {
        slug: "stripe",
        name: "Stripe",
        description: "Payment infrastructure. Signature purple gradients, weight-300 elegance.",
        category: "Fintech",
        categoryKey: "fintech",
    },
    {
        slug: "wise",
        name: "Wise",
        description: "Money transfer. Bright green accent, friendly and clear.",
        category: "Fintech",
        categoryKey: "fintech",
    },
    {
        slug: "airbnb",
        name: "Airbnb",
        description: "Travel marketplace. Warm coral accent, photography-driven, rounded UI.",
        category: "E-commerce & Retail",
        categoryKey: "ecommerce",
    },
    {
        slug: "pinterest",
        name: "Pinterest",
        description: "Visual discovery. Red accent, masonry grid, image-first.",
        category: "E-commerce & Retail",
        categoryKey: "ecommerce",
    },
    {
        slug: "shopify",
        name: "Shopify",
        description: "E-commerce platform. Dark-first cinematic, neon green accent.",
        category: "E-commerce & Retail",
        categoryKey: "ecommerce",
    },
    {
        slug: "uber",
        name: "Uber",
        description: "Mobility platform. Bold black and white, tight type, urban energy.",
        category: "E-commerce & Retail",
        categoryKey: "ecommerce",
    },
    {
        slug: "apple",
        name: "Apple",
        description: "Consumer electronics. Premium white space, SF Pro, cinematic imagery.",
        category: "Media & Consumer",
        categoryKey: "media",
    },
    {
        slug: "meta",
        name: "Meta",
        description: "Tech retail store. Photography-first, binary light/dark surfaces.",
        category: "Media & Consumer",
        categoryKey: "media",
    },
    {
        slug: "nike",
        name: "Nike",
        description: "Athletic retail. Monochrome UI, massive uppercase type, full-bleed photography.",
        category: "Media & Consumer",
        categoryKey: "media",
    },
    {
        slug: "playstation",
        name: "PlayStation",
        description: "Gaming console. Three-surface channel layout, cyan hover-scale.",
        category: "Media & Consumer",
        categoryKey: "media",
    },
    {
        slug: "spotify",
        name: "Spotify",
        description: "Music streaming. Vibrant green on dark, bold type, album-art-driven.",
        category: "Media & Consumer",
        categoryKey: "media",
    },
    {
        slug: "theverge",
        name: "The Verge",
        description: "Tech editorial. Acid-mint and ultraviolet accents, Manuka display.",
        category: "Media & Consumer",
        categoryKey: "media",
    },
    {
        slug: "wired",
        name: "WIRED",
        description: "Tech magazine. Paper-white broadsheet density, custom serif display.",
        category: "Media & Consumer",
        categoryKey: "media",
    },
    {
        slug: "nvidia",
        name: "NVIDIA",
        description: "GPU computing. Green-black energy, technical power aesthetic.",
        category: "Media & Consumer",
        categoryKey: "media",
        githubOrg: "NVIDIA",
    },
    {
        slug: "bmw",
        name: "BMW",
        description: "Luxury automotive. Dark premium surfaces, precise German engineering.",
        category: "Automotive",
        categoryKey: "automotive",
    },
    {
        slug: "bugatti",
        name: "Bugatti",
        description: "Hypercar brand. Cinema-black canvas, monochrome austerity.",
        category: "Automotive",
        categoryKey: "automotive",
    },
    {
        slug: "ferrari",
        name: "Ferrari",
        description: "Luxury automotive. Chiaroscuro editorial, Ferrari Red accents.",
        category: "Automotive",
        categoryKey: "automotive",
    },
    {
        slug: "lamborghini",
        name: "Lamborghini",
        description: "Supercar brand. True black surfaces, gold accents, dramatic uppercase.",
        category: "Automotive",
        categoryKey: "automotive",
    },
    {
        slug: "renault",
        name: "Renault",
        description: "French automotive. Vibrant aurora gradients, NouvelR typography.",
        category: "Automotive",
        categoryKey: "automotive",
    },
    {
        slug: "spacex",
        name: "SpaceX",
        description: "Space technology. Stark black and white, full-bleed imagery, futuristic.",
        category: "Automotive",
        categoryKey: "automotive",
    },
    {
        slug: "tesla",
        name: "Tesla",
        description: "Electric automotive. Radical subtraction, full-viewport photography.",
        category: "Automotive",
        categoryKey: "automotive",
    },
];

export function avatarUrl(design: Design): string {
    const org = design.githubOrg ?? design.slug.replace(/\./g, "");
    return `https://github.com/${org}.png?size=80`;
}

export function previewUrl(slug: string, variant: "light" | "dark" = "light"): string {
    return variant === "dark" ? `/designs/${slug}/dark.html` : `/designs/${slug}/index.html`;
}

export function markdownUrl(slug: string): string {
    return `/designs/${slug}/design.md`;
}

export function findDesign(slug: string): Design | undefined {
    return DESIGNS.find((d) => d.slug === slug);
}

export function designsByCategory(): Record<string, Design[]> {
    const groups: Record<string, Design[]> = {};
    for (const cat of CATEGORIES) {
        groups[cat] = [];
    }
    for (const d of DESIGNS) {
        if (groups[d.category]) {
            groups[d.category].push(d);
        }
    }
    return groups;
}

export function useDesigns() {
    return {
        designs: DESIGNS,
        categories: CATEGORIES,
        avatarUrl,
        previewUrl,
        markdownUrl,
        findDesign,
        designsByCategory,
        categoryStyle: undefined,
    };
}
