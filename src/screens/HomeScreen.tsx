import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView
} from 'react-native';
import { DropSearch } from '../components/drop-search';
import { TmdbRepository } from '../networks/tmdb/tmdb-repository';
import { Movie } from '../models/tmdb/movie';
import { MovieList } from '../components/MovieList';
import { NOW_PLAYING, POPULAR, SORT_BY_ALPHABETICAL_ORDER, UPCOMING } from '../utils/constants';

const HomeScreen = () => {
    const tmdbRepository = new TmdbRepository();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [movieFilter, setMovieFilter] = useState(NOW_PLAYING);
    const [sortFilter, setSortFilter] = useState(SORT_BY_ALPHABETICAL_ORDER);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            if(movieFilter === NOW_PLAYING) {
                const movies = await tmdbRepository.getNowPlayingMovies();
                setMovies(movies.results);
            } else if(movieFilter === UPCOMING) {
                const movies = await tmdbRepository.getUpcomingMovies();
                setMovies(movies.results);
            } else if(movieFilter === POPULAR) {
                const movies = await tmdbRepository.getPopularMovies();
                setMovies(movies.results);
            }
        };
        fetchMovies();

        return () => {
            setSearchQuery('');
        };
    }, [movieFilter]);

    const handleMovieFilterChange = (filter: string) => {
        setMovieFilter(filter);
        setSearchQuery('');
    };

    const handleSortFilterChange = (filter: string) => {
        setSortFilter(filter);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/icons/logo.png')}/>
            </View>
            <DropSearch 
                onMovieFilterChange={handleMovieFilterChange}
                onSortFilterChange={handleSortFilterChange}
                onSearch={handleSearch}
                searchQuery={searchQuery}
            />
            <MovieList 
                movies={movies} 
                sortFilter={sortFilter}
                searchQuery={searchQuery}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#01b4e4',
  },
  movieList: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen; 