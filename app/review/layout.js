export const metadata = {
  title: "Review Practice - Test Your Vocabulary Knowledge",
  description:
    "Practice and review your learned vocabulary with interactive flashcards. Choose how many words to review and test your knowledge with definitions and examples.",
  keywords: [
    "vocabulary review",
    "flashcards",
    "vocabulary practice",
    "word quiz",
    "learning review",
    "vocabulary test",
  ],
  openGraph: {
    title: "VocabLake Review - Practice Your Vocabulary",
    description:
      "Test your vocabulary knowledge with interactive flashcards. Choose your session size and review your learned words.",
    images: ["/og-review.png"],
  },
  twitter: {
    title: "VocabLake Review - Practice Your Vocabulary",
    description:
      "Test your vocabulary knowledge with interactive flashcards. Choose your session size and review your learned words.",
  },
  robots: {
    index: false, // Review page should not be indexed by search engines
    follow: true,
  },
};

export default function ReviewLayout({ children }) {
  return children;
}
