import { getImageUrl } from "@/lib/api/tmdb";
import type { Movie } from "@/types/movie";
import React from "react";
import { Button } from "../ui/button";
import { Info, Play } from "lucide-react";

interface HeroBannerProps {
  movie: Movie;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  const backdropUrl = getImageUrl(movie.backdrop_path, "original");

  return (
    <div className="relative h-[80vh] w-full">
      {/* 背景画像 */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backdropUrl})`,
        }}
      >
        {/* グラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      </div>

      {/* コンテンツ */}
      <div className="relative h-full flex flex-col justify-end pb-24 px-8 md:px-16 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-3">
          {movie.title}
        </h1>

        <p className="text-lg text-white max-w-2xl mb-8 line-clamp-3">
          {movie.overview}
        </p>

        <div className="flex space-x-4">
          <Button className="bg-white text-black hover:bg-white/90">
            <Play className="mr-2 h-4 w-4" />
            再生
          </Button>
          <Button
            variant="outline"
            className="bg-gray-500/40 text-white border-none hover:bg-gray-500/60"
          >
            <Info className="mr-2 h-4 w-4" />
            詳細情報
          </Button>
        </div>
      </div>
    </div>
  );
}
