"use client";

import queryVocab from "@/lib/queryVocab";
import countVocab from "@/lib/countVocab";
import randomQuery from "@/lib/randomQuery";
import addUser from "@/lib/addUser";
import playPronunce from "@/lib/playPronunce";

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
  const addUserHandler = async () => {
    const data = await addUser();
    console.log(data);
  };

  const playPronunceHandler = async () => {
    playPronunce("Fuck you");
  };
  return (
    <div className="flex h-full items-center justify-center gap-1">
      <div
        className="cursor-pointer border-2 border-black p-2"
        onClick={queryVocabHandler}
      >
        query
      </div>
      <div
        className="cursor-pointer border-2 border-black p-2"
        onClick={countVocabHandler}
      >
        Count
      </div>
      <div
        className="cursor-pointer border-2 border-black p-2"
        onClick={randomQueryHandler}
      >
        Random
      </div>
      <div
        className="cursor-pointer border-2 border-black p-2"
        onClick={addUserHandler}
      >
        Add new user
      </div>
      <div
        className="cursor-pointer border-2 border-black p-2"
        onClick={playPronunceHandler}
      >
        Play Pronunciation
      </div>
    </div>
  );
};

export default page;
