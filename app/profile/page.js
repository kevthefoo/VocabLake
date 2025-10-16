import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const metadata = {
  title: "User Profile - Manage Your VocabLake Account",
  description:
    "Manage your VocabLake profile, account settings, subscription details, and learning preferences. Update your personal information and customize your learning experience.",
  keywords: [
    "user profile",
    "account settings",
    "vocabulary preferences",
    "subscription management",
    "user dashboard",
  ],
  openGraph: {
    title: "VocabLake Profile - Manage Your Account",
    description:
      "Access your profile settings, subscription details, and learning preferences.",
    images: ["/og-profile.png"],
  },
  twitter: {
    title: "VocabLake Profile - Manage Your Account",
    description:
      "Access your profile settings, subscription details, and learning preferences.",
  },
  robots: {
    index: false, // Profile page should not be indexed by search engines
    follow: true,
  },
};

const page = () => {
  return (
    <div>
      <SignedOut />
    </div>
  );
};

export default page;
