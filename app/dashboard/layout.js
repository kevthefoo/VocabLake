export const metadata = {
  title: "Dashboard - Your Vocabulary Progress",
  description:
    "Track your vocabulary learning progress with detailed statistics, recent words, learning streaks, and monthly growth charts. Export your vocabulary collection and see your achievements.",
  keywords: [
    "vocabulary dashboard",
    "learning progress",
    "vocabulary statistics",
    "word tracking",
    "learning analytics",
  ],
  openGraph: {
    title: "VocabLake Dashboard - Track Your Vocabulary Progress",
    description:
      "View your vocabulary learning statistics, recent words, learning streaks, and export your collection.",
    images: ["/og-dashboard.png"],
  },
  twitter: {
    title: "VocabLake Dashboard - Track Your Vocabulary Progress",
    description:
      "View your vocabulary learning statistics, recent words, learning streaks, and export your collection.",
  },
  robots: {
    index: false, // Dashboard should not be indexed by search engines
    follow: true,
  },
};

export default function DashboardLayout({ children }) {
  return children;
}
