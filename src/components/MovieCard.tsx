import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Movie } from '../models/tmdb/movie';
import { useWatchlist } from '../contexts/watch-list-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { TMDB_IMAGE_PATH } from '../utils/constants';

interface MovieCardProps {
  movie: Movie;
  onPress?: () => void;
  style?: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress, style }) => {
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const isWatchlisted = isInWatchlist(movie.id);

  const handleWatchlistPress = async () => {
    if (isWatchlisted) {
      await removeFromWatchlist(movie.id);
    } else {
      await addToWatchlist(movie);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{
          uri: movie.poster_path
            ? `${TMDB_IMAGE_PATH}${movie.poster_path}`
            : 'https://via.placeholder.com/300x450?text=No+Poster',
        }}
        style={styles.poster}
      />
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.watchlistButton}
          onPress={handleWatchlistPress}
        >
          <Icon
            name={isWatchlisted ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          <Text style={styles.rating}>
            ★ {movie.vote_average.toFixed(1)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.6,
    marginHorizontal: 8,
    marginVertical: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1F2937',
  },
  poster: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'space-between',
  },
  watchlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
    zIndex: 1,
  },
  info: {
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  rating: {
    color: '#FCD34D',
    fontSize: 12,
  },
});

export default MovieCard; 