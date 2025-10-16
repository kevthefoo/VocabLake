import { auth } from "@clerk/nextjs/server";

import { PricingTable } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

export const metadata = {
  title: "Pricing Plans - Choose Your VocabLake Subscription",
  description:
    "Choose the perfect VocabLake plan for your vocabulary learning needs. Free tier with 10 searches per day or unlimited premium access with advanced features.",
  keywords: [
    "vocabulary subscription",
    "pricing plans",
    "vocabulary learning premium",
    "upgrade vocabulary",
    "unlimited vocabulary searches",
  ],
  openGraph: {
    title: "VocabLake Pricing - Unlock Unlimited Vocabulary Learning",
    description:
      "Choose between free tier (10 searches/day) or premium unlimited access. Start your vocabulary learning journey today.",
    images: ["/og-pricing.png"],
  },
  twitter: {
    title: "VocabLake Pricing - Unlock Unlimited Vocabulary Learning",
    description:
      "Choose between free tier (10 searches/day) or premium unlimited access. Start learning today.",
  },
};
const page = async () => {
  const { has } = await auth();

  const hasFreePlan = has({ plan: "free_user" });
  const hasStandardPlan = has({ plan: "std" });
  console.log(hasStandardPlan);

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl">
            Unlock the full potential of your vocabulary learning journey with
            our flexible pricing plans designed for every learner.
          </p>
        </div>

        {/* Pricing Table Container */}
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-2xl md:p-8 lg:p-12">
            <PricingTable
              className="w-full max-w-full"
              appearance={{
                baseTheme: neobrutalism,
                elements: {
                  card: "max-w-sm mx-auto",
                  cardBox: "max-w-sm",
                  planName: "max-w-full text-center",
                  planDescription: "max-w-full text-center",
                  planPrice: "max-w-full text-center",
                  planFeatures: "max-w-full",
                  planButton: "max-w-full w-full",
                },
              }}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Why Choose VocabLake?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Experience the most comprehensive vocabulary learning platform
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="mx-auto w-full max-w-sm rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <span className="text-2xl">🌊</span>
              </div>
              <h3 className="mb-2 text-center text-xl font-semibold text-gray-900">
                Interactive Lake
              </h3>
              <p className="mx-auto max-w-xs text-center text-gray-600">
                Watch your vocabulary grow in our beautiful animated lake
                ecosystem
              </p>
            </div>

            {/* Feature 2 */}
            <div className="mx-auto w-full max-w-sm rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="mb-2 text-center text-xl font-semibold text-gray-900">
                Progress Tracking
              </h3>
              <p className="mx-auto max-w-xs text-center text-gray-600">
                Monitor your learning journey with detailed analytics and
                insights
              </p>
            </div>

            {/* Feature 3 */}
            <div className="mx-auto w-full max-w-sm rounded-xl bg-white p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl md:col-span-2 lg:col-span-1">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="mb-2 text-center text-xl font-semibold text-gray-900">
                Smart Review
              </h3>
              <p className="mx-auto max-w-xs text-center text-gray-600">
                AI-powered spaced repetition for optimal vocabulary retention
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
