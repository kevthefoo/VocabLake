"use client";

import queryVocab from "@/lib/queryVocab";
import countVocab from "@/lib/countVocab";
import randomQuery from "@/lib/randomQuery";

import React from "react";

const page = () => {
    const queryVocabHandler = async () => {
        const data = await queryVocab();
        console.log(data);
    };

    const countVocabHandler = async () => {
        const count = await countVocab();
        console.log(count);
    };
    const randomQueryHandler = async () => {
        const data = await randomQuery();
        console.log(data);
    };
    return (
        <div className="flex h-full justify-center items-center border-4 border-red-400 gap-1">
            <div
                className="cursor-pointer p-2 border-2 border-black"
                onClick={queryVocabHandler}
            >
                query
            </div>
            <div
                className="cursor-pointer p-2 border-2 border-black"
                onClick={countVocabHandler}
            >
                Count
            </div>
            <div
                className="cursor-pointer p-2 border-2 border-black"
                onClick={randomQueryHandler}
            >
                Random
            </div>
        </div>
    );
};

export default page;
