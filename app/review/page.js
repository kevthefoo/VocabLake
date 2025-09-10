"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import randomQuery from "@/lib/randomQuery";
import { Star, Volume2 } from "lucide-react";
import addVocab from "@/lib/addVocab";
import playPronunce from "@/lib/playPronunce";
const Page = () => {
    const [vocabData, setVocabData] = useState(null);
    const handleStart = async () => {
        const data = await randomQuery();
        setVocabData(data);
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
    return (
        <section className="border-4 border-red-400 h-full flex flex-col justify-center items-center">
            <div>
                {vocabData && (
                    <div className="mb-8 p-4 bg-white rounded shadow max-w-md w-full">
                        <div className="mb-2 flex items-center justify-between ">
                            <div className="flex justify-center items-center gap-2">
                                <h2 className="text-lg font-semibold">
                                    {vocabData[0].term}
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
                        <ul className="flex flex-col gap-8 p-4">
                            {vocabData[0].descriptions.map((des, index) => (
                                <li key={index} className="list-disc">
                                    <p className="font-semibold">
                                        {des.meaning}
                                    </p>
                                    <i>{des.example}</i>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <Button
                    onClick={handleStart}
                    disabled={false}
                    className="w-full cursor-pointer"
                >
                    Start
                </Button>
            </div>
        </section>
    );
};

export default Page;
