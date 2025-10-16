/**
 * SEO utilities for VocabLake
 * Provides structured data, JSON-LD schemas, and SEO helpers
 */

// JSON-LD structured data for the application
export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "VocabLake",
  description:
    "AI-powered vocabulary learning platform with personalized flashcards and progress tracking",
  url: "https://vocablake.com",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "VocabLake Team",
  },
  featureList: [
    "AI-powered word definitions",
    "Interactive flashcards",
    "Progress tracking",
    "Vocabulary export",
    "Learning streaks",
    "Visual word aids",
  ],
});

export const generateBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const generateEducationalOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "VocabLake",
  description: "Online vocabulary learning platform",
  url: "https://vocablake.com",
  sameAs: [
    "https://twitter.com/vocablake",
    "https://github.com/kevthefoo/VocabLake",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "support@vocablake.com",
  },
});

// FAQ Schema for common questions
export const generateFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is VocabLake?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "VocabLake is an AI-powered vocabulary learning platform that helps users discover, learn, and master new words with comprehensive definitions, examples, and visual aids.",
      },
    },
    {
      "@type": "Question",
      name: "Is VocabLake free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! VocabLake offers a free tier with up to 10 vocabulary searches per day. Premium users get unlimited searches and advanced features.",
      },
    },
    {
      "@type": "Question",
      name: "Can I export my vocabulary collection?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, you can export your entire vocabulary collection as CSV or JSON files from your dashboard.",
      },
    },
    {
      "@type": "Question",
      name: "Does VocabLake track my learning progress?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, VocabLake provides detailed analytics including learning streaks, monthly progress charts, and vocabulary statistics.",
      },
    },
  ],
});

// Helper to inject JSON-LD script
export const StructuredData = ({ schema }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
};

// Meta tags for social sharing
export const SocialMeta = ({
  title,
  description,
  image = "/og-image.png",
  url = "https://vocablake.com",
}) => {
  return (
    <>
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="VocabLake" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@vocablake" />

      {/* Additional */}
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
    </>
  );
};
