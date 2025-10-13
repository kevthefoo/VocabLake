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
    console.log("hiii");
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
    <section className="flex h-full bg-gradient-to-b from-blue-100 to-blue-300">
      {/* Left Section - Stats and Chart */}
      <div className="flex w-1/2 flex-col gap-6 p-8">
        {/* Latest Vocabs Section */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-blue-700">Latest Vocabs</CardTitle>
            <CardDescription>
              Your 5 most recently added vocabulary words
            </CardDescription>
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
        <Card className="flex-1">
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
          {/* Lake Animation Container */}
          <div className="relative mb-8">
            {/* Lake Base */}
            <div
              className="relative h-60 w-96 overflow-hidden bg-blue-500 shadow-2xl"
              style={{ borderRadius: "50% 50% 45% 55% / 60% 65% 35% 40%" }}
            >
              {/* Water ripples animation */}
              <div className="absolute inset-0">
                <div
                  className="absolute h-full w-full animate-ping bg-blue-400 opacity-40"
                  style={{ borderRadius: "50% 50% 45% 55% / 60% 65% 35% 40%" }}
                ></div>
                <div
                  className="absolute top-4 left-8 h-3/4 w-3/4 animate-pulse bg-blue-300 opacity-30"
                  style={{ borderRadius: "45% 55% 50% 50% / 55% 60% 40% 45%" }}
                ></div>
                <div
                  className="absolute top-8 right-12 h-1/2 w-1/2 animate-bounce bg-blue-200 opacity-25"
                  style={{ borderRadius: "60% 40% 55% 45% / 50% 50% 50% 50%" }}
                ></div>
              </div>

              {/* Swimming Fish */}
              {/* Fish 1 - Large orange fish swimming left to right */}
              <div className="absolute top-16 left-0 h-8 w-12 animate-pulse">
                <div
                  className="animate-swim-right h-full w-full bg-orange-400 shadow-lg"
                  style={{
                    borderRadius: "0 70% 70% 0 / 0 50% 50% 0",
                    animationDuration: "8s",
                    animationIterationCount: "infinite",
                  }}
                >
                  {/* Fish tail */}
                  <div
                    className="absolute top-1/2 -left-2 h-4 w-6 -translate-y-1/2 transform bg-orange-300"
                    style={{ borderRadius: "50% 0 0 50% / 60% 0 0 60%" }}
                  ></div>
                  {/* Fish eye */}
                  <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-white">
                    <div className="absolute top-0.5 right-0.5 h-1 w-1 rounded-full bg-black"></div>
                  </div>
                </div>
              </div>

              {/* Fish 2 - Small blue fish swimming right to left */}
              <div className="absolute top-32 right-0 h-6 w-8">
                <div
                  className="animate-swim-left h-full w-full bg-blue-300 shadow-md"
                  style={{
                    borderRadius: "70% 0 0 70% / 50% 0 0 50%",
                    animationDuration: "6s",
                    animationIterationCount: "infinite",
                  }}
                >
                  {/* Fish tail */}
                  <div
                    className="absolute top-1/2 -right-1 h-3 w-4 -translate-y-1/2 transform bg-blue-200"
                    style={{ borderRadius: "0 50% 50% 0 / 0 60% 60% 0" }}
                  ></div>
                  {/* Fish eye */}
                  <div className="absolute top-1 left-1 h-1.5 w-1.5 rounded-full bg-white">
                    <div className="absolute top-0 left-0 h-1 w-1 rounded-full bg-black"></div>
                  </div>
                </div>
              </div>

              {/* Fish 3 - Medium green fish swimming in circle */}
              <div className="absolute top-20 left-20 h-7 w-10">
                <div
                  className="animate-swim-circle h-full w-full bg-green-400 shadow-lg"
                  style={{
                    borderRadius: "0 60% 60% 0 / 0 50% 50% 0",
                    animationDuration: "10s",
                    animationIterationCount: "infinite",
                  }}
                >
                  {/* Fish tail */}
                  <div
                    className="absolute top-1/2 -left-1.5 h-4 w-5 -translate-y-1/2 transform bg-green-300"
                    style={{ borderRadius: "50% 0 0 50% / 60% 0 0 60%" }}
                  ></div>
                  {/* Fish eye */}
                  <div className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-white">
                    <div className="absolute top-0.5 right-0.5 h-1 w-1 rounded-full bg-black"></div>
                  </div>
                </div>
              </div>

              {/* Fish 4 - Tiny yellow fish */}
              <div className="absolute top-8 left-32 h-4 w-6">
                <div
                  className="animate-bob h-full w-full bg-yellow-400 shadow-md"
                  style={{
                    borderRadius: "0 70% 70% 0 / 0 50% 50% 0",
                    animationDuration: "4s",
                    animationIterationCount: "infinite",
                  }}
                >
                  {/* Fish tail */}
                  <div
                    className="absolute top-1/2 -left-1 h-2 w-3 -translate-y-1/2 transform bg-yellow-300"
                    style={{ borderRadius: "50% 0 0 50% / 60% 0 0 60%" }}
                  ></div>
                  {/* Fish eye */}
                  <div className="absolute top-1 right-1 h-1 w-1 rounded-full bg-white">
                    <div className="absolute top-0 right-0 h-0.5 w-0.5 rounded-full bg-black"></div>
                  </div>
                </div>
              </div>

              {/* Bubbles */}
              <div className="animate-float absolute bottom-4 left-8 h-2 w-2 rounded-full bg-white opacity-60"></div>
              <div className="animate-float-delayed absolute right-12 bottom-8 h-1.5 w-1.5 rounded-full bg-white opacity-50"></div>
              <div className="animate-float absolute bottom-6 left-24 h-1 w-1 rounded-full bg-white opacity-70"></div>
            </div>

            {/* Decorative elements around lake */}
            <div className="absolute -top-4 -left-4 h-6 w-6 animate-pulse rounded-full bg-yellow-300 shadow-lg"></div>
            <div className="absolute -top-2 -right-6 h-4 w-4 animate-ping rounded-full bg-yellow-400 shadow-md"></div>
            <div className="absolute -bottom-4 left-12 h-3 w-3 animate-bounce rounded-full bg-yellow-200 shadow-sm"></div>
            <div className="absolute -right-4 -bottom-2 h-5 w-5 animate-pulse rounded-full bg-yellow-300 shadow-md"></div>
            <div className="absolute top-8 -left-6 h-2 w-2 animate-ping rounded-full bg-yellow-100"></div>
            <div className="absolute top-32 -right-4 h-3 w-3 animate-bounce rounded-full bg-yellow-200"></div>
          </div>

          {/* Custom CSS for fish animations */}
          <style jsx>{`
            @keyframes swim-right {
              0% {
                transform: translateX(-20px);
              }
              100% {
                transform: translateX(400px);
              }
            }
            @keyframes swim-left {
              0% {
                transform: translateX(20px) scaleX(-1);
              }
              100% {
                transform: translateX(-350px) scaleX(-1);
              }
            }
            @keyframes swim-circle {
              0% {
                transform: translateX(0) translateY(0) rotate(0deg);
              }
              25% {
                transform: translateX(60px) translateY(-20px) rotate(90deg);
              }
              50% {
                transform: translateX(80px) translateY(40px) rotate(180deg);
              }
              75% {
                transform: translateX(20px) translateY(60px) rotate(270deg);
              }
              100% {
                transform: translateX(0) translateY(0) rotate(360deg);
              }
            }
            @keyframes bob {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-10px);
              }
            }
            @keyframes float {
              0% {
                transform: translateY(0) scale(1);
                opacity: 0.6;
              }
              50% {
                transform: translateY(-30px) scale(1.2);
                opacity: 0.8;
              }
              100% {
                transform: translateY(-60px) scale(0.8);
                opacity: 0;
              }
            }
            @keyframes float-delayed {
              0% {
                transform: translateY(0) scale(1);
                opacity: 0.5;
              }
              50% {
                transform: translateY(-25px) scale(1.1);
                opacity: 0.7;
              }
              100% {
                transform: translateY(-50px) scale(0.9);
                opacity: 0;
              }
            }
            .animate-swim-right {
              animation: swim-right 8s linear infinite;
            }
            .animate-swim-left {
              animation: swim-left 6s linear infinite;
            }
            .animate-swim-circle {
              animation: swim-circle 10s ease-in-out infinite;
            }
            .animate-bob {
              animation: bob 4s ease-in-out infinite;
            }
            .animate-float {
              animation: float 3s ease-in-out infinite;
            }
            .animate-float-delayed {
              animation: float-delayed 3s ease-in-out infinite 1.5s;
            }
          `}</style>

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
