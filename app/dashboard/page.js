"use client";

import { useState, useEffect } from "react";
import countVocab from "@/lib/countVocab";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const Page = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  const [vocabCount, setVocabCount] = useState(null);
  const [latestVocabs, setLatestVocabs] = useState([]);

  // Mock chart data
  const chartData = [
    { month: "Jan", vocabs: 12 },
    { month: "Feb", vocabs: 19 },
    { month: "Mar", vocabs: 15 },
    { month: "Apr", vocabs: 25 },
    { month: "May", vocabs: 22 },
    { month: "Jun", vocabs: 30 },
  ];

  const chartConfig = {
    vocabs: {
      label: "Vocabs Added",
      color: "var(--color-blue-500)",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      // Only fetch if user is loaded AND signed in
      if (!isLoaded) {
        return;
      }

      // Only fetch if user is loaded AND signed in
      if (!isSignedIn || !user) {
        redirect("/");
      }

      const count = await countVocab();
      setVocabCount(count);

      // Mock data for latest vocabs
      setLatestVocabs([
        { term: "Serendipity", created_at: "2024-09-24" },
        { term: "Ephemeral", created_at: "2024-09-23" },
        { term: "Ubiquitous", created_at: "2024-09-22" },
        { term: "Quintessential", created_at: "2024-09-21" },
        { term: "Mellifluous", created_at: "2024-09-20" },
      ]);
    };
    fetchData();
  }, [user, isSignedIn, isLoaded]);

  if (vocabCount === null) {
    return (
      <section className="flex h-full items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </section>
    );
  }

  return (
    <section className="flex h-full border-4 border-red-500 bg-gradient-to-b from-blue-100 to-blue-300">
      {/* Left Section - Stats and Chart */}
      <div className="flex w-1/2 flex-col gap-6 overflow-y-hidden border-2 border-red-500 p-8">
        {/* Latest Vocabs Section */}
        <Card className=" ">
          <CardHeader>
            <CardTitle className="text-blue-700">Latest Vocabs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {latestVocabs.map((vocab, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-blue-50 p-3"
                >
                  <span className="font-medium text-blue-800">
                    {vocab.term}
                  </span>
                  <span className="text-sm text-blue-600">
                    {vocab.created_at}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chart Section */}
        <Card className=" ">
          <CardHeader>
            <CardTitle className="text-blue-700">Monthly Progress</CardTitle>
            <CardDescription>Number of vocabs added each month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                  dataKey="vocabs"
                  type="natural"
                  fill="hsl(var(--color-blue-500))"
                  fillOpacity={0.4}
                  stroke="hsl(var(--color-blue-500))"
                />
              </AreaChart>
            </ChartContainer>
            <div className="mt-4 flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium">
                  Trending up by 150% this month
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Section - Lake Animation */}
      <div className="flex w-1/2 items-center justify-center p-8">
        <div className="flex flex-col items-center">
          {/* Vocab Count Display */}
          <div className="text-center">
            <div className="mb-2 text-5xl font-bold text-blue-800">
              {vocabCount}
            </div>
            <div className="text-xl font-medium text-blue-700">
              Vocabs in your lake
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
