/**
 * Movie data interface representing a single movie from TMDB API
 */
export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * Date range interface
 */
export interface DateRange {
  maximum: string;
  minimum: string;
}

/**
 * Movie list response from TMDB API
 */
export interface MovieResponse {
  dates?: DateRange;  // Only included in some endpoints like now_playing
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
