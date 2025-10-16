import Hero from "./Hero/Hero";

export const metadata = {
  title: "Learn New Vocabulary Words with AI-Powered Definitions",
  description:
    "Start your vocabulary learning journey with VocabLake. Search for words and get comprehensive definitions, examples, and visual aids powered by AI. Build your personal vocabulary lake today.",
  keywords: [
    "vocabulary learning",
    "word definitions",
    "AI vocabulary",
    "learn new words",
    "dictionary",
    "vocabulary builder",
  ],
  openGraph: {
    title: "VocabLake - Start Learning Vocabulary Today",
    description:
      "Search for words and get comprehensive definitions, examples, and visual aids powered by AI. Build your personal vocabulary lake.",
    images: ["/og-home.png"],
  },
  twitter: {
    title: "VocabLake - Start Learning Vocabulary Today",
    description:
      "Search for words and get comprehensive definitions, examples, and visual aids powered by AI.",
  },
};

const page = () => {
  return <Hero />;
};

export default page;
