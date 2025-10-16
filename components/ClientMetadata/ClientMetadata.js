"use client";

import { useEffect } from "react";

/**
 * Dynamic metadata component for client-side pages
 * Updates document title and meta tags when component mounts
 */
export default function ClientMetadata({
  title,
  description,
  keywords = [],
  noIndex = false,
}) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title.includes("VocabLake")
        ? title
        : `${title} | VocabLake`;
    }

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", description);
    }

    // Update meta keywords
    if (keywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute("content", keywords.join(", "));
    }

    // Update robots meta tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement("meta");
      metaRobots.setAttribute("name", "robots");
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute(
      "content",
      noIndex ? "noindex, follow" : "index, follow",
    );

    // Update Open Graph tags
    if (title) {
      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement("meta");
        ogTitle.setAttribute("property", "og:title");
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute("content", title);
    }

    if (description) {
      let ogDescription = document.querySelector(
        'meta[property="og:description"]',
      );
      if (!ogDescription) {
        ogDescription = document.createElement("meta");
        ogDescription.setAttribute("property", "og:description");
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute("content", description);
    }

    // Update Twitter Card tags
    if (title) {
      let twitterTitle = document.querySelector('meta[name="twitter:title"]');
      if (!twitterTitle) {
        twitterTitle = document.createElement("meta");
        twitterTitle.setAttribute("name", "twitter:title");
        document.head.appendChild(twitterTitle);
      }
      twitterTitle.setAttribute("content", title);
    }

    if (description) {
      let twitterDescription = document.querySelector(
        'meta[name="twitter:description"]',
      );
      if (!twitterDescription) {
        twitterDescription = document.createElement("meta");
        twitterDescription.setAttribute("name", "twitter:description");
        document.head.appendChild(twitterDescription);
      }
      twitterDescription.setAttribute("content", description);
    }
  }, [title, description, keywords, noIndex]);

  return null; // This component doesn't render anything
}
