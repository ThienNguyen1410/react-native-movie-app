import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Movie } from '../../models/tmdb/movie';
import { HomeStackParamList } from '../../navigation/home-navigator';

type MovieScreenNavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

interface MovieCardProps {
  movie: Movie;
  imageUri: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  imageUri,
}) => {
  const navigation = useNavigation<MovieScreenNavigationProp>();

  const handlePress = () => {
    navigation.navigate('Detail', { movie_id: movie.id });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          <Text style={styles.date}>{movie.release_date}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {movie.overview}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 150,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#444',
  },
});