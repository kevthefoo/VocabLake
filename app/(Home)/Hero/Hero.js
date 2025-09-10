"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useUser, SignIn } from "@clerk/nextjs";
import { toast } from "sonner";
import { Star, Volume2 } from "lucide-react";

import addVocab from "@/lib/addVocab";
import playPronunce from "@/lib/playPronunce";
const Hero = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [query, setQuery] = useState("");
  const [vocabData, setVocabData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ispopup, setIspopup] = useState(false);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const handleSearch = async () => {
    const response = await fetch(`/api/chatgpt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vocabulary: query }),
    });
    const data = await response.json();
    const result = data.result;
    console.log(result);
    setVocabData({
      vocabulary: result.vocabulary,
      descriptions: result.descriptions,
    });
  };

  const addVocabHandler = async () => {
    const user_id = user.id;
    const term = vocabData.vocabulary;
    const descriptions = vocabData.descriptions;

    const response = await addVocab(user_id, term, descriptions);
    console.log(response);
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
    <section className="flex h-full flex-col items-center justify-center border-4 border-red-400">
      {vocabData && (
        <div className="mb-8 w-full max-w-md rounded bg-white p-4 shadow">
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-lg font-semibold">{vocabData.vocabulary}</h2>

              <Volume2
                className="cursor-pointer"
                onClick={playPronunceHandler}
              />
            </div>

            <Star
              className="cursor-pointer"
              fill="yellow"
              onClick={addVocabHandler}
            />
          </div>

          <p className="mb-2">{vocabData.meaning}</p>
          <ul className="flex flex-col gap-8 p-4">
            {vocabData.descriptions.map((des, index) => (
              <li key={index} className="list-disc">
                <p className="font-semibold">{des.meaning}</p>
                <i>{des.example}</i>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="w-36 space-y-4">
        <Input
          type="text"
          placeholder="Enter a vocabulary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
        <Button
          onClick={handleSearch}
          disabled={isLoading}
          className="w-full cursor-pointer"
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
      <div
        className={
          ispopup
            ? `bg-opacity-85 fixed z-10 flex h-screen w-full items-center justify-center bg-gray-600`
            : `hidden`
        }
        onClick={handleOverlayClick}
      >
        <SignIn routing="hash" />
      </div>
    </section>
  );
};

export default Hero;
