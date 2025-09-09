"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import randomQuery from "@/lib/randomQuery";

const Page = () => {
    const [vacabData, setVocabData] = useState(null);
    const handleStart = async () => {
        const data = await randomQuery();
        setVocabData(data);
    };
    return (
        <section className="flex justify-center items-center h-full">
            <div className="w-36 space-y-4 ">
                <div>{vacabData ? vacabData[0].term : ""}</div>
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
