"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ExternalLink } from "lucide-react";

const ImageGallery = ({ searchTerm, vocabData }) => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchTerm && vocabData) {
      fetchImages(searchTerm);
    }
  }, [searchTerm, vocabData]);

  const fetchImages = async (query) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const data = await response.json();
      setImages(data.images || []);
    } catch (error) {
      console.error("Image fetch error:", error);
      setError("Unable to load images");
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!vocabData) return null;
  console.log(images[0])
  return (
    <div className="mx-auto mt-8 w-full max-w-4xl">
      <div className="rounded-2xl bg-white p-6 shadow-xl md:p-8">
        <div className="mb-6">
          <h3 className="mb-2 text-xl font-bold text-gray-900 md:text-2xl">
            Visual Examples
          </h3>
          <p className="max-w-2xl text-gray-600">
            Images related to &quot;{searchTerm}&quot; from Google Search
          </p>
        </div>

        {isLoading && (
          <div className="flex h-32 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
            <span className="ml-3 text-gray-600">Loading images...</span>
          </div>
        )}

        {error && (
          <div className="flex h-32 items-center justify-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!isLoading && !error && images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="group cursor-pointer overflow-hidden rounded-lg border-2 border-gray-200 transition-all duration-200 hover:border-blue-500 hover:shadow-lg"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-square max-w-full">
                  <Image
                    src={image.thumbnail}
                    alt={image.title || searchTerm}
                    fill
                    className="object-cover transition-transform duration-200 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && images.length === 0 && (
          <div className="flex h-32 items-center justify-center">
            <p className="text-gray-500">
              No images found for &quot;{searchTerm}&quot;
            </p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-white">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/90 p-2 transition-colors hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative max-h-[80vh] max-w-full">
              <Image
                src={selectedImage.url}
                alt={selectedImage.title || searchTerm}
                width={selectedImage.width || 800}
                height={selectedImage.height || 600}
                className="max-h-full max-w-full object-contain"
                onError={() => setSelectedImage(null)}
              />
            </div>

            <div className="p-4">
              <p className="mb-2 max-w-full text-sm font-medium text-gray-900">
                {selectedImage.title}
              </p>
              {selectedImage.contextLink && (
                <a
                  href={selectedImage.contextLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  View source <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
