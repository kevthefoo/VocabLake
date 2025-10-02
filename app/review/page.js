"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import randomQuery from "@/lib/randomQuery";
import { ArrowBigLeft, ArrowBigRight, Volume2 } from "lucide-react";
import playPronunce from "@/lib/playPronunce";

const Page = () => {
  const [vocabData, setVocabData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStart = async () => {
    const data = await randomQuery();
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
            <div className="mx-auto w-full max-w-3xl">
              {/* Vocabulary Card */}
              <div className="mx-auto mb-8 max-w-2xl rounded-2xl bg-white p-6 shadow-2xl md:p-8 lg:p-12">
                {/* Header with term and pronunciation */}
                <div className="mx-auto mb-8 max-w-xl text-center">
                  <div className="mb-4 flex items-center justify-center gap-4">
                    <h2 className="max-w-lg text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
                      {vocabData[currentIndex].term}
                    </h2>
                    <button
                      onClick={playPronunceHandler}
                      className="max-w-fit rounded-full bg-blue-100 p-3 transition-colors duration-200 hover:bg-blue-200"
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

              {/* Navigation Buttons */}
              <div className="mx-auto flex max-w-md items-center justify-center gap-4">
                <Button
                  onClick={handlePreviousVocab}
                  disabled={currentIndex === 0}
                  className="max-w-32 flex-1 border-0 bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ArrowBigLeft className="mr-2 h-5 w-5" />
                  Previous
                </Button>

                <div className="max-w-20 rounded-lg bg-white px-4 py-2 text-center shadow-md">
                  <span className="text-sm font-semibold text-gray-600">
                    {currentIndex + 1}/{vocabData.length}
                  </span>
                </div>

                <Button
                  onClick={handleNextVocab}
                  disabled={currentIndex === vocabData.length - 1}
                  className="max-w-32 flex-1 bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                  <ArrowBigRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          )}

          {/* Start Button - When no vocab data */}
          {!vocabData && (
            <div className="mx-auto max-w-lg text-center">
              <div className="rounded-2xl bg-white p-8 shadow-2xl md:p-12">
                <div className="mb-6">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
                    <span className="text-3xl">📚</span>
                  </div>
                  <h2 className="mx-auto mb-4 max-w-sm text-2xl font-bold text-gray-900 md:text-3xl">
                    Ready to Review?
                  </h2>
                  <p className="mx-auto mb-8 max-w-xs text-gray-600">
                    Test your knowledge with 5 random vocabulary words from your
                    collection
                  </p>
                </div>

                <Button
                  onClick={handleStart}
                  className="mx-auto w-full max-w-xs rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700"
                >
                  Start Review Session
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-2xl bg-white/50 p-6 backdrop-blur-sm md:p-8">
            <h3 className="mx-auto mb-4 max-w-2xl text-center text-xl font-bold text-gray-900 md:text-2xl">
              💡 Review Tips
            </h3>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-3">
              <div className="mx-auto max-w-xs text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <span className="text-xl">🎯</span>
                </div>
                <p className="text-sm text-gray-600">
                  Focus on understanding the context of each example
                </p>
              </div>
              <div className="mx-auto max-w-xs text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                  <span className="text-xl">🔊</span>
                </div>
                <p className="text-sm text-gray-600">
                  Use the pronunciation feature to improve your speaking
                </p>
              </div>
              <div className="mx-auto max-w-xs text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <span className="text-xl">⚡</span>
                </div>
                <p className="text-sm text-gray-600">
                  Regular review sessions improve long-term retention
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
