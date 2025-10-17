"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import randomQuery from "@/lib/randomQuery";
import { ArrowBigLeft, ArrowBigRight, Volume2 } from "lucide-react";
import playPronunce from "@/lib/playPronunce";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ClientMetadata from "@/components/ClientMetadata/ClientMetadata";

const Page = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [vocabData, setVocabData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCount, setSelectedCount] = useState(5); // Default to 5

  // Only fetch if user is loaded AND signed in
  if (!isLoaded) {
    return;
  }

  // Only fetch if user is loaded AND signed in
  if (!isSignedIn || !user) {
    redirect("/");
  }

  const vocabOptions = [
    { value: 5, label: "5 Words", description: "Quick review" },
    { value: 10, label: "10 Words", description: "Standard practice" },
    { value: 30, label: "30 Words", description: "Extended session" },
    { value: 100, label: "100 Words", description: "Gimme a brainstorm" },
  ];

  const handleStart = async () => {
    const data = await randomQuery(user.id, selectedCount); // Pass the selected count
    setVocabData(data);
    setCurrentIndex(0);
  };

  const handlePreviousVocab = async () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleNextVocab = async () => {
    setCurrentIndex((prev) =>
      vocabData && prev < vocabData.length - 1 ? prev + 1 : prev,
    );
  };

  const playPronunceHandler = async () => {
    const term = vocabData[currentIndex].term;
    playPronunce(term);
  };
  return (
    <>
      <ClientMetadata
        title="Review Practice - Test Your Vocabulary Knowledge"
        description="Practice and review your learned vocabulary with interactive flashcards. Choose how many words to review and test your knowledge."
        keywords={[
          "vocabulary review",
          "flashcards",
          "vocabulary practice",
          "word quiz",
          "learning review",
        ]}
        noIndex={true}
      />
      <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Header Section */}
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Vocabulary
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {" "}
                Review
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Test your vocabulary knowledge with our interactive review system
            </p>
          </div>

          {/* Main Content Container */}
          <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center">
            {vocabData && vocabData[currentIndex] && (
              <div className="mx-auto flex w-full max-w-3xl items-center justify-center gap-4">
                <Button
                  onClick={handlePreviousVocab}
                  disabled={currentIndex === 0}
                  className="flex cursor-pointer items-center justify-center border-0 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ArrowBigLeft className="h-5 w-5" />
                </Button>

                {/* Vocabulary Card */}
                <div className="max-w-2xl rounded-2xl bg-white p-6 shadow-2xl md:p-8 lg:p-12">
                  {/* Header with term and pronunciation */}
                  <div className="mx-auto mb-8 max-w-xl text-center">
                    <div className="mb-4 flex items-center justify-center gap-4">
                      <h2 className="max-w-lg text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
                        {vocabData[currentIndex].term}
                      </h2>
                      <button
                        onClick={playPronunceHandler}
                        className="max-w-fit cursor-pointer rounded-full bg-blue-100 p-3 transition-colors duration-200 hover:bg-blue-200"
                        aria-label="Play pronunciation"
                      >
                        <Volume2 className="h-6 w-6 text-blue-600" />
                      </button>
                    </div>

                    {/* Progress indicator */}
                    <div className="mx-auto max-w-xs">
                      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                        <span>
                          {currentIndex + 1} of {vocabData.length}
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                          style={{
                            width: `${((currentIndex + 1) / vocabData.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Descriptions */}
                  <div className="mx-auto max-w-2xl space-y-6">
                    {vocabData[currentIndex].descriptions.map((des, index) => (
                      <div
                        key={index}
                        className="max-w-full border-l-4 border-blue-500 pl-6"
                      >
                        <p className="mb-2 max-w-prose text-lg font-semibold text-gray-800 md:text-xl">
                          {des.meaning}
                        </p>
                        <p className="max-w-prose text-base leading-relaxed text-gray-600 italic md:text-lg">
                          &ldquo;{des.example}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleNextVocab}
                  disabled={currentIndex === vocabData.length - 1}
                  className="flex cursor-pointer items-center justify-center border-0 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ArrowBigRight className="h-5 w-5" />
                </Button>

                {/* Navigation Buttons
              <div className="mx-auto flex max-w-md items-center justify-center gap-4">

              </div> */}
              </div>
            )}

            {/* Vocabulary Count Selection - When no vocab data */}
            {!vocabData && (
              <div className="mx-auto max-w-2xl text-center">
                <div className="rounded-2xl bg-white p-8 shadow-2xl md:p-12">
                  <div className="mb-8">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                      <span className="text-3xl">📚</span>
                    </div>
                    <h2 className="mx-auto mb-4 max-w-lg text-2xl font-bold text-gray-900 md:text-3xl">
                      Choose Your Review Size
                    </h2>
                    <p className="mx-auto mb-8 max-w-md text-gray-600">
                      Select how many vocabulary words you&apos;d like to review
                      in this session
                    </p>
                  </div>

                  {/* Vocabulary Count Options */}
                  <div className="mx-auto mb-8 grid max-w-lg grid-cols-2 gap-4">
                    {vocabOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelectedCount(option.value)}
                        className={`max-w-full cursor-pointer rounded-xl border-2 p-4 text-left transition-all duration-200 hover:shadow-md ${
                          selectedCount === option.value
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 bg-white hover:border-blue-300"
                        }`}
                      >
                        <div className="max-w-full">
                          <div className="mb-1 text-lg font-semibold text-gray-900">
                            {option.label}
                          </div>
                          <div className="max-w-full text-sm text-gray-600">
                            {option.description}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Start Button */}
                  <Button
                    onClick={handleStart}
                    className="mx-auto w-full max-w-xs cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Start Review Session
                  </Button>

                  {/* Selected count display */}
                  <p className="mt-4 max-w-full text-sm text-gray-500">
                    Selected:{" "}
                    {
                      vocabOptions.find((opt) => opt.value === selectedCount)
                        ?.label
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
