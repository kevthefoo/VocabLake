import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { query } = body;

  if (!query || typeof query !== "string" || query.trim().length === 0) {
    return NextResponse.json(
      { error: "Please provide a valid search query" },
      { status: 400 },
    );
  }

  try {
    // Google Custom Search API
    const apiKey = process.env.GOOGLE_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

    if (!apiKey || !searchEngineId) {
      console.error("Missing Google API credentials");
      return NextResponse.json(
        { error: "Image search service unavailable" },
        { status: 503 },
      );
    }

    console.log(`Searching images for: ${query}`);
    console.log(`Using Search Engine ID: ${searchEngineId.substring(0, 10)}...`);

    const searchUrl = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&searchType=image&num=6&safe=active&imgType=photo`;

    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      // Get detailed error information
      const errorData = await response.json().catch(() => null);
      
      console.error(`Google API Error Details:`, {
        status: response.status,
        statusText: response.statusText,
        errorData: errorData
      });

      // Handle specific error codes
      if (response.status === 403) {
        if (errorData?.error?.message?.includes('API key')) {
          return NextResponse.json(
            { error: "Invalid API key. Please check your Google API key configuration." },
            { status: 403 }
          );
        } else if (errorData?.error?.message?.includes('quota')) {
          return NextResponse.json(
            { error: "API quota exceeded. Please try again later." },
            { status: 429 }
          );
        } else {
          return NextResponse.json(
            { error: `Access denied: ${errorData?.error?.message || 'Please check API key and search engine configuration'}` },
            { status: 403 }
          );
        }
      }

      throw new Error(`Google API error: ${response.status} - ${errorData?.error?.message || response.statusText}`);
    }

    const data = await response.json();

    // Check if we got results
    if (!data.items || data.items.length === 0) {
      console.log(`No images found for query: ${query}`);
      return NextResponse.json({ images: [] }, { status: 200 });
    }

    // Extract and format image data
    const images = data.items.map((item) => ({
      url: item.link,
      thumbnail: item.image?.thumbnailLink || item.link,
      title: item.title,
      width: item.image?.width || 300,
      height: item.image?.height || 200,
      contextLink: item.image?.contextLink,
    }));

    console.log(`Found ${images.length} images for: ${query}`);
    return NextResponse.json({ images }, { status: 200 });

  } catch (error) {
    console.error("Image search error:", error);
    return NextResponse.json(
      { error: "Failed to fetch images", details: error.message },
      { status: 500 },
    );
  }
}