import React from "react";
import { Card, CardContent } from "../ui/card";
import type { Movie } from "../../types/movie";
import { getImageUrl } from "../../lib/api/tmdb";

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const posterUrl = getImageUrl(movie.poster_path, "w500");

  return (
    <Card
      className="rounded overflow-hidden bg-transparent border-0 transition-transform duration-300 hover:scale-105 cursor-pointer card"
      data-movie-id={movie.id}
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="aspect-[2/3] relative">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="object-cover w-full h-full rounded"
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center rounded">
              <span className="text-gray-400 text-sm text-center p-2">
                {movie.title}
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white text-sm font-medium truncate">
              {movie.title}
            </h3>
            {movie.release_date && (
              <p className="text-gray-300 text-xs">
                {new Date(movie.release_date).getFullYear()}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
