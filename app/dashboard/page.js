"use client";

import React from "react";
import { useState, useEffect } from "react";
import countVocab from "@/lib/countVocab";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator"
const Page = () => {
  const tags = ["g", "dd", "jok"]
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
      <section className="flex h-full items-center justify-center">
        Loading...
      </section>
    );
  }

  return (
    <section className="flex h-full items-center justify-center">
      <p> You have {vocabCount} Vocabs in your lake</p>
      <ScrollArea className="h-72 w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
          {tags.map((tag) => (
            <React.Fragment key={tag}>
              <div className="text-sm">{tag}</div>
              <Separator className="my-2" />
            </React.Fragment>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default Page;
