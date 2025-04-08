import React from 'react';
import { VirtualizedList, Text, View, StyleSheet } from 'react-native';
import { MovieCard } from './card/movie-card';
import { Movie } from '../models/tmdb/movie';
import { TmdbRepository } from '../networks/tmdb/tmdb-repository';
import { SORT_BY_ALPHABETICAL_ORDER, SORT_BY_RATING, SORT_BY_RELEASE_DATE, TMDB_BASE_URL, TMDB_IMAGE_PATH } from '../utils/constants';

interface MovieListProps {
  movies?: Movie[];
  sortFilter: string;
  searchQuery: string;
}

export const MovieList: React.FC<MovieListProps> = ({ 
  movies = [], 
  sortFilter,
  searchQuery 
}) => {
  const getSortedAndFilteredMovies = (): Movie[] => {
    // First filter movies based on search query
    const filteredMovies = searchQuery
      ? movies.filter(movie => 
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.overview.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : movies;

    // Then sort the filtered movies
    const moviesToSort = [...filteredMovies];
    
    switch (sortFilter) {
      case SORT_BY_ALPHABETICAL_ORDER:
        return moviesToSort.sort((a, b) => a.title.localeCompare(b.title));
      case SORT_BY_RATING:
        return moviesToSort.sort((a, b) => b.vote_average - a.vote_average);
      case SORT_BY_RELEASE_DATE:
        return moviesToSort.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
      default:
        return moviesToSort;
    }
  };

  const filteredAndSortedMovies = getSortedAndFilteredMovies();

  if (searchQuery && filteredAndSortedMovies.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No movies found for "{searchQuery}"</Text>
      </View>
    );
  }

  return (
    <VirtualizedList
      style={{ flex: 1 }}
      data={filteredAndSortedMovies}
      initialNumToRender={10}
      renderItem={({ item }: { item: Movie }) => (
        <MovieCard
          key={item.id}
          movie={item}
          imageUri={`${TMDB_IMAGE_PATH}${item.poster_path}`}
        />
      )}
      keyExtractor={(item: Movie) => item.id.toString()}
      getItemCount={(data) => data.length}
      getItem={(data, index) => data[index]}
      maxToRenderPerBatch={10}
      windowSize={5}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});