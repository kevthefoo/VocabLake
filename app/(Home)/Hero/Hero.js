"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useUser, SignIn } from "@clerk/nextjs";
import { toast } from "sonner";
import { Star } from "lucide-react";

const Hero = () => {
    const { user, isSignedIn, isLoaded } = useUser();
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [ispopup, setIspopup] = useState(false);

    const handleSearch = () => {};
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
            {/* {result && (
                <div className="mb-8 p-4 bg-white rounded shadow max-w-md w-full">
                    <div className="mb-2 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            {result.vocabulary}
                        </h2>
                        <Star
                            className="cursor-pointer"
                            fill="yellow"
                            onClick={addVocab}
                        />
                    </div>

                    <p className="mb-2">{result.meaning}</p>
                    <ul className="flex flex-col gap-2 p-4">
                        display some result
                    </ul>
                </div>
            )} */}
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
