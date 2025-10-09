"use client";

import React from "react";
import { Star, Volume2 } from "lucide-react";
import playPronunce from "@/lib/playPronunce";
import addVocab from "@/lib/addVocab";

const VocabCard = ({ vocabData, userData }) => {
  const addVocabHandler = async () => {
    const user_id = userData.id;
    const term = vocabData.vocabulary;
    const descriptions = vocabData.descriptions;

    await addVocab(user_id, term, descriptions);
  };

  const playPronunceHandler = async () => {
    const term = vocabData.vocabulary;
    playPronunce(term);
  };

  console.log(`vocab data is ${vocabData}`);
  return (
    <>
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
                <Star className="h-5 w-5 text-yellow-600" fill="currentColor" />
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
    </>
  );
};

export default VocabCard;
