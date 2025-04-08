import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Cast } from '../../models/tmdb/movie-credits';
import { TmdbRepository } from '../../networks/tmdb/tmdb-repository';

interface CastCardProps {
  cast: Cast;
}

export const CastCard: React.FC<CastCardProps> = ({ cast }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: cast.profile_path
            ? `${TmdbRepository.imagePath}${cast.profile_path}`
            : 'https://via.placeholder.com/150'
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {cast.name}
        </Text>
        <Text style={styles.character} numberOfLines={2}>
          {cast.character}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 8,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  character: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
}); 