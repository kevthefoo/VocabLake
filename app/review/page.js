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
    <section className="flex h-full flex-col items-center justify-center">
      <div>
        {vocabData && vocabData[currentIndex] && (
          <div className="mb-8 w-full max-w-md rounded bg-white p-4 shadow">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-lg font-semibold">
                  {vocabData[currentIndex].term}
                </h2>

                <Volume2
                  className="cursor-pointer"
                  onClick={playPronunceHandler}
                />
              </div>
            </div>

            <ul className="flex flex-col gap-8 p-4">
              {vocabData[currentIndex].descriptions.map((des, index) => (
                <li key={index} className="list-disc">
                  <p className="font-semibold">{des.meaning}</p>
                  <i>{des.example}</i>
                </li>
              ))}
            </ul>
          </div>
        )}
        {vocabData ? (
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={handlePreviousVocab}
              disabled={currentIndex === 0}
              className="cursor-pointer"
            >
              <ArrowBigLeft />
            </Button>
            <Button
              onClick={handleNextVocab}
              disabled={currentIndex === vocabData.length - 1}
              className="cursor-pointer"
            >
              <ArrowBigRight />
            </Button>
          </div>
        ) : (
          <Button
            onClick={handleStart}
            disabled={false}
            className="w-full cursor-pointer"
          >
            Start
          </Button>
        )}
      </div>
    </section>
  );
};

export default Page;
