"use client";

import { useState } from "react";
import { useUser, SignIn, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Volume2 } from "lucide-react";
import { toast } from "sonner";

import addVocab from "@/lib/addVocab";
import playPronunce from "@/lib/playPronunce";
import { validateVocabularyInput } from "@/lib/inputValidator";

const Hero = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [query, setQuery] = useState("");
  const [vocabData, setVocabData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ispopup, setIspopup] = useState(false);
  const [inputError, setInputError] = useState("");

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleSearch = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in to search for vocabulary");
      return;
    }

    // Validate input before processing
    const validation = validateVocabularyInput(query);

    if (!validation.isValid) {
      const errorMessage = validation.errors.join(". ");
      toast.error(`Invalid input: ${errorMessage}`);

      // Show suggestion if available
      if (validation.suggestions.length > 0) {
        setTimeout(() => {
          toast.info(validation.suggestions[0]);
        }, 1000);
      }
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/chatgpt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vocabulary: validation.cleanedInput || query }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch vocabulary data");
      }

      const data = await response.json();
      const result = data.result;

      console.log(result);
      setVocabData({
        vocabulary: result.vocabulary,
        descriptions: result.descriptions,
      });
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Failed to search vocabulary. Please try again.");
    } finally {
      setQuery("");
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Real-time validation feedback
    if (value.trim()) {
      const validation = validateVocabularyInput(value);
      if (!validation.isValid) {
        setInputError(validation.errors[0] || "Invalid input");
      } else {
        setInputError("");
      }
    } else {
      setInputError("");
    }
  };

  const addVocabHandler = async () => {
    const user_id = user.id;
    const term = vocabData.vocabulary;
    const descriptions = vocabData.descriptions;

    await addVocab(user_id, term, descriptions);
  };

  const playPronunceHandler = async () => {
    const term = vocabData.vocabulary;
    playPronunce(term);
  };

  const handleOverlayClick = () => {};
  if (!isLoaded) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Hero Header */}

        {!vocabData && (
          <div className="mx-auto mb-12 max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
              Discover New{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Vocabulary
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 md:text-xl">
              Expand your vocabulary with AI-powered definitions, examples, and
              pronunciation guides
            </p>
          </div>
        )}

        {/* Main Content Container */}
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center">
          {/* Search Section */}
          {vocabData && (
            <div className="mx-auto mb-4 w-full max-w-3xl">
              <div className="mx-auto rounded-xl border border-gray-200 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex-1">
                    <Input
                      type="text"
                      placeholder="Search another word..."
                      value={query}
                      onChange={handleInputChange}
                      className={`w-full rounded-lg border px-3 py-2 text-base transition-colors duration-200 focus:ring-blue-500 ${
                        inputError
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-300 focus:border-blue-500"
                      }`}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    {inputError && (
                      <p className="mt-1 text-sm text-red-600">{inputError}</p>
                    )}
                  </div>

                  {isSignedIn ? (
                    <Button
                      onClick={handleSearch}
                      disabled={isLoading || !query.trim()}
                      className="cursor-pointer rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-base font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                          Searching...
                        </div>
                      ) : (
                        "🔍 Search"
                      )}
                    </Button>
                  ) : (
                    <SignInButton mode="modal">
                      <Button className="cursor-pointer rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-base font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700">
                        🔍 Sign In
                      </Button>
                    </SignInButton>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Vocabulary Result Card */}
          {vocabData && (
            <div className="mx-auto mb-12 w-full max-w-3xl">
              <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-2xl md:p-8 lg:p-10">
                {/* Header with word and actions */}
                <div className="mb-6 flex max-w-full flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex max-w-lg flex-1 items-center gap-3">
                    <h2 className="max-w-sm text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
                      {vocabData.vocabulary}
                    </h2>
                    <button
                      onClick={playPronunceHandler}
                      className="max-w-fit flex-shrink-0 cursor-pointer rounded-full bg-blue-100 p-2 transition-colors duration-200 hover:bg-blue-200"
                      aria-label="Play pronunciation"
                    >
                      <Volume2 className="h-5 w-5 text-blue-600" />
                    </button>
                  </div>

                  <button
                    onClick={addVocabHandler}
                    className="flex max-w-fit cursor-pointer items-center gap-2 rounded-lg bg-yellow-100 px-4 py-2 transition-colors duration-200 hover:bg-yellow-200"
                    aria-label="Add to favorites"
                  >
                    <Star
                      className="h-5 w-5 text-yellow-600"
                      fill="currentColor"
                    />
                    <span className="text-sm font-medium text-yellow-700">
                      Add to Lake
                    </span>
                  </button>
                </div>

                {/* Definitions */}
                <div className="max-w-full space-y-6">
                  {vocabData.descriptions.map((des, index) => (
                    <div
                      key={index}
                      className="max-w-full border-l-4 border-blue-500 pl-6"
                    >
                      <p className="mb-3 max-w-prose text-lg font-semibold text-gray-800 md:text-xl">
                        {des.meaning}
                      </p>
                      <p className="max-w-prose text-base leading-relaxed text-gray-600 italic md:text-lg">
                        &ldquo;{des.example}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Search Section - Initial Load (No Vocab Data) */}
          {!vocabData && (
            <div className="mx-auto w-full max-w-xl">
              <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 shadow-xl md:p-8">
                <div className="space-y-6">
                  <div className="max-w-full">
                    <label
                      htmlFor="vocabulary-input"
                      className="mb-2 block max-w-xs text-sm font-medium text-gray-700"
                    >
                      Enter a word to explore
                    </label>
                    <Input
                      id="vocabulary-input"
                      type="text"
                      placeholder="e.g., serendipity, ephemeral..."
                      value={query}
                      onChange={handleInputChange}
                      className={`w-full max-w-full rounded-xl border-2 px-4 py-3 text-lg transition-colors duration-200 focus:ring-blue-500 ${
                        inputError
                          ? "border-red-500 focus:border-red-500"
                          : "border-gray-200 focus:border-blue-500"
                      }`}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    {inputError && (
                      <p className="mt-2 max-w-full text-sm text-red-600">
                        {inputError}
                      </p>
                    )}
                  </div>

                  {isSignedIn ? (
                    <Button
                      onClick={handleSearch}
                      disabled={isLoading || !query.trim()}
                      className="cursor-pointer w-full max-w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                          Searching...
                        </div>
                      ) : (
                        "🔍 Explore Word"
                      )}
                    </Button>
                  ) : (
                    <SignInButton mode="modal">
                      <Button className="w-full max-w-full cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700">
                        🔍 Sign In to Explore
                      </Button>
                    </SignInButton>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sign In Modal Overlay */}
      <div
        className={
          ispopup
            ? `fixed inset-0 z-50 flex max-h-full max-w-full items-center justify-center bg-black/50 backdrop-blur-sm`
            : `hidden`
        }
        onClick={handleOverlayClick}
      >
        <div className="max-h-screen max-w-md overflow-auto">
          <SignIn routing="hash" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
