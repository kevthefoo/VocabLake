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
      <section className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-lg font-medium text-blue-700">
            Loading your dashboard...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Welcome back,{" "}
            <span className="text-blue-600">
              {user?.firstName || "Learner"}
            </span>
            ! 👋
          </h1>
          <p className="mt-2 text-gray-600">
            Here&apos;s your vocabulary learning progress
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Large Card - Vocab Count (spans 2 columns) */}
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-xl transition-shadow duration-300 hover:shadow-2xl lg:col-span-2 lg:row-span-2">
            <CardContent className="flex flex-col items-center justify-center p-8 md:p-12">
              <div className="mb-4 text-7xl md:text-8xl">🌊</div>
              <div className="text-6xl font-bold md:text-7xl">{vocabCount}</div>
              <div className="mt-3 text-xl font-medium text-blue-100 md:text-2xl">
                Vocabs in your lake
              </div>
              {vocabCount === 0 && (
                <p className="mt-4 text-sm text-blue-200">
                  Start learning to populate your lake!
                </p>
              )}
              {vocabCount > 0 && (
                <div className="mt-6 flex gap-2">
                  {vocabCount > 0 && <span className="text-3xl">🐠</span>}
                  {vocabCount > 5 && <span className="text-3xl">🐟</span>}
                  {vocabCount > 10 && <span className="text-3xl">🦈</span>}
                  {vocabCount > 15 && <span className="text-3xl">🐡</span>}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats Card 1 */}
          <Card className="bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                📈 This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-gray-900">30</div>
              <p className="mt-2 text-sm text-gray-600">New words learned</p>
              <div className="mt-4 flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="font-medium">+150%</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card 2 */}
          <Card className="bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                🎯 Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-gray-900">7</div>
              <p className="mt-2 text-sm text-gray-600">Days in a row</p>
              <div className="mt-4 flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="h-2 w-2 rounded-full bg-green-500"
                  ></div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Latest Vocabs Card - Compact (now in first row) */}
          <Card className="bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-blue-700">
                📖 Latest Vocabs
              </CardTitle>
              <CardDescription className="text-xs">
                Recently added words
              </CardDescription>
            </CardHeader>
            <CardContent>
              {latestVocabs.length > 0 ? (
                <div className="space-y-2">
                  {latestVocabs.slice(0, 3).map((vocab, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2 transition-all duration-200 hover:shadow-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-xs font-bold text-white">
                          {index + 1}
                        </div>
                        <span className="text-sm font-semibold text-blue-900">
                          {vocab.term}
                        </span>
                      </div>
                      <span className="text-xs text-blue-600">
                        {vocab.created_at}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-4 text-center">
                  <div className="mb-2 text-3xl">📚</div>
                  <p className="text-sm text-gray-500">No vocabulary yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Chart Card (spans 2 columns on lg) */}
          <Card className="bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl lg:col-span-2 lg:row-span-2">
            <CardHeader>
              <CardTitle className="text-blue-700">Monthly Progress</CardTitle>
              <CardDescription>
                Number of vocabs added each month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="max-h-[300px]">
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
                    fill="hsl(217, 91%, 60%)"
                    fillOpacity={0.4}
                    stroke="hsl(217, 91%, 60%)"
                  />
                </AreaChart>
              </ChartContainer>
              <div className="mt-6 flex items-start gap-2 text-sm">
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

          {/* Quick Action Card */}
          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-white">🚀 Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <button className="w-full rounded-lg bg-white/20 px-4 py-2 text-left font-medium backdrop-blur-sm transition-all hover:bg-white/30">
                  Learn New Words
                </button>
                <button className="w-full rounded-lg bg-white/20 px-4 py-2 text-left font-medium backdrop-blur-sm transition-all hover:bg-white/30">
                  Review Practice
                </button>
                <button className="w-full rounded-lg bg-white/20 px-4 py-2 text-left font-medium backdrop-blur-sm transition-all hover:bg-white/30">
                  View All Vocabs
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Achievement/Motivation Card */}
          <Card className="bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="text-white">🏆 Achievement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="mb-3 text-5xl">🎉</div>
                <p className="text-lg font-semibold">Keep it up!</p>
                <p className="mt-2 text-sm text-white/80">
                  You&apos;re doing great this week
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Page;
