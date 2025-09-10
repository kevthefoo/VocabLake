"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useUser, SignIn } from "@clerk/nextjs";
import { toast } from "sonner";
import { Star, Volume2 } from "lucide-react";
import supabase from "@/lib/supabaseClient";
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

        setVocabData({
            vocabulary: result.vocabulary,
            meaning: result.meaning,
            examples: result.example,
        });

        console.log({
            vocabulary: result.vocabulary,
            meaning: result.meaning,
            examples: result.example,
        });
    };

    const addVocabHandler = async () => {
        const term = vocabData.vocabulary;
        const meaning = vocabData.meaning;
        const examples = vocabData.examples;

        const response = await addVocab(user.id, term, meaning, examples);
        console.log(response);
    };

    const playPronunceHandler = async () => {
        const term = vocabData.vocabulary;
        playPronunce(term);
    };

    const handleOverlayClick = () => {};
    if (!isLoaded) {
        return (
            <div className="h-screen flex flex-col justify-center items-center">
                Loading...
            </div>
        );
    }

    const clerkUserId = user?.id;

    return (
        <section className="border-4 border-red-400 h-full flex flex-col justify-center items-center">
            {vocabData && (
                <div className="mb-8 p-4 bg-white rounded shadow max-w-md w-full">
                    <div className="mb-2 flex items-center justify-between ">
                        <div className="flex justify-center items-center gap-2">
                            <h2 className="text-lg font-semibold">
                                {vocabData.vocabulary}
                            </h2>

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
                    <ul className="flex flex-col gap-2 p-4">
                        {vocabData.examples.map((ex, index) => (
                            <li key={index} className="list-disc">
                                <p>{ex}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="w-36 space-y-4 ">
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
                        ? `w-full h-screen fixed flex justify-center items-center bg-gray-600 bg-opacity-85 z-10`
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
