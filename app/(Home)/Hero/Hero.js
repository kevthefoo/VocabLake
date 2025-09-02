"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useUser, SignIn } from "@clerk/nextjs";
import { toast } from "sonner";
import { Star } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const Hero = () => {
    const { user, isSignedIn, isLoaded } = useUser();
    const [query, setQuery] = useState("");
    const [vocabData, setVocabData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [ispopup, setIspopup] = useState(false);

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

    //     {
    //     "vocabulary": "price",
    //     "meaning": "the amount of money expected, required, or given in payment for something",
    //     "example": [
    //         "What is the price of this book?",
    //         "They raised the price of gasoline.",
    //         "We got a good price on our new car."
    //     ]
    // }

    const addVocab = async () => {
        const term = "Apple";
        const meaning = "A kind of frunit";
        const notes = "";
        const uid = "5f3b9c1c-2a8e-4c9a-9c37-3e16c22e4d61";

        const response = await supabase
            .from("words")
            .insert([{ user_id: uid, term, meaning, notes }])
            .select("id")
            .single();

        console.log(response.error);
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
                    <div className="mb-2 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            {vocabData.vocabulary}
                        </h2>
                        <Star
                            className="cursor-pointer"
                            fill="yellow"
                            onClick={addVocab}
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
                    className="w-full"
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
