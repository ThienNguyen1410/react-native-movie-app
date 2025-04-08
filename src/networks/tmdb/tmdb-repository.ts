import { MovieResponse } from "../../models/tmdb/movie";
import { TMDB_BASE_URL } from "../../utils/constants";
import { getRequest } from "../Request";
import { TMDB_API_KEY } from '@env';

export class TmdbRepository {
    private readonly baseUrl = TMDB_BASE_URL;
    private readonly apiKey = TMDB_API_KEY;

    async getPopularMovies() {
        const url = `${this.baseUrl}/movie/popular`;
        const data = await getRequest<MovieResponse>(url, this.apiKey);
        return data;
    }

    async getUpcomingMovies() {
        const url = `${this.baseUrl}/movie/upcoming`;
        const data = await getRequest<MovieResponse>(url, this.apiKey);
        return data;
    }

    async getNowPlayingMovies() {
        const url = `${this.baseUrl}/movie/now_playing`;
        const data = await getRequest<MovieResponse>(url, this.apiKey);
        return data;
    }

    async searchMovies(query: string) {
        const url = `${this.baseUrl}/search/movie?query=${query}`;
        const data = await getRequest<MovieResponse>(url, this.apiKey);
        return data;
    }
}