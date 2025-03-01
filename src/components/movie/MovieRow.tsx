import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import type { Movie } from "../../types/movie";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";

interface MovieRowProps {
  title: string;
  movies: Movie[];
  onMovieClick?: (movieId: number) => void; // オプショナルに変更
}

export default function MovieRow({
  title,
  movies,
  onMovieClick,
}: MovieRowProps) {
  // 映画カードクリック時のハンドラー
  const handleMovieClick = (movieId: number) => {
    if (typeof onMovieClick === "function") {
      // onMovieClickが関数の場合は呼び出す
      onMovieClick(movieId);
    } else {
      // onMovieClickが関数でない場合は、デフォルトの動作として詳細ページに移動
      window.location.href = `/movie/${movieId}`;
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {movies.map(movie => (
            <CarouselItem
              key={movie.id}
              className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
            >
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={() => handleMovieClick(movie.id)}
              />{" "}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-black/50 text-white" />
        <CarouselNext className="bg-black/50 text-white" />
      </Carousel>
    </div>
  );
}
