import type { MovieDetail, MovieResponse } from "@/types/movie";
const API_URL = import.meta.env.PUBLIC_TMDB_API_URL;
const API_KEY = import.meta.env.PUBLIC_TMDB_API_KEY;
/**
 * TMDBのAPIエンドポイントにリクエストを送信する基本関数
 */
async function fetchFromTMDB<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  // API_URLが設定されているか確認
  if (!API_URL) {
    throw new Error("TMDB API URL not defined in environment variables");
  }

  // スラッシュの処理を確実に行う
  const baseUrl = API_URL.endsWith("/") ? API_URL : `${API_URL}/`;
  const path = endpoint.startsWith("/") ? endpoint.substring(1) : endpoint;

  const url = new URL(`${baseUrl}${path}`);

  // デフォルトパラメータの設定
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("language", "ja-JP");

  // 追加パラメータの設定
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`TMDB API request failed: ${response.status}`);
  }

  return await response.json();
}

/**
 * カテゴリー別の映画リストを取得
 */
export async function getMoviesByCategory(
  category: string,
  page = 1
): Promise<MovieResponse> {
  let endpoint = "";

  switch (category) {
    case "trending":
      endpoint = "/trending/movie/week";
      break;
    case "popular":
      endpoint = "/movie/popular";
      break;
    case "top_rated":
      endpoint = "/movie/top_rated";
      break;
    case "upcoming":
      endpoint = "/movie/upcoming";
      break;
    case "now_playing":
      endpoint = "/movie/now_playing";
      break;
    default:
      endpoint = "/movie/popular";
  }

  return fetchFromTMDB<MovieResponse>(endpoint, { page: page.toString() });
}

/**
 * 映画詳細情報を取得
 */
export async function getMovieDetails(movieId: number): Promise<MovieDetail> {
  return fetchFromTMDB<MovieDetail>(`/movie/${movieId}`, {
    append_to_response: "videos,credits,similar",
  });
}

/**
 * 映画検索
 */
export async function searchMovies(
  query: string,
  page = 1
): Promise<MovieResponse> {
  return fetchFromTMDB<MovieResponse>("/search/movie", {
    query,
    page: page.toString(),
  });
}

/**
 * ジャンルリストの取得
 */
export async function getGenres(): Promise<{
  genres: { id: number; name: string }[];
}> {
  return fetchFromTMDB<{ genres: { id: number; name: string }[] }>(
    "/genre/movie/list"
  );
}

/**
 * 画像URLの生成
 */
export function getImageUrl(
  path: string | null,
  size: string = "original"
): string | null {
  if (!path) return null;
  return `${import.meta.env.PUBLIC_TMDB_IMAGE_URL}/${size}${path}`;
}
