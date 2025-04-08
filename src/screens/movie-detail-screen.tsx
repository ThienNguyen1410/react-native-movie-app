import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TMDB_IMAGE_PATH } from '../utils/constants';
import { } from '../models/tmdb/movie';
import { TmdbRepository } from '../networks/tmdb/tmdb-repository';
import { CastCard } from '../components/card/cast-card';
import { MovieDetail } from '../models/tmdb/movie-details';
import { MovieCredits } from '../models/tmdb/movie-credits';
import { BookmarkIcon, HomeIcon } from '../components/icons/icons';
import { useWatchlist } from '../contexts/watch-list-context';

interface DetailScreenProps {
  route: {
    params: {
      movie_id: number;
    };
  };
}

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { movie_id } = route.params;
  const [detail, setDetail] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();

  const navigation = useNavigation();
  const tmdbRepository = new TmdbRepository();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-SG', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const handleWatchlistPress = async () => {
    if (!detail) return;
    
    const movie = {
      id: detail.id,
      title: detail.title,
      overview: detail.overview,
      poster_path: detail.poster_path,
      backdrop_path: detail.backdrop_path,
      vote_average: detail.vote_average,
      release_date: detail.release_date,
      adult: detail.adult,
      genre_ids: detail.genres.map(genre => genre.id),
      original_language: detail.original_language,
      original_title: detail.original_title,
      popularity: detail.popularity,
      video: false,
      vote_count: detail.vote_count
    };

    if (isInWatchlist(movie.id)) {
      await removeFromWatchlist(movie.id);
    } else {
      await addToWatchlist(movie);
    }
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      const [movieDetails, movieCredits] = await Promise.all([
        tmdbRepository.getMovieDetails(movie_id),
        tmdbRepository.getMovieCredits(movie_id)
      ]);
      setDetail(movieDetails);
      setCredits(movieCredits);
    };
    fetchMovieData();
  }, [movie_id]);

  if (!detail) {
    return <Text>Loading...</Text>;
  }

  const isMovieInWatchlist = isInWatchlist(movie_id);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {detail.title} ({new Date(detail.release_date).getFullYear()})
          </Text>
        </View>

        {/* Movie Info Section */}
        <View style={styles.movieInfoSection}>
          <Image
            source={{ uri: `${TMDB_IMAGE_PATH}${detail.poster_path}` }}
            style={styles.poster}
            resizeMode='cover'
          />
          <View style={styles.movieDetails}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>PG13</Text>
            </View>
            <Text style={styles.releaseDate}>
              {formatDate(detail.release_date)} • {formatRuntime(120)}
            </Text>
            <Text style={styles.genres}>
              {detail.genres.map(genre => genre.name).join(', ')}
            </Text>
            <Text style={styles.infoLabel}>Status: <Text style={styles.infoText}>{detail.status}</Text></Text>
            <Text style={styles.infoLabel}>Original Language: <Text style={styles.infoText}>{detail.spoken_languages[0].name}</Text></Text>
          </View>
        </View>

        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <View style={styles.scoreContainer}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreText}>{Math.round(detail.vote_average * 10)}</Text>
            </View>
            <Text style={styles.scoreLabel}>User Score</Text>
          </View>
          {/* Can't find crew info api */}
          <View style={styles.crewInfo}>
            <Text style={styles.crewName}>Greta Gerwig</Text>
            <Text style={styles.crewRole}>Director, Writer</Text>
            <Text style={styles.crewName}>Noah Baumbach</Text>
            <Text style={styles.crewRole}>Writer</Text>
          </View>
        </View>

        <Text style={styles.tagline}>{detail.tagline}</Text>

        {/* Overview Section */}
        <View style={styles.overviewSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.overviewText}>{detail.overview}</Text>
        </View>
        
        {/* Cast Section */}
        <View style={styles.overviewSection}>
          <Text style={styles.sectionTitle}>Cast members</Text>
          <FlatList
            horizontal
            data={credits?.cast || []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <CastCard cast={item} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.castList}
          />
        </View>

        {/* Add to Watchlist Button */}
        <TouchableOpacity 
          style={styles.watchlistButton}
          onPress={handleWatchlistPress}
        >
          <BookmarkIcon />
          <Text style={styles.watchlistButtonText}>
            {isMovieInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00B4E4',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0096C7',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
    flex: 1,
  },
  movieInfoSection: {
    flexDirection: 'row',
    padding: '4%', // More responsive padding
    backgroundColor: '#0096C7',
    alignItems: 'center', // Better alignment for different screen sizes
  },
  poster: {
    width: "40%", // Responsive width based on container
    aspectRatio: 0.8, // Maintain square aspect ratio
    maxWidth: 180, // Maximum size limit
    minWidth: 100, // Minimum size limit
    borderRadius: 5,
  },
  movieDetails: {
    flex: 1,
    marginLeft: 16,
  },
  ratingBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
  },
  releaseDate: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  genres: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  infoLabel: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  infoText: {
    color: '#fff',
    opacity: 0.8,
  },
  ratingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: "4%",
    marginTop: "4%",
    backgroundColor: '#00B4E4',
  },
  scoreContainer: {
    alignSelf: 'flex-start',
  },
  scoreCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#023E8A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: '#45FF8F',
  },
  scoreText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  scoreLabel: {
    color: '#fff',
    marginTop: 8,
    fontSize: 14,
  },
  crewInfo: {
    alignSelf: 'center',
    },
  crewName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  crewRole: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 8,
  },
  tagline: {
    color: '#fff',
    fontSize: 16,
    fontStyle: 'italic',
    padding: 16,
    textAlign: 'center',
  },
  overviewSection: {
    padding: 16,
    backgroundColor: '#00B4E4',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  overviewText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
  },
  watchlistButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 16,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    alignItems: 'center',
  },
  watchlistButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#023E8A',
    paddingVertical: 16,
    justifyContent: 'space-around',
  },
  navButton: {
    padding: 8,
  },
  navButtonText: {
    fontSize: 24,
  },
  castSection: {
    paddingVertical: 16,
    backgroundColor: '#0096C7',
  },
  castList: {
    paddingHorizontal: 16,
  },
});

export default DetailScreen;