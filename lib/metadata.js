// Shared metadata configuration for VocabLake

export const siteConfig = {
  name: "VocabLake",
  description:
    "Discover, learn, and master new vocabulary with VocabLake. AI-powered definitions, examples, and personalized learning to expand your word knowledge.",
  url: "https://vocablake.com",
  ogImage: "https://vocablake.com/og-image.png",
  links: {
    twitter: "https://twitter.com/vocablake",
    github: "https://github.com/kevthefoo/VocabLake",
  },
  creator: "VocabLake Team",
  keywords: [
    "vocabulary",
    "learning",
    "education",
    "words",
    "dictionary",
    "AI",
    "language",
    "study",
    "english",
    "vocabulary builder",
    "flashcards",
  ],
};

export const defaultMetadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.creator,
    },
  ],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@vocablake",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

// Page-specific metadata generators
export const generatePageMetadata = (page) => {
  const pageConfigs = {
    home: {
      title: "Learn New Vocabulary Words with AI-Powered Definitions",
      description:
        "Start your vocabulary learning journey with VocabLake. Search for words and get comprehensive definitions, examples, and visual aids powered by AI.",
      path: "/",
    },
    dashboard: {
      title: "Dashboard - Your Vocabulary Progress",
      description:
        "Track your vocabulary learning progress with detailed statistics, recent words, learning streaks, and monthly growth charts.",
      path: "/dashboard",
      noIndex: true,
    },
    review: {
      title: "Review Practice - Test Your Vocabulary Knowledge",
      description:
        "Practice and review your learned vocabulary with interactive flashcards. Choose how many words to review and test your knowledge.",
      path: "/review",
      noIndex: true,
    },
    pricing: {
      title: "Pricing Plans - Choose Your VocabLake Subscription",
      description:
        "Choose the perfect VocabLake plan for your vocabulary learning needs. Free tier with 10 searches per day or unlimited premium access.",
      path: "/pricing",
    },
    profile: {
      title: "User Profile - Manage Your VocabLake Account",
      description:
        "Manage your VocabLake profile, account settings, subscription details, and learning preferences.",
      path: "/profile",
      noIndex: true,
    },
  };

  const config = pageConfigs[page];
  if (!config) return defaultMetadata;

  return {
    ...defaultMetadata,
    title: config.title,
    description: config.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: config.title,
      description: config.description,
      url: `${siteConfig.url}${config.path}`,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: config.title,
      description: config.description,
    },
    robots: config.noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
        },
  };
};
