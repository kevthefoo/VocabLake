"use client";

import { useState, useEffect } from "react";
import countVocab from "@/lib/countVocab";

const Page = () => {
    const [vocabCount, setVocabCount] = useState(null);
    useEffect(() => {
        const fetchCount = async () => {
            const count = await countVocab();
            setVocabCount(count);
        };
        fetchCount();
    }, []);

    if (vocabCount === null) {
        return (
            <section className="flex justify-center items-center h-full">
                Loading...
            </section>
        );
    }

    return (
        <section className="flex justify-center items-center h-full">
            You have {vocabCount} Vocabs in your lake
        </section>
    );
};

export default Page;
